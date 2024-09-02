import { defineStore } from 'pinia';

import { marketRepository } from '~/repositories/market.repository';
import type { MarketListWithSparkLineChartItem, MarketListWithSparkLineChartResponse } from '~/types/response/market.types';
import type { GetMarketListWithSparkLineChartParams } from '~/types/base.types';

export const useMarketStore = defineStore('market', () => {
	const baseDataStore = useBaseDataStore();

	const { $api } = useNuxtApp();
	const api = marketRepository($api);

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

			return marketList.value;
		}
		catch (error) {
			isMarketListFetched.value = false;
			throw Error(`Error fetching market list: ${String(error)}`);
		}
		finally {
			isMarketListLoading.value = false;
		}
	};

	const binarySearch = <T extends { id: number }>(arr: T[], targetId: number): T | null => {
		let left = 0;
		let right = arr.length - 1;

		while (left <= right) {
			const mid = Math.floor((left + right) / 2);
			if (arr[mid].id === targetId) {
				return arr[mid];
			}
			else if (arr[mid].id < targetId) {
				left = mid + 1;
			}
			else {
				right = mid - 1;
			}
		}
		return null;
	};

	const getMarketItemById = (id: number) => {
		const marketItem = binarySearch(marketList.value, id);
		if (!marketItem) return null;

		const marketBrief = binarySearch(baseDataStore.marketBriefItems, id);
		const currencyBrief = binarySearch(baseDataStore.currencyBriefItems, id);

		return {
			...marketItem,
			marketBrief,
			currencyBrief,
		};
	};

	return {
		marketList,
		isMarketListLoading,
		isMarketListFetched,
		fetchMarketListWithSparkLineChart,
		getMarketItemById,
	};
});
