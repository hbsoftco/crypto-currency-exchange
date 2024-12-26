<template>
	<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2 mb-2 relative">
		<div class="flex justify-end items-center absolute top-5 left-6 z-[1]">
			<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-50">
				<button
					:class="{
						'text-primary-yellow-light dark:text-primary-yellow-dark': activeTab === 'depth',
					}"
					@click="setActiveTab('depth')"
				>
					{{ $t('depth') }}
				</button>
				<button
					class="mx-4"
					:class="{
						'text-primary-yellow-light dark:text-primary-yellow-dark': activeTab === 'tradingView',
					}"
					@click="setActiveTab('tradingView')"
				>
					{{ $t('tradingView') }}
				</button>
				<button
					:class="{
						'text-primary-yellow-light dark:text-primary-yellow-dark': activeTab === 'info',
					}"
					@click="setActiveTab('info')"
				>
					{{ $t('info') }}
				</button>
			</div>
		</div>
		<!-- Left Tabs -->

		<div v-if="activeTab==='tradingView'">
			<UTabs
				:items="items"
				:default-index="spotStore.quote === 'TMN' ? 1 : 0"
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
						v-if="item.key === 'globalChart'"
						class="space-y-3"
					>
						<BitlandChart quote="USDT" />
					</div>
					<div
						v-else-if="item.key === 'bitlandChart'"
						class="space-y-3"
					>
						<BitlandChart quote="TMN" />
					</div>
				</template>
			</UTabs>
		</div>
		<!-- TradingView -->

		<div v-if="activeTab==='depth'">
			<DepthChart />
		</div>
		<!-- Depth -->

		<div v-if="activeTab==='info'">
			<MarketRevealing />
		</div>
		<!-- Info -->
	</div>
</template>

<script setup lang="ts">
const BitlandChart = defineAsyncComponent(() => import('~/components/pages/Spot/OrderFlow/BitlandChart.vue'));
const DepthChart = defineAsyncComponent(() => import('~/components/pages/Spot/OrderFlow/DepthChart.vue'));
const MarketRevealing = defineAsyncComponent(() => import('~/components/pages/Spot/OrderFlow/MarketRevealing.vue'));

const spotStore = useSpotStore();

const items = [
	{ key: 'globalChart', label: 'globalChart', content: '' },
	{ key: 'bitlandChart', label: 'bitlandChart', content: '' },
];

// const items = [
// 	...(spotStore.quote === 'USDT'
// 		? [{ key: 'globalChart', label: 'globalChart', content: '' }]
// 		: []),
// 	...(spotStore.quote === 'TMN'
// 		? [{ key: 'bitlandChart', label: 'bitlandChart', content: '' }]
// 		: []),
// ];

const activeTab = ref('tradingView');

const setActiveTab = (tabKey: string) => {
	activeTab.value = tabKey;
};
</script>
