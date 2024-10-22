import { defineStore } from 'pinia';
import md5 from 'md5';

import { marketRepository } from '~/repositories/market.repository';
import type { MarketListWithSparkLineChartItem, MarketListWithSparkLineChartResponse } from '~/types/response/market.types';
import type { GetMarketListWithSparkLineChartParams } from '~/types/base.types';
import { Language } from '~/utils/enums/language.enum';

export const useMarketStore = defineStore('market', () => {
	const { $api } = useNuxtApp();
	const api = marketRepository($api);

	const baseDataStore = useBaseDataStore();

	const marketList = ref<MarketListWithSparkLineChartItem[]>([]);
	const isMarketListLoading = ref(false);
	const isMarketListFetched = ref(false);
	const lastParamsHash = ref('');

	const fetchMarketListWithSparkLineChart = async (params: GetMarketListWithSparkLineChartParams) => {
		const currentParamsHash = md5(JSON.stringify(params));
		if (isMarketListLoading.value && lastParamsHash.value === currentParamsHash) return;

		isMarketListLoading.value = true;
		lastParamsHash.value = currentParamsHash;

		try {
			const response: MarketListWithSparkLineChartResponse = await api.getMarketListWithSparkLineChart(params);
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
