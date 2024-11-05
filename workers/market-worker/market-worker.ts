import * as Comlink from 'comlink';

import { useBaseWorker } from '../base-worker/base-worker-wrapper';

import { loadFromCache } from '~/utils/indexeddb';
import type { MarketBriefItem } from '~/types/response/brief-list.types';
import { CACHE_KEY_MARKET_BRIEF_ITEMS } from '~/utils/constants/common';

let marketBriefItems: MarketBriefItem[] = [];

const fetchMarketBriefItems = async () => {
	const cachedItems = await loadFromCache<MarketBriefItem[]>(CACHE_KEY_MARKET_BRIEF_ITEMS);

	console.log('cachedItems -----> form worker', 'marketBriefItems loaded');

	if (cachedItems && cachedItems.length > 0) {
		marketBriefItems = cachedItems;
	}
	else {
		marketBriefItems = [];
	}
};

const findMarketById = async (id: number): Promise<MarketBriefItem | null> => {
	await fetchMarketBriefItems();

	let start = 0;
	let end = marketBriefItems.length - 1;

	while (start <= end) {
		const mid = Math.floor((start + end) / 2);
		const currentItem = marketBriefItems[mid];

		if (currentItem.id === id) {
			return currentItem;
		}
		else if (currentItem.id < id) {
			start = mid + 1;
		}
		else {
			end = mid - 1;
		}
	}

	return null;
};

const findMarketBymSymbol = async (mSymbol: string): Promise<MarketBriefItem | null> => {
	await fetchMarketBriefItems();

	const currency = marketBriefItems.find((x) => x.mSymbol === mSymbol);

	return currency || null;
};

const searchMarkets = async (search: string, count?: number): Promise<MarketBriefItem[] | []> => {
	await fetchMarketBriefItems();

	const filteredMarkets = marketBriefItems.filter(
		(market) =>
			market.mSymbol.toLowerCase().includes(search.toLowerCase()),
	);

	const result = filteredMarkets.length > 0 ? filteredMarkets.slice(0, count) : [];

	const currencyWorker = useBaseWorker();
	await currencyWorker.fetchCurrencyBriefItems();

	const data: MarketBriefItem[] = await Promise.all(result.map(async (market) => {
		return {
			...market,
			currencyBriefItem: await currencyWorker.findCurrencyById(Number(market.cbId)) || null,
		};
	}));

	return data.length > 0 ? data.slice(0, count) : [];
};

Comlink.expose({
	fetchMarketBriefItems,
	findMarketById,
	findMarketBymSymbol,
	searchMarkets,
});
