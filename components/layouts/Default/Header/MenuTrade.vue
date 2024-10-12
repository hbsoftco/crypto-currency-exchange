<template>
	<div class="bg-primary-gray-light dark:bg-hover2-50">
		<UTabs
			:items="quoteItems"
			dir="ltr"
			class="text-left"
			:ui="{
				container: 'mt-0',
				list: {
					padding: 'pl-4 pt-4',
					tab: {
						size: 'text-xs',
						padding: 'px-2',
					},
				},
			}"
		>
			<template #default="{ item, selected }">
				<span
					class="truncate"
					:class="[selected && 'text-primary-500 dark:text-primary-400']"
				>{{ $t(item.label) }}</span>
			</template>
			<template #item="{ item }">
				<div class="border-t border-t-primary-gray-light dark:border-t-primary-gray-dark p-2">
					<div v-if="item.key === 'USDT'">
						<MenuTradeCoins
							:is-loading="isLoading"
							:markets="marketItems"
							:tags="tagItems"
							@selected-tag="selectedTag"
						/>
					</div>
					<div v-else-if="item.key === 'TMN'">
						<MenuTradeCoins
							:is-loading="isLoading"
							:markets="marketItems"
							:tags="tagItems"
							@selected-tag="selectedTag"
						/>
					</div>
				</div>
			</template>
		</UTabs>
	</div>
</template>

<script setup lang="ts">
import MenuTradeCoins from '~/components/layouts/Default/Header/MenuTradeCoins.vue';
import { marketRepository } from '~/repositories/market.repository';
import type { MarketL16 } from '~/types/response/market.types';
import { Language } from '~/utils/enums/language.enum';
import { MarketType } from '~/utils/enums/market.enum';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const baseDataStore = useBaseDataStore();
const quoteItems = ref<QuoteTab[]>([]);

type QuoteTab = {
	label: string;
	key: string;
};

const loadCurrencyOptions = async () => {
	const currencyItems = await baseDataStore.getMatchedCurrencyItems();
	quoteItems.value = currencyItems.map((item) => ({
		label: item.cSymbol,
		key: item.cSymbol,
	}));
};
await loadCurrencyOptions();

const isLoading = ref<boolean>(false);

const tagItems = computed(() => baseDataStore.tagItems);

const selectedTag = async (event: number) => {
	params.value.tagTypeId = String(event);
	marketItems.value = await getMarkets();
};

const marketItems = ref<MarketL16[]>([]);

const initData = async () => {
	try {
		isLoading.value = true;
		await baseDataStore.fetchTagItems();
		marketItems.value = await getMarkets();
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
	finally {
		isLoading.value = false;
	}
};

const params = ref({
	currencyQuoteId: '',
	marketTypeId: String(MarketType.SPOT),
	tagTypeId: '',
	searchStatement: '',
	pageNumber: '1',
	pageSize: '20',
});

const getMarkets =	async () => {
	const response = await marketRepo.getMarketListL16(params.value);

	await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
	await baseDataStore.fetchMarketBriefItems();
	const marketBriefList = baseDataStore.marketBriefItems;
	const currencyBriefList = baseDataStore.currencyBriefItems;

	return useProcessMarketData(response.result.rows, marketBriefList, currencyBriefList);
};

onMounted(initData);
</script>
