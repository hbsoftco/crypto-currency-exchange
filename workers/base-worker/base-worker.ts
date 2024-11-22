import * as Comlink from 'comlink';

import { loadFromCache, saveToCache } from '~/utils/indexeddb';
import {
	CACHE_KEY_CURRENCY_BRIEF_ITEMS,
	CACHE_KEY_FUTURES_QUOTE_ITEMS,
	CACHE_KEY_MARKET_BRIEF_ITEMS,
	CACHE_KEY_QUOTE_ITEMS,
	CACHE_KEY_TAG_ITEMS,
} from '~/utils/constants/common';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { MarketBrief, MarketL16, MarketL21, MarketL47, MarketL51, MarketState } from '~/types/definitions/market.types';
import type { Quote } from '~/types/definitions/quote.types';
import type { SuggestionItems } from '~/types/definitions/header/search.types';
import type { Tag } from '~/types/definitions/tag.types';
import type { Asset } from '~/types/definitions/asset.types';
import { MarketType } from '~/utils/enums/market.enum';

let currencyBriefItems: CurrencyBrief[] = [];
let marketBriefItems: MarketBrief[] = [];

// Currencies
const fetchCurrencyBriefItems = async (baseUrl: string): Promise<CurrencyBrief[] | []> => {
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

const findCurrenciesByIds = async (ids: number[], baseUrl: string): Promise<CurrencyBrief[]> => {
	const results: CurrencyBrief[] = [];

	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	for (const id of ids) {
		const currency = await findCurrencyById(id, baseUrl);
		if (currency) {
			results.push(currency);
		}
	}

	return results;
};

const findCurrencyBycSymbol = async (cSymbol: string, baseUrl: string): Promise<CurrencyBrief | null> => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const currency = currencyBriefItems.find((x) => x.cSymbol === cSymbol);

	return currency || null;
};

const searchCurrencies = async (
	search: string,
	count: number,
	baseUrl: string,
	ignore?: string,
): Promise<CurrencyBrief[] | null> => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const filteredCurrencies = currencyBriefItems.filter(
		(currency) =>
			(currency.cName.toLowerCase().includes(search.toLowerCase())
			|| currency.cSymbol.toLowerCase().includes(search.toLowerCase()))
			&& currency.cSymbol !== ignore,
	);

	return filteredCurrencies.length > 0 ? filteredCurrencies.slice(0, count) : [];
};

const getReadyCurrencyWithIndex = async (baseUrl: string, currencies: CurrencyBrief[], _currency: string): Promise<{ updatedCurrencies: CurrencyBrief[]; index: number } | null> => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const findCurrency = currencyBriefItems.find(
		(currency) =>
			currency.cName.toLowerCase().includes(_currency.toLowerCase())
			|| currency.cSymbol.toLowerCase().includes(_currency.toLowerCase()),
	);

	if (!findCurrency) {
		return null;
	}

	const existingIndex = currencies.findIndex(
		(currency) => currency.cSymbol === findCurrency.cSymbol && currency.cName === findCurrency.cName,
	);

	if (existingIndex === -1) {
		currencies.unshift(findCurrency);
		return { updatedCurrencies: currencies, index: 0 };
	}
	else {
		return { updatedCurrencies: currencies, index: existingIndex };
	}
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

const addCurrencyToMarketStates = async (baseUrl: string, markets: MarketState[]) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	if (!marketBriefItems.length) {
		await fetchMarketBriefItems(baseUrl);
	}

	const quoteItems = await fetchQuoteItems(111, baseUrl);

	const result = await Promise.all(markets.map(async (market) => {
		const currency = await findCurrencyById(market.cid, baseUrl);
		const marketItem = await findMarketById(market.id, baseUrl);
		const quote = await quoteItems.find((quote) => quote.id === marketItem?.cqId);
		return {
			...market,
			currency,
			market: marketItem,
			quote,
			mSymbol: `${currency?.cSymbol}${quote?.cSymbol}`,
		};
	}));

	return result;
};

const addCurrencyToAsset = async (baseUrl: string, assets: Asset[]) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const result = await Promise.all(assets.map(async (asset) => {
		const currency = await findCurrencyById(asset.currencyId, baseUrl);
		return {
			...asset,
			currency,
		};
	}));

	return result;
};

const addCurrencyToMarketsL47 = async (baseUrl: string, markets: MarketL47[]) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	if (!marketBriefItems.length) {
		await fetchMarketBriefItems(baseUrl);
	}

	const quoteItems = await fetchQuoteItems(111, baseUrl);

	const result = await Promise.all(markets.map(async (category) => {
		const marketsWithDetails = await Promise.all(category.info.map(async (market) => {
			const currency = await findCurrencyById(market.cid, baseUrl);
			const marketItem = await findMarketById(market.id, baseUrl);
			const quote = quoteItems.find((quote) => quote.id === marketItem?.cqId);
			return {
				...market,
				currency,
				market: marketItem,
				quote,
				mSymbol: `${currency?.cSymbol}${quote?.cSymbol}`,
			};
		}));
		return {
			...category,
			info: marketsWithDetails,
		};
	}));

	return result;
};

const addCurrencyToMarketsL51 = async (baseUrl: string, markets: MarketL51[]) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	if (!marketBriefItems.length) {
		await fetchMarketBriefItems(baseUrl);
	}

	const quoteItems = await fetchQuoteItems(111, baseUrl);

	const result = await Promise.all(markets.map(async (tag) => {
		const marketsWithDetails = await Promise.all(tag.markets.map(async (market) => {
			const currency = await findCurrencyById(market.cid, baseUrl);
			const marketItem = await findMarketById(market.id, baseUrl);
			const quote = quoteItems.find((quote) => quote.id === marketItem?.cqId);
			return {
				...market,
				currency,
				market: marketItem,
				quote,
				mSymbol: `${currency?.cSymbol}${quote?.cSymbol}`,
			};
		}));
		return {
			...tag,
			markets: marketsWithDetails,
		};
	}));

	return result;
};

// Quotes
const fetchQuoteItems = async (marketTypeId: number, baseUrl: string) => {
	try {
		let quoteItems: Quote[] = [];

		let cachedItems = await loadFromCache<Quote[]>(CACHE_KEY_QUOTE_ITEMS);
		if (marketTypeId === MarketType.FUTURES) {
			cachedItems = await loadFromCache<Quote[]>(CACHE_KEY_FUTURES_QUOTE_ITEMS);
		}

		if (cachedItems && cachedItems.length > 0) {
			quoteItems = cachedItems;
		}
		else {
			const response = await fetch(`${baseUrl}v1/market/routine/quote_list?marketTypeId=${marketTypeId}`);
			const { result } = await response.json();

			if (marketTypeId === MarketType.FUTURES) {
				await saveToCache(CACHE_KEY_FUTURES_QUOTE_ITEMS, result);
			}
			else {
				await saveToCache(CACHE_KEY_QUOTE_ITEMS, result);
			}

			quoteItems = result;
		}

		const items = await Promise.all(quoteItems.map(async (quote) => {
			const currency = await findCurrencyById(quote.id, baseUrl);
			return {
				...quote,
				cName: currency?.cName,
				cSymbol: currency?.cSymbol,
				currency,
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
		let tagItems: Tag[] = [];
		const cachedItems = await loadFromCache<Tag[]>(CACHE_KEY_TAG_ITEMS);

		if (cachedItems && cachedItems.length > 0) {
			tagItems = [
				{ id: 0, tag: 'همه' },
				...cachedItems,
			];

			return tagItems;
		}
		else {
			const response = await fetch(`${baseUrl}v1/currency/routine/tag_list?languageId=${languageId}`);
			const { result } = await response.json();

			await saveToCache(CACHE_KEY_TAG_ITEMS, result);

			tagItems = [
				{ id: 0, tag: 'همه' },
				...result,
			];

			return tagItems;
		}
	}
	catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};

// Markets
const fetchMarketBriefItems = async (baseUrl: string): Promise<MarketBrief[] | []> => {
	try {
		const cachedItems = await loadFromCache<MarketBrief[]>(CACHE_KEY_MARKET_BRIEF_ITEMS);

		if (cachedItems && cachedItems.length > 0) {
			marketBriefItems = cachedItems;

			return marketBriefItems;
		}
		else {
			const response = await fetch(`${baseUrl}v1/market/routine/brief_list`);
			const { result } = await response.json();

			await saveToCache(CACHE_KEY_MARKET_BRIEF_ITEMS, result);

			marketBriefItems = result;
			return marketBriefItems;
		}
	}
	catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};

const findMarketById = async (id: number, baseUrl: string): Promise<MarketBrief | null> => {
	if (!marketBriefItems.length) {
		await fetchMarketBriefItems(baseUrl);
	}

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

const findMarketsByCurrencyId = async (baseUrl: string, cid: number): Promise<MarketBrief[] | []> => {
	if (!marketBriefItems.length) {
		await fetchMarketBriefItems(baseUrl);
	}

	const filteredMarkets = marketBriefItems.filter((market) => (market.cbId === cid));

	return filteredMarkets;
};

const searchMarkets = async (
	baseUrl: string,
	search: string,
	count?: number,
): Promise<MarketBrief[] | []> => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	if (!marketBriefItems.length) {
		await fetchMarketBriefItems(baseUrl);
	}

	const searchLower = search.toLowerCase();

	const filteredMarkets = marketBriefItems
		.filter((market) => market.mSymbol.toLowerCase().includes(searchLower))
		.map((market) => ({
			...market,
			currency: currencyBriefItems.find((currency) => currency.id === market.cbId) || null,
		}));

	const filteredCurrencies = currencyBriefItems
		.filter(
			(currency) =>
				currency.cName.toLowerCase().includes(searchLower)
				|| currency.cSymbol.toLowerCase().includes(searchLower),
		)
		.flatMap((currency) =>
			marketBriefItems
				.filter((market) => market.cbId === currency.id)
				.map((market) => ({
					...market,
					currency,
				})),
		);

	const uniqueResultsMap = new Map<number, MarketBrief>();
	[...filteredMarkets, ...filteredCurrencies].forEach((item) => {
		uniqueResultsMap.set(item.id, item);
	});

	const uniqueResults = Array.from(uniqueResultsMap.values());

	return count ? uniqueResults.slice(0, count) : uniqueResults;
};

// Other
const SearchSuggestionItems = async (baseUrl: string, query: string): Promise<SuggestionItems> => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	if (!marketBriefItems.length) {
		await fetchMarketBriefItems(baseUrl);
	}

	const suggestionItems: SuggestionItems = {
		currencies: [],
		markets: [],
	};
	suggestionItems.currencies = await searchCurrencies(query, 3, baseUrl) || [];

	suggestionItems.markets = await searchMarkets(baseUrl, query, 6);

	return suggestionItems;
};

Comlink.expose({
	// Currencies
	addCurrencyToMarkets,
	addCurrencyToAsset,
	addCurrencyToMarketsL16,
	addCurrencyToMarketsL51,
	addCurrencyToMarketsL47,
	addCurrencyToMarketStates,
	fetchCurrencyBriefItems,
	findCurrencyById,
	findCurrenciesByIds,
	findCurrencyBycSymbol,
	searchCurrencies,
	getReadyCurrencyWithIndex,
	// Quotes
	fetchQuoteItems,
	// Tags
	fetchTagItems,
	// Markets
	fetchMarketBriefItems,
	findMarketsByCurrencyId,
	findMarketById,
	searchMarkets,
	// Other
	SearchSuggestionItems,
});
