import * as Comlink from 'comlink';

import { loadFromCache } from '~/utils/indexeddb';
import { CACHE_KEY_CURRENCY_BRIEF_ITEMS, CACHE_KEY_QUOTE_ITEMS } from '~/utils/constants/common';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { MarketL16, MarketL21 } from '~/types/definitions/market.types';
import type { Quote } from '~/types/definitions/quote.types';

let currencyBriefItems: CurrencyBrief[] = [];

const fetchCurrencyBriefItems = async () => {
	const cachedItems = await loadFromCache<CurrencyBrief[]>(CACHE_KEY_CURRENCY_BRIEF_ITEMS);

	console.log('cachedItems -----> form worker', 'currencyBriefItems loaded');

	if (cachedItems && cachedItems.length > 0) {
		currencyBriefItems = cachedItems;
	}
	else {
		currencyBriefItems = [];
	}
};

const findCurrencyById = async (id: number): Promise<CurrencyBrief | null> => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems();
	}

	let start = 0;
	let end = currencyBriefItems.length - 1;

	while (start <= end) {
		const mid = Math.floor((start + end) / 2);
		const currentItem = currencyBriefItems[mid];

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

const findCurrencyBycSymbol = async (cSymbol: string): Promise<CurrencyBrief | null> => {
	await fetchCurrencyBriefItems();

	const currency = currencyBriefItems.find((x) => x.cSymbol === cSymbol);

	return currency || null;
};

const searchCurrencies = async (search: string, count?: number): Promise<CurrencyBrief[] | null> => {
	await fetchCurrencyBriefItems();

	const filteredCurrencies = currencyBriefItems.filter(
		(currency) =>
			currency.cName.toLowerCase().includes(search.toLowerCase())
			|| currency.cSymbol.toLowerCase().includes(search.toLowerCase()),
	);

	return filteredCurrencies.length > 0 ? filteredCurrencies.slice(0, count) : [];
};

const addCurrencyToMarkets = async (markets: MarketL21[], quoteId?: number) => {
	await fetchCurrencyBriefItems();
	const quoteItems = await fetchQuoteItems();

	const result = await Promise.all(markets.map(async (market) => {
		const currency = await findCurrencyById(market.cid);
		const quote = await quoteItems.find((quote) => quote.id === quoteId);
		return {
			...market,
			sparklineChart: JSON.parse(String(market.sparklineChart)),
			currency,
			quote,
			mSymbol: `${currency?.cSymbol}${quote?.cSymbol}`,
		};
	}));

	return result;
};

const addCurrencyToMarketsL16 = async (markets: MarketL16[], quoteId: number) => {
	await fetchCurrencyBriefItems();
	const quoteItems = await fetchQuoteItems();

	const result = await Promise.all(markets.map(async (market) => {
		const currency = await findCurrencyById(market.cid);
		const quote = await quoteItems.find((quote) => quote.id === quoteId);
		return {
			...market,
			currency,
			quote,
			mSymbol: `${currency?.cSymbol}${quote?.cSymbol}`,
		};
	}));

	return result;
};

const fetchQuoteItems = async () => {
	let quoteItems: Quote[] = [];
	const cachedItems = await loadFromCache<Quote[]>(CACHE_KEY_QUOTE_ITEMS);

	if (cachedItems && cachedItems.length > 0) {
		quoteItems = cachedItems;
	}
	else {
		quoteItems = [];
	}

	const items = await Promise.all(quoteItems.map(async (quote) => {
		const currency = await findCurrencyById(quote.id);
		return {
			...quote,
			cName: currency?.cName,
			cSymbol: currency?.cSymbol,
		};
	}));

	return items;
};

Comlink.expose({
	addCurrencyToMarkets,
	addCurrencyToMarketsL16,
	fetchQuoteItems,
	fetchCurrencyBriefItems,
	findCurrencyById,
	findCurrencyBycSymbol,
	searchCurrencies,
});
