import { defineStore } from 'pinia';

import { Language } from '~/utils/enums/language.enum';
import { baseDateRepository } from '~/repositories/base-date.repository';
import type { Tag } from '~/types/response/tag.types';
import type { QuoteItem } from '~/types/response/quote-list.types';
import type { CurrencyBriefItem, MarketBriefItem } from '~/types/response/brief-list.types';
import { MarketType } from '~/utils/enums/market.enum';
import type { Commission } from '~/types/response/trader.types';
import { CACHE_KEY_COUNTRY_ITEMS, CACHE_KEY_CURRENCY_BRIEF_ITEMS, CACHE_KEY_MARKET_BRIEF_ITEMS, CACHE_KEY_QUOTE_ITEMS, CACHE_KEY_TAG_ITEMS } from '~/utils/constants/common';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { loadFromCache, saveToCache } from '~/utils/indexeddb';
import type { CountryItem } from '~/types/response/common.types';
import { userRepository } from '~/repositories/user.repository';

export const useBaseDataStore = defineStore('baseData', () => {
	const { $api } = useNuxtApp();

	const countries = ref<CountryItem[]>([]);
	const isCountryDataFetched = ref(false);
	const isCountryLoading = ref(false);
	const fetchCountries = async () => {
		if (isCountryDataFetched.value || isCountryLoading.value) return;

		const user = userRepository($api);
		isCountryLoading.value = true;

		try {
			const cachedData: CountryItem[] = await loadFromCache(CACHE_KEY_COUNTRY_ITEMS) || [];

			if (cachedData.length) {
				isCountryDataFetched.value = true;
				return;
			}
			const response = await user.getCountryList();
			if (response.result) {
				countries.value = response.result;
				isCountryDataFetched.value = true;

				await saveToCache(CACHE_KEY_COUNTRY_ITEMS, response.result);
			}
		}
		catch (error) {
			throw Error(String(error));
		}
		finally {
			isCountryLoading.value = false;
		}
	};

	const tagItems = ref<Tag[]>([]);
	const isTagDataFetched = ref(false);
	const isTagLoading = ref(false);

	const fetchTagItems = async () => {
		if (isTagDataFetched.value || isTagLoading.value) return;

		try {
			const cachedData: Tag[] = await loadFromCache(CACHE_KEY_TAG_ITEMS) || [];

			if (cachedData.length) {
				tagItems.value = [
					{ id: 0, tag: useT('all') },
					...cachedData,
				];
				isTagDataFetched.value = true;
				return;
			}

			const api = baseDateRepository($api);
			isTagLoading.value = true;

			const response = await api.getTagList({ languageId: Language.PERSIAN });
			if (response.result) {
				tagItems.value = response.result;
				isTagDataFetched.value = true;

				await saveToCache(CACHE_KEY_TAG_ITEMS, response.result);
			}
		}
		catch (error) {
			throw Error(String(error));
		}
		finally {
			isTagLoading.value = false;
		}
	};

	const quoteItems = ref<QuoteItem[]>([]);
	const isQuoteDataFetched = ref(false);
	const isQuoteLoading = ref(false);

	const fetchQuoteItems = async (marketTypeId: number) => {
		if (isQuoteDataFetched.value || isQuoteLoading.value) return;

		try {
			const cachedData: QuoteItem[] = await loadFromCache(CACHE_KEY_QUOTE_ITEMS) || [];

			if (cachedData.length) {
				quoteItems.value = cachedData;
				isQuoteDataFetched.value = true;
				return;
			}

			const api = baseDateRepository($api);
			isQuoteLoading.value = true;

			const response = await api.getQuoteList({ marketTypeId });
			if (response.result) {
				quoteItems.value = response.result;
				isQuoteDataFetched.value = true;

				await saveToCache(CACHE_KEY_QUOTE_ITEMS, response.result);
			}
		}
		catch (error) {
			throw Error(String(error));
		}
		finally {
			isQuoteLoading.value = false;
		}
	};

	const marketBriefItems = ref<MarketBriefItem[]>([]);
	const isMarketBriefDataFetched = ref(false);
	const isMarketBriefLoading = ref(false);

	const fetchMarketBriefItems = async () => {
		if (isMarketBriefDataFetched.value || isMarketBriefLoading.value) return;

		try {
			const cachedData: MarketBriefItem[] = await loadFromCache(CACHE_KEY_MARKET_BRIEF_ITEMS) || [];

			if (cachedData.length) {
				marketBriefItems.value = cachedData;
				isMarketBriefDataFetched.value = true;
				return;
			}

			const api = baseDateRepository($api);
			isMarketBriefLoading.value = true;

			const response = await api.getMarketBriefList();
			if (response.result) {
				marketBriefItems.value = response.result || [];
				isMarketBriefDataFetched.value = true;

				await saveToCache(CACHE_KEY_MARKET_BRIEF_ITEMS, response.result);
			}
		}
		catch (error) {
			throw Error(String(error));
		}
		finally {
			isMarketBriefLoading.value = false;
		}
	};

	const currencyBriefItems = ref<CurrencyBriefItem[]>([]);
	const isCurrencyBriefDataFetched = ref(false);
	const isCurrencyBriefLoading = ref(false);

	const fetchCurrencyBriefItems = async (languageId: number) => {
		if (isCurrencyBriefDataFetched.value || isCurrencyBriefLoading.value) return;

		try {
			const cachedData: CurrencyBriefItem[] = await loadFromCache(CACHE_KEY_CURRENCY_BRIEF_ITEMS) || [];

			if (cachedData.length) {
				currencyBriefItems.value = cachedData;
				isCurrencyBriefDataFetched.value = true;
				return;
			}

			const api = baseDateRepository($api);
			isCurrencyBriefLoading.value = true;

			const response = await api.getCurrencyBriefList({ languageId });
			if (response.result) {
				currencyBriefItems.value = response.result;
				isCurrencyBriefDataFetched.value = true;

				await saveToCache(CACHE_KEY_CURRENCY_BRIEF_ITEMS, response.result);
			}
		}
		catch (error) {
			throw Error(String(error));
		}
		finally {
			isCurrencyBriefLoading.value = false;
		}
	};

	const getMatchedCurrencyItems = async (): Promise<CurrencyBriefItem[]> => {
		if (!isQuoteDataFetched.value && !isQuoteLoading.value) {
			await fetchQuoteItems(MarketType.SPOT);
		}

		if (!isCurrencyBriefDataFetched.value && !isCurrencyBriefLoading.value) {
			await fetchCurrencyBriefItems(Language.PERSIAN);
		}

		return quoteItems.value
			.map((quote) => currencyBriefItems.value.find((currency) => currency.id === quote.id))
			.filter((item) => item !== undefined) as CurrencyBriefItem[];
	};

	const findCurrencyById2 = async (id: number, languageId: number = Language.PERSIAN): Promise<CurrencyBriefItem | null> => {
		if (currencyBriefItems.value.length === 0) {
			await fetchCurrencyBriefItems(languageId);
		}

		let start = 0;
		let end = currencyBriefItems.value.length - 1;

		while (start <= end) {
			const mid = Math.floor((start + end) / 2);
			const currentItem = currencyBriefItems.value[mid];

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

	const findCurrencyById = async (id: number): Promise<CurrencyBriefItem | null> => {
		const worker = useBaseWorker();
		const result = await worker.findCurrencyById(id, useEnv('apiBaseUrl'));
		return result;
	};

	const findCurrencyBycSymbol = async (cSymbol: string): Promise<CurrencyBriefItem | null> => {
		const worker = useBaseWorker();
		const result = await worker.findCurrencyBycSymbol(cSymbol, useEnv('apiBaseUrl'));
		return result;
	};

	const findMarketById = async (id: number): Promise<MarketBriefItem | null> => {
		// const worker = useMarketWorker();
		// const result = await worker.findMarketById(id);
		// return result;
	};

	const findMarketBymSymbol = async (mSymbol: string): Promise<MarketBriefItem | null> => {
		// const worker = useMarketWorker();
		// const result = await worker.findMarketBymSymbol(mSymbol);
		// return result;
	};

	const findCommission = async (currencyQuoteId: number, marketTypeId: number, levelIndicator: number): Promise<Commission | null> => {
		await fetchUserTraderCommissionList({
			marketType: String(marketTypeId),
		});

		const commission = await userTraderCommissionList.value.find((item) =>
			item.currencyQuoteId === currencyQuoteId
			&& item.marketTypeId === marketTypeId
			&& item.levelIndicator === levelIndicator,
		);

		if (commission) {
			return commission;
		}
		else {
			return null;
		}
	};

	return {
		tagItems, fetchTagItems, isTagLoading,
		quoteItems, fetchQuoteItems, isQuoteLoading,
		marketBriefItems, fetchMarketBriefItems, isMarketBriefLoading,
		currencyBriefItems, fetchCurrencyBriefItems, isCurrencyBriefLoading,
		getMatchedCurrencyItems,
		findCurrencyById,
		findCurrencyById2,
		findCurrencyBycSymbol,
		findMarketById,
		findMarketBymSymbol,
		findCommission,
		fetchCountries, countries,
	};
});
