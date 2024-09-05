import { defineStore } from 'pinia';

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

	const fetchMarketListWithSparkLineChart = async (params: GetMarketListWithSparkLineChartParams) => {
		if (isMarketListLoading.value) return;
		isMarketListLoading.value = true;

		try {
			const response: MarketListWithSparkLineChartResponse = await api.getMarketListWithSparkLineChart(params);
			marketList.value = response.result.rows.map((item) => ({
				...item,
				sparklineChart: JSON.parse(String(item.sparklineChart)),
			})) || [];
			isMarketListFetched.value = true;

			await baseDataStore.fetchMarketBriefItems();
			await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
			await baseDataStore.fetchIcons();

			marketList.value = marketList.value.map((marketItem) => {
				const matchedBriefItem = baseDataStore.marketBriefItems.find(
					(briefItem) => briefItem.id === marketItem.id,
				);

				if (matchedBriefItem) {
					// Match cbId with currencyBriefItems to add currencyBriefItem
					const matchedCurrencyBriefItem = baseDataStore.currencyBriefItems.find(
						(currencyItem) => currencyItem.id === matchedBriefItem.cbId,
					);
					matchedBriefItem.currencyBriefItem = matchedCurrencyBriefItem || null;

					// Match cqId with currencyBriefItems to add quoteItem
					const matchedQuoteItem = baseDataStore.currencyBriefItems.find(
						(currencyItem) => currencyItem.id === matchedBriefItem.cqId,
					);
					matchedBriefItem.quoteItem = matchedQuoteItem || null;

					// Match cbId with icons to add icon
					const matchedIcon = baseDataStore.icons.find(
						(icon) => icon.currencyId === matchedBriefItem.cbId,
					);
					matchedBriefItem.icon = matchedIcon || null;
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
