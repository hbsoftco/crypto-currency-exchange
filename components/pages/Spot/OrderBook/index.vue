<template>
	<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2">
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
					v-if="item.key === 'orderList'"
					class="space-y-3"
				>
					<OrderList />
				</div>
				<div
					v-else-if="item.key === 'latestTrades'"
					class="space-y-3"
				>
					<LatestTrades />
				</div>
			</template>
		</UTabs>
	</div>
</template>

<script setup lang="ts">
import LatestTrades from './LatestTrades.vue';
import OrderList from './OrderList.vue';

// import type { BidAsk, LatestTrade, Ticker } from '~/types/response/spot.types';

// interface PropsDefinition {
// 	ticker: Ticker;
// 	bids: BidAsk[];
// 	asks: BidAsk[];
// 	latestTrades: LatestTrade[];
// }
// defineProps<PropsDefinition>();

const items = [
	{
		key: 'orderList',
		label: 'orderList',
		content: '',
	},
	{
		key: 'latestTrades',
		label: 'latestTrades',
		content: '',
	},
];
</script>
