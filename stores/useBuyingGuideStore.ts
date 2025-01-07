// stores/helpBuyList.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { GetHowBuyListParams } from '~/types/base.types';
import { systemRepository } from '~/repositories/system.repository';
import type { SystemRoot } from '~/types/definitions/system.types';

export const useBuyingGuideStore = defineStore('buyingGuide', () => {
	const buyList = ref<SystemRoot[]>([]);
	const totalCount = ref(0);
	const params = ref<GetHowBuyListParams>({
		languageId: '',
		tagId: '',
		searchStatement: '',
		group: '',
		pageNumber: '1',
		pageSize: '20',
	});

	const isLoading = ref(false);
	const baseDataStore = useBaseDataStore();
	const { $api } = useNuxtApp();
	const systemRepo = systemRepository($api);

	const findCurrencyById = (id: number) => {
		let start = 0;
		let end = baseDataStore.currencyBriefItems.length - 1;

		while (start <= end) {
			const mid = Math.floor((start + end) / 2);
			const currentItem = baseDataStore.currencyBriefItems[mid];

			if (currentItem.id === id) {
				return currentItem;
			}
			if (currentItem.id < id) {
				start = mid + 1;
			}
			else {
				end = mid - 1;
			}
		}

		return null;
	};

	const fetchBuyList = async () => {
		isLoading.value = true;
		try {
			const { result } = await systemRepo.getBuyList(params.value);
			totalCount.value = result.totalCount;
			const finalList = result.rows as SystemRoot[];
			buyList.value = finalList.map((buy) => {
				const currency = findCurrencyById(buy.cid);
				return {
					...buy,
					currency: currency ? currency : null,
				};
			});
		}
		catch (error) {
			console.error('Error fetching buy list:', error);
		}
		finally {
			isLoading.value = false;
		}
	};

	const onPageChange = async (newPage: number) => {
		params.value.pageNumber = String(newPage);
		await fetchBuyList();
	};

	return {
		buyList,
		totalCount,
		isLoading,
		fetchBuyList,
		onPageChange,
		params,
	};
});
