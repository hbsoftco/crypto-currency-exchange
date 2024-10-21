import * as Comlink from 'comlink';

import { loadFromCache } from '~/utils/indexeddb';
import type { MarketBriefItem } from '~/types/response/brief-list.types';
import { CACHE_KEY_MARKET_BRIEF_ITEMS } from '~/utils/constants/common';

let marketBriefItems: MarketBriefItem[] = [];

const fetchMarketBriefItems = async () => {
	const cachedItems = await loadFromCache<MarketBriefItem[]>(CACHE_KEY_MARKET_BRIEF_ITEMS);

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

Comlink.expose({
	fetchMarketBriefItems,
	findMarketById,
	findMarketBymSymbol,
});
