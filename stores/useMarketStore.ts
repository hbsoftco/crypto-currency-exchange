import { defineStore } from 'pinia';
import md5 from 'md5';

import { marketRepository } from '~/repositories/market.repository';
import { Language } from '~/utils/enums/language.enum';
import type { MarketL21, MarketsL21Params, MarketsL21Response } from '~/types/definitions/market.types';

export const useMarketStore = defineStore('market', () => {
	const { $api } = useNuxtApp();
	const api = marketRepository($api);

	const baseDataStore = useBaseDataStore();

	const marketList = ref<MarketL21[]>([]);
	const isMarketListLoading = ref(false);
	const isMarketListFetched = ref(false);
	const lastParamsHash = ref('');

	const fetchMarketListWithSparkLineChart = async (params: MarketsL21Params) => {
		const currentParamsHash = md5(JSON.stringify(params));
		if (isMarketListLoading.value && lastParamsHash.value === currentParamsHash) return;

		isMarketListLoading.value = true;
		lastParamsHash.value = currentParamsHash;

		try {
			const response: MarketsL21Response = await api.getMarketListL21(params);
			marketList.value = response.result.rows.map((item) => ({
				...item,
				sparklineChart: JSON.parse(String(item.sparklineChart)),
			})) || [];
			isMarketListFetched.value = true;

			await baseDataStore.fetchMarketBriefItems();
			await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
			// await baseDataStore.fetchIcons();

			marketList.value = marketList.value.map((marketItem) => {
				const matchedBriefItem = baseDataStore.marketBriefItems.find(
					(briefItem) => briefItem.id === marketItem.id,
				);

				if (matchedBriefItem) {
					const matchedCurrencyBriefItem = baseDataStore.currencyBriefItems.find(
						(currencyItem) => currencyItem.id === matchedBriefItem.cbId,
					);
					matchedBriefItem.currencyBriefItem = matchedCurrencyBriefItem || null;

					const matchedQuoteItem = baseDataStore.currencyBriefItems.find(
						(currencyItem) => currencyItem.id === matchedBriefItem.cqId,
					);
					matchedBriefItem.quoteItem = matchedQuoteItem || null;
				}

				return {
					...marketItem,
					marketBriefItem: matchedBriefItem || null,
				};
			});

			return marketList.value || null;
		}
		catch (error) {
			isMarketListFetched.value = false;
			throw Error(`Error fetching market list: ${String(error)}`);
		}
		finally {
			isMarketListLoading.value = false;
		}
	};

	return {
		marketList,
		isMarketListLoading,
		isMarketListFetched,
		fetchMarketListWithSparkLineChart,
	};
});
