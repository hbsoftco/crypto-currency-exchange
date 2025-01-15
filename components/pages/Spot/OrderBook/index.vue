<template>
	<div v-if="isMobile">
		<OrderList />
	</div>
	<!-- Mobile -->

	<div
		v-else
		class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2"
	>
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
	<!-- Desktop -->
</template>

<script setup lang="ts">
const LatestTrades = defineAsyncComponent(() => import('~/components/pages/Spot/OrderBook/LatestTrades.vue'));
const OrderList = defineAsyncComponent(() => import('~/components/pages/Spot/OrderBook/OrderList.vue'));

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});

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
