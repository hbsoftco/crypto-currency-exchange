import * as Comlink from 'comlink';

import { loadFromCache } from '~/utils/indexeddb';
import { CACHE_KEY_CURRENCY_BRIEF_ITEMS, CACHE_KEY_QUOTE_ITEMS, CACHE_KEY_TAG_ITEMS } from '~/utils/constants/common';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { MarketL16, MarketL21 } from '~/types/definitions/market.types';
import type { Quote } from '~/types/definitions/quote.types';

// Currencies
let currencyBriefItems: CurrencyBrief[] = [];

const fetchCurrencyBriefItems = async (baseUrl: string) => {
	try {
		const cachedItems = await loadFromCache<CurrencyBrief[]>(CACHE_KEY_CURRENCY_BRIEF_ITEMS);

		if (cachedItems && cachedItems.length > 0) {
			currencyBriefItems = cachedItems;

			return currencyBriefItems;
		}
		else {
			const response = await fetch(`${baseUrl}v1/currency/routine/brief_list?languageId=${1065}`);
			const { result } = await response.json();

			await saveToCache(CACHE_KEY_CURRENCY_BRIEF_ITEMS, result);

			currencyBriefItems = result;
			return currencyBriefItems;
		}
	}
	catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};

const findCurrencyById = async (id: number, baseUrl: string): Promise<CurrencyBrief | null> => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
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

const findCurrencyBycSymbol = async (cSymbol: string, baseUrl: string): Promise<CurrencyBrief | null> => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const currency = currencyBriefItems.find((x) => x.cSymbol === cSymbol);

	return currency || null;
};

const searchCurrencies = async (search: string, count: number, baseUrl: string): Promise<CurrencyBrief[] | null> => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const filteredCurrencies = currencyBriefItems.filter(
		(currency) =>
			currency.cName.toLowerCase().includes(search.toLowerCase())
			|| currency.cSymbol.toLowerCase().includes(search.toLowerCase()),
	);

	return filteredCurrencies.length > 0 ? filteredCurrencies.slice(0, count) : [];
};

const addCurrencyToMarkets = async (markets: MarketL21[], quoteId: number, baseUrl: string, marketTypeId: number) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}
	const quoteItems = await fetchQuoteItems(marketTypeId, baseUrl);

	const result = await Promise.all(markets.map(async (market) => {
		const currency = await findCurrencyById(market.cid, baseUrl);
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

const addCurrencyToMarketsL16 = async (markets: MarketL16[], quoteId: number, baseUrl: string, marketTypeId: number) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}
	const quoteItems = await fetchQuoteItems(marketTypeId, baseUrl);

	const result = await Promise.all(markets.map(async (market) => {
		const currency = await findCurrencyById(market.cid, baseUrl);
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

// Quotes
const fetchQuoteItems = async (marketTypeId: number, baseUrl: string) => {
	try {
		let quoteItems: Quote[] = [];
		const cachedItems = await loadFromCache<Quote[]>(CACHE_KEY_QUOTE_ITEMS);

		if (cachedItems && cachedItems.length > 0) {
			quoteItems = cachedItems;
		}
		else {
			const response = await fetch(`${baseUrl}v1/market/routine/quote_list?marketTypeId=${marketTypeId}`);
			const { result } = await response.json();

			await saveToCache(CACHE_KEY_QUOTE_ITEMS, result);

			quoteItems = result;
		}

		const items = await Promise.all(quoteItems.map(async (quote) => {
			const currency = await findCurrencyById(quote.id, baseUrl);
			return {
				...quote,
				cName: currency?.cName,
				cSymbol: currency?.cSymbol,
			};
		}));

		return items;
	}
	catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};

// Tags
const fetchTagItems = async (languageId: number, baseUrl: string) => {
	try {
		let tagItems: Quote[] = [];
		const cachedItems = await loadFromCache<Quote[]>(CACHE_KEY_TAG_ITEMS);

		if (cachedItems && cachedItems.length > 0) {
			tagItems = cachedItems;

			return tagItems;
		}
		else {
			const response = await fetch(`${baseUrl}v1/currency/routine/tag_list?languageId=${languageId}`);
			const { result } = await response.json();

			await saveToCache(CACHE_KEY_TAG_ITEMS, result);

			tagItems = result;

			return tagItems;
		}
	}
	catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};

Comlink.expose({
	// Currencies
	addCurrencyToMarkets,
	addCurrencyToMarketsL16,
	fetchCurrencyBriefItems,
	findCurrencyById,
	findCurrencyBycSymbol,
	searchCurrencies,
	// Quotes
	fetchQuoteItems,
	// Tags
	fetchTagItems,
});
