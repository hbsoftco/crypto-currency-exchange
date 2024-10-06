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
						<MenuTradeCoins :tags="tagItems" />
					</div>
					<div v-else-if="item.key === 'TMN'">
						<MenuTradeCoins :tags="tagItems" />
					</div>
				</div>
			</template>
		</UTabs>
	</div>
</template>

<script setup lang="ts">
import MenuTradeCoins from './MenuTradeCoins.vue';

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

const initData = async () => {
	try {
		isLoading.value = true;
		await baseDataStore.fetchTagItems();
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
	finally {
		isLoading.value = false;
	}
};

onMounted(initData);
</script>
