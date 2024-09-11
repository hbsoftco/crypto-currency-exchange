import { baseDateRepository } from '~/repositories/base-date.repository';
import { useNuxtApp, useAsyncData } from '#app';
import type { GetLanguageParams } from '~/types/base.types';
import type { GetQuoteParams } from '~/types/response/quote-list.types';

export const useCachedData = () => {
	const { $api, payload } = useNuxtApp();
	const repo = baseDateRepository($api);

	const useCachedMarketBriefList = () =>
		useAsyncData('cachedMarketBriefList', () => repo.getMarketBriefList(), {
			getCachedData: (key) => payload.data[key],
			dedupe: 'cancel',
			transform: (data) => data.result,
		});

	const useCachedCurrencyBriefList = (params: GetLanguageParams) =>
		useAsyncData('cachedCurrencyBriefList', () => repo.getCurrencyBriefList(params), {
			getCachedData: (key) => payload.data[key],
			dedupe: 'cancel',
			transform: (data) => data.result,
		});

	const useCachedQuoteList = (params: GetQuoteParams) =>
		useAsyncData('cachedQuoteList', () => repo.getQuoteList(params), {
			getCachedData: (key) => payload.data[key],
			dedupe: 'cancel',
			transform: (data) => data.result,
		});

	return {
		useCachedMarketBriefList,
		useCachedCurrencyBriefList,
		useCachedQuoteList,
	};
};
