<template>
	<div class="w-full relative bg-hover-light dark:bg-hover-dark rounded-sm px-2 ">
		<UTabs
			:items="items"
			:ui="{
				list: {
					tab: {
						font: 'font-normal',
						size: 'text-sm',
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
				<div
					v-if="item.key === 'openOrders'"
					class="space-y-3"
				>
					<OpenOrder />
				</div>
				<div
					v-else-if="item.key === 'orderHistory'"
					class="space-y-3"
				>
					<OrderHistory />
				</div>
				<div
					v-else-if="item.key === 'tradeHistory'"
					class="space-y-3"
				>
					<TradeHistory />
				</div>
			</template>
		</UTabs>
		<div class="absolute left-4 top-3">
			<div class="flex items-center">
				<UCheckbox
					v-model="selected"
					:label="translatedLabel"
				/>
				<UButton
					class="mr-2 text-primary-yellow-light hover:bg-hover-light dark:hover:bg-hover-dark dark:text-primary-yellow-dark bg-hover-light dark:bg-hover-dark text-xs font-bold"
					to="#"
				>
					{{ $t('allOrders') }}
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import OpenOrder from '~/components/pages/Spot/OrderTabs/OpenOrders.vue';
import OrderHistory from '~/components/pages/Spot/OrderTabs/OrderHistory.vue';
import TradeHistory from '~/components/pages/Spot/OrderTabs/TradeHistory.vue';

const items = [
	{
		key: 'openOrders',
		label: 'openOrders',
		content: '',
	},
	{
		key: 'orderHistory',
		label: 'orderHistory',
		content: '',
	},
	{
		key: 'tradeHistory',
		label: 'tradeHistory',
		content: '',
	},
];
const selected = ref(true);
const translatedLabel = useT('showOtherMarkets');
</script>
