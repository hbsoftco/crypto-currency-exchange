import * as Comlink from 'comlink';

import { loadFromCache, saveToCache } from '~/utils/indexeddb';
import {
	CACHE_KEY_CURRENCY_BRIEF_ITEMS,
	CACHE_KEY_DEPOSIT_CRYPTO_NETWORKS,
	CACHE_KEY_FUTURES_QUOTE_ITEMS,
	CACHE_KEY_MARKET_BRIEF_ITEMS,
	CACHE_KEY_QUOTE_ITEMS,
	CACHE_KEY_TAG_ITEMS,
} from '~/utils/constants/common';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { MarketBrief, MarketL16, MarketL21, MarketL46, MarketL47, MarketL51, MarketState } from '~/types/definitions/market.types';
import type { Quote } from '~/types/definitions/quote.types';
import type { SuggestionItems } from '~/types/definitions/header/search.types';
import type { Tag } from '~/types/definitions/tag.types';
import type { Asset, Portfolio } from '~/types/definitions/asset.types';
import { MarketType } from '~/utils/enums/market.enum';
import type { SystemRoot } from '~/types/definitions/system.types';
import type { Reward, TraderState } from '~/types/definitions/user.types';
import type { DepositCoinFee, DepositCurrency, WorkerDepositNetwork } from '~/types/definitions/deposit.types';

let currencyBriefItems: CurrencyBrief[] = [];
let marketBriefItems: MarketBrief[] = [];

// Currencies
const fetchCurrencyBriefQueue: Array<() => void> = [];
let isFetchingCurrencyBrief = false;

const processCurrencyBriefQueue = () => {
	if (fetchCurrencyBriefQueue.length === 0 || isFetchingCurrencyBrief) {
		return;
	}

	isFetchingCurrencyBrief = true;

	const currentRequest = fetchCurrencyBriefQueue.shift();

	if (currentRequest) {
		currentRequest();
	}
};

const fetchCurrencyBriefItems = async (baseUrl: string): Promise<CurrencyBrief[] | []> => {
	return new Promise<CurrencyBrief[]>((resolve, reject) => {
		fetchCurrencyBriefQueue.push(async () => {
			try {
				const cachedItems = await loadFromCache<CurrencyBrief[]>(CACHE_KEY_CURRENCY_BRIEF_ITEMS);

				if (cachedItems && cachedItems.length > 0) {
					currencyBriefItems = cachedItems;
					resolve(currencyBriefItems);
				}
				else {
					const response = await fetch(`${baseUrl}v1/currency/routine/brief_list?languageId=${1065}`);
					const { result } = await response.json();

					await saveToCache(CACHE_KEY_CURRENCY_BRIEF_ITEMS, result);
					currencyBriefItems = result;
					resolve(currencyBriefItems);
				}
			}
			catch (error) {
				reject(error);
			}
			finally {
				isFetchingCurrencyBrief = false;
				processCurrencyBriefQueue();
			}
		});

		processCurrencyBriefQueue();
	});
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

const searchDepositCryptoCurrencies = async (
	search: string,
	count: number,
	baseUrl: string,
): Promise<CurrencyBrief[] | null> => {
	const depositCryptoCurrencies = await loadFromCache<DepositCurrency[]>(CACHE_KEY_DEPOSIT_CRYPTO_NETWORKS);
	const currencies: CurrencyBrief[] = [];

	if (depositCryptoCurrencies && depositCryptoCurrencies.length > 0) {
		for (const item of depositCryptoCurrencies) {
			const currency = await findCurrencyById(item.cid, baseUrl);
			if (currency) {
				currencies.push(currency);
			}
		}
	}

	const filteredCurrencies = currencies.filter(
		(currency) =>
			(currency.cName.toLowerCase().includes(search.toLowerCase())
			|| currency.cSymbol.toLowerCase().includes(search.toLowerCase())),
	);

	return filteredCurrencies.length > 0 ? filteredCurrencies.slice(0, count) : [];
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

	let quoteItems = await fetchSpotQuoteItems(baseUrl);

	if (marketTypeId === MarketType.FUTURES) {
		quoteItems = await fetchFuturesQuoteItems(baseUrl);
	}

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

	let quoteItems = await fetchSpotQuoteItems(baseUrl);

	if (marketTypeId === MarketType.FUTURES) {
		quoteItems = await fetchFuturesQuoteItems(baseUrl);
	}

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

	const quoteItems = await fetchSpotQuoteItems(baseUrl);

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

	if (!marketBriefItems.length) {
		await fetchMarketBriefItems(baseUrl);
	}

	const result = await Promise.all(assets.map(async (asset) => {
		const currency = await findCurrencyById(asset.currencyId, baseUrl);
		const markets = await findMarketsByCurrencyId(baseUrl, asset.currencyId);

		return {
			...asset,
			percentage: '0',
			currency,
			markets,
		};
	}));

	return result;
};

const addCurrencyToTraderStates = async (baseUrl: string, states: TraderState[]) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const result = await Promise.all(states.map(async (state) => {
		const currency = await findCurrencyById(state.cid, baseUrl);
		return {
			...state,
			currency,
		};
	}));

	return result;
};

const addCurrencyToReward = async (baseUrl: string, items: Reward[]) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const result = await Promise.all(items.map(async (item) => {
		const currency = await findCurrencyById(item.currencyId, baseUrl);
		return {
			...item,
			currency,
		};
	}));

	return result;
};

const addCurrencyToList = async (baseUrl: string, items: any[], currencyParam: string) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const result = await Promise.all(items.map(async (item) => {
		const currency = await findCurrencyById(item[currencyParam], baseUrl);
		return {
			...item,
			currency,
		};
	}));

	return result;
};

const addCurrencyToPortfolio = async (baseUrl: string, items: Portfolio[]) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const result = await Promise.all(items.map(async (item) => {
		const currency = await findCurrencyById(item.cid, baseUrl);
		return {
			...item,
			latestWeek: JSON.parse(item.latestWeekAsJson),
			currency,
		};
	}));

	return result;
};

const addCurrencyToDepositFee = async (baseUrl: string, items: DepositCoinFee[]) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const result = await Promise.all(items.map(async (item) => {
		const currency = await findCurrencyById(item.cid, baseUrl);
		return {
			...item,
			currency,
		};
	}));

	return result;
};

const addCurrencyToWithdrawCoinFee = async (baseUrl: string, items: DepositCoinFee[]) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const result = await Promise.all(items.map(async (item) => {
		const currency = await findCurrencyById(item.cid, baseUrl);
		return {
			...item,
			currency,
		};
	}));

	return result;
};

const addCurrencyToMarketsL46 = async (baseUrl: string, markets: MarketL46[]) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	if (!marketBriefItems.length) {
		await fetchMarketBriefItems(baseUrl);
	}

	const quoteItems = await fetchSpotQuoteItems(baseUrl);

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

const addCurrencyToMarketsL47 = async (baseUrl: string, markets: MarketL47[]) => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	if (!marketBriefItems.length) {
		await fetchMarketBriefItems(baseUrl);
	}

	const quoteItems = await fetchSpotQuoteItems(baseUrl);

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

	const quoteItems = await fetchSpotQuoteItems(baseUrl);

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
const fetchSpotQuoteQueue: Array<() => void> = [];
let isFetchingSpotQuote = false;

const processSpotQuoteQueue = () => {
	if (fetchSpotQuoteQueue.length === 0 || isFetchingSpotQuote) {
		return;
	}

	isFetchingSpotQuote = true;

	const currentRequest = fetchSpotQuoteQueue.shift();

	if (currentRequest) {
		currentRequest();
	}
};

const fetchSpotQuoteItems = async (baseUrl: string): Promise<Quote[]> => {
	return new Promise<Quote[]>((resolve, reject) => {
		fetchSpotQuoteQueue.push(async () => {
			try {
				const cachedItems = await loadFromCache<Quote[]>(CACHE_KEY_QUOTE_ITEMS);
				let quoteItems: Quote[] = [];

				if (cachedItems && cachedItems.length > 0) {
					quoteItems = cachedItems;
				}
				else {
					const response = await fetch(
						`${baseUrl}v1/market/routine/quote_list?marketTypeId=${MarketType.SPOT}`,
					);
					const { result } = await response.json();
					await saveToCache(CACHE_KEY_QUOTE_ITEMS, result);
					quoteItems = result;
				}

				const items = await Promise.all(
					quoteItems.map(async (quote) => {
						const currency = await findCurrencyById(quote.id, baseUrl);
						return {
							...quote,
							cName: currency?.cName || '',
							cSymbol: currency?.cSymbol || '',
							currency,
						};
					}),
				);

				resolve(items);
			}
			catch (error) {
				reject(error);
			}
			finally {
				isFetchingSpotQuote = false;
				processSpotQuoteQueue();
			}
		});

		processSpotQuoteQueue();
	});
};

const fetchFuturesQuoteQueue: Array<() => void> = [];
let isFetchingFuturesQuote = false;

const processFuturesQuoteQueue = () => {
	if (fetchFuturesQuoteQueue.length === 0 || isFetchingFuturesQuote) {
		return;
	}

	isFetchingFuturesQuote = true;

	const currentRequest = fetchFuturesQuoteQueue.shift();

	if (currentRequest) {
		currentRequest();
	}
};

const fetchFuturesQuoteItems = async (baseUrl: string): Promise<Quote[]> => {
	return new Promise<Quote[]>((resolve, reject) => {
		fetchFuturesQuoteQueue.push(async () => {
			try {
				const cachedItems = await loadFromCache<Quote[]>(CACHE_KEY_FUTURES_QUOTE_ITEMS);
				let quoteItems: Quote[] = [];

				if (cachedItems && cachedItems.length > 0) {
					quoteItems = cachedItems;
				}
				else {
					const response = await fetch(
						`${baseUrl}v1/market/routine/quote_list?marketTypeId=${MarketType.FUTURES}`,
					);
					const { result } = await response.json();
					await saveToCache(CACHE_KEY_FUTURES_QUOTE_ITEMS, result);
					quoteItems = result;
				}

				const items = await Promise.all(
					quoteItems.map(async (quote) => {
						const currency = await findCurrencyById(quote.id, baseUrl);
						return {
							...quote,
							cName: currency?.cName || '',
							cSymbol: currency?.cSymbol || '',
							currency,
						};
					}),
				);

				resolve(items);
			}
			catch (error) {
				reject(error);
			}
			finally {
				isFetchingFuturesQuote = false;
				processFuturesQuoteQueue();
			}
		});

		processFuturesQuoteQueue();
	});
};

// Tags
const fetchTagItemsQueue: Array<() => void> = [];
let isFetchingTagItems = false;

const processTagItemsQueue = () => {
	if (fetchTagItemsQueue.length === 0 || isFetchingTagItems) {
		return;
	}

	isFetchingTagItems = true;

	const currentRequest = fetchTagItemsQueue.shift();

	if (currentRequest) {
		currentRequest();
	}
};

const fetchTagItems = async (languageId: number, baseUrl: string): Promise<Tag[]> => {
	return new Promise<Tag[]>((resolve, reject) => {
		fetchTagItemsQueue.push(async () => {
			try {
				let tagItems: Tag[] = [];
				const cachedItems = await loadFromCache<Tag[]>(CACHE_KEY_TAG_ITEMS);

				if (cachedItems && cachedItems.length > 0) {
					tagItems = [
						{ id: 0, tag: 'همه' },
						...cachedItems,
					];

					resolve(tagItems);
				}
				else {
					const response = await fetch(`${baseUrl}v1/currency/routine/tag_list?languageId=${languageId}`);
					const { result } = await response.json();

					await saveToCache(CACHE_KEY_TAG_ITEMS, result);

					tagItems = [
						{ id: 0, tag: 'همه' },
						...result,
					];

					resolve(tagItems);
				}
			}
			catch (error) {
				console.error('Fetch error:', error);
				reject(error);
			}
			finally {
				isFetchingTagItems = false;
				processTagItemsQueue();
			}
		});

		processTagItemsQueue();
	});
};

// Markets
const fetchMarketBriefQueue: Array<() => void> = [];
let isFetchingMarketBrief = false;

const processMarketBriefQueue = () => {
	if (fetchMarketBriefQueue.length === 0 || isFetchingMarketBrief) {
		return;
	}

	isFetchingMarketBrief = true;

	const currentRequest = fetchMarketBriefQueue.shift();

	if (currentRequest) {
		currentRequest();
	}
};

const fetchMarketBriefItems = async (baseUrl: string): Promise<MarketBrief[] | []> => {
	return new Promise<MarketBrief[]>((resolve, reject) => {
		fetchMarketBriefQueue.push(async () => {
			try {
				const cachedItems = await loadFromCache<MarketBrief[]>(CACHE_KEY_MARKET_BRIEF_ITEMS);

				if (cachedItems && cachedItems.length > 0) {
					marketBriefItems = cachedItems;
					resolve(marketBriefItems);
				}
				else {
					const response = await fetch(`${baseUrl}v1/market/routine/brief_list`);
					const { result } = await response.json();

					await saveToCache(CACHE_KEY_MARKET_BRIEF_ITEMS, result);

					marketBriefItems = result;
					resolve(marketBriefItems);
				}
			}
			catch (error) {
				reject(error);
			}
			finally {
				isFetchingMarketBrief = false;
				processCurrencyBriefQueue();
			}
		});

		processMarketBriefQueue();
	});
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

const findMarketsByCurrencyId = async (baseUrl: string, cid: number, typeId: number = MarketType.SPOT): Promise<MarketBrief[] | []> => {
	if (!marketBriefItems.length) {
		await fetchMarketBriefItems(baseUrl);
	}

	const filteredMarkets = marketBriefItems.filter((market) => (market.cbId === cid && market.typeId === typeId));

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

const searchAllMarkets = async (
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

	return count ? filteredMarkets.slice(0, count) : filteredMarkets;
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

const fetchSnapshotData = async (baseUrl: string, market: string, currency: string, quote: string): Promise<any> => {
	if (!marketBriefItems.length) {
		await fetchMarketBriefItems(baseUrl);
	}

	const findMarket = await marketBriefItems.find((marketItem) => (marketItem.mSymbol === market));
	const findCurrency = await findCurrencyBycSymbol(currency, baseUrl);

	const quoteItems = await fetchSpotQuoteItems(baseUrl);
	const findQuote = await quoteItems.find((quoteItem) => (quoteItem.cSymbol === quote));

	return {
		market: findMarket,
		currency: findCurrency,
		quote: findQuote,
	};
};

const addCurrenciesHelpToBuyList = async (baseUrl: string, items: SystemRoot[]): Promise<SystemRoot[] | null> => {
	if (!currencyBriefItems.length) {
		await fetchCurrencyBriefItems(baseUrl);
	}

	const result = await Promise.all(items.map(async (item) => {
		const currency = await findCurrencyById(item.cid, baseUrl);

		return {
			...item,
			currency,
		};
	}));

	return result;
};

const findDepositCurrencyNetworksByCurrencyId = async (currencyId: number): Promise<WorkerDepositNetwork | null> => {
	try {
		const networks = await loadFromCache<DepositCurrency[]>(CACHE_KEY_DEPOSIT_CRYPTO_NETWORKS);
		if (networks && networks.length > 0) {
			const data = networks.find((item) => (item.cid === currencyId));
			if (data) {
				const networks = data.networks?.map((item) => ({ value: item.netName, key: item.netId.toString() })) ?? null;

				if (networks?.length) {
					return {
						networks,
						fullData: data,
					};
				}
			}

			return null;
		}

		return null;
	}
	catch (error) {
		console.log(error);
		return null;
	}
};

Comlink.expose({
	// Currencies
	addCurrencyToList,
	addCurrencyToMarkets,
	addCurrencyToAsset,
	addCurrencyToTraderStates,
	addCurrencyToReward,
	addCurrencyToPortfolio,
	addCurrencyToDepositFee,
	addCurrencyToWithdrawCoinFee,
	addCurrencyToMarketsL16,
	addCurrencyToMarketsL51,
	addCurrencyToMarketsL46,
	addCurrencyToMarketsL47,
	addCurrencyToMarketStates,
	fetchCurrencyBriefItems,
	findCurrencyById,
	findCurrenciesByIds,
	findCurrencyBycSymbol,
	searchCurrencies,
	getReadyCurrencyWithIndex,
	searchDepositCryptoCurrencies,
	// Quotes
	fetchFuturesQuoteItems,
	fetchSpotQuoteItems,
	// Tags
	fetchTagItems,
	// Markets
	fetchMarketBriefItems,
	findMarketsByCurrencyId,
	findMarketById,
	searchMarkets,
	searchAllMarkets,
	// Other
	SearchSuggestionItems,
	fetchSnapshotData,
	addCurrenciesHelpToBuyList,
	findDepositCurrencyNetworksByCurrencyId,
});
