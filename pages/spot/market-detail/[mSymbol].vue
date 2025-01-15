<template>
	<div class="px-4">
		<MarketDetailHeader :title="`${spotStore.currency}${spotStore.quote}`" />

		<div
			class="flex justify-between mb-6"
			dir="ltr"
		>
			<div>
				<p class="text-xs ml-1 mb-1.5">
					Last Price
				</p>
				<div class="ml-1">
					<strong
						dir="ltr"
						class="text-base font-bold"
						:class="{
							[spotStore.textClass]: spotStore.updatedPrice,
							'': !spotStore.updatedPrice,
						}"
					>{{ priceFormat(String(spotStore.ticker?.i), true) }}</strong>
				</div>
				<div>
					<UiChangePrice
						classes="text-xs font-normal ml-0"
						:show-percent="true"
						:bg-color="false"
						pl="pl-0"
						:change="parseFloat(String(spotStore.ticker?.p))"
						:icon="false"
					/>
				</div>
			</div>
			<div class="flex justify-between w-1/2">
				<div>
					<div class="mb-3">
						<p class="text-xs ml-1 mb-1.5">
							24H High
						</p>
						<div>
							<strong
								class="text-xs font-bold"
								dir="ltr"
							>{{ priceFormat(String(spotStore.ticker?.h), true) }}</strong>
						</div>
					</div>
					<div>
						<p class="text-xs ml-1 mb-1.5">
							24H Low
						</p>
						<div>
							<strong
								class="text-xs font-bold"
								dir="ltr"
							>{{ priceFormat(String(spotStore.ticker?.l), true) }}</strong>
						</div>
					</div>
				</div>
				<div class="ml-4">
					<div class="mb-3">
						<p class="text-xs ml-1 mb-1.5">
							24H Vol ({{ spotStore.currency }})
						</p>
						<div>
							<strong
								class="text-xs font-bold"
								dir="ltr"
							>{{ priceFormat(String(spotStore.ticker?.q), true) }}</strong>
						</div>
					</div>
					<div>
						<p class="text-xs ml-1 mb-1.5">
							24H Vol ({{ spotStore.quote }})
						</p>
						<div>
							<strong
								class="text-xs font-bold"
								dir="ltr"
							>{{ priceFormat(String(spotStore.ticker?.p), true) }}</strong>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mb-6">
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
						v-show="spotStore.symbol !== 'USDTTMN'"
						class="truncate"
						:class="[selected && 'text-primary-500 dark:text-primary-400']"
					>{{ spotStore.symbol !== 'USDTTMN' ? $t(item.label) : '' }}</span>
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

		<div class="mb-24">
			<div class="w-full">
				<UTabs
					:items="orderItems"
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
							<DepthChart />
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
		</div>
	</div>
</template>

<script setup lang="ts">
import MarketDetailHeader from '~/components/layouts/Default/Mobile/MarketDetailHeader.vue';
import { priceFormat } from '~/utils/helpers';

const LatestTrades = defineAsyncComponent(() => import('~/components/pages/Spot/OrderBook/LatestTrades.vue'));
const BitlandChart = defineAsyncComponent(() => import('~/components/pages/Spot/OrderFlow/BitlandChart.vue'));
const DepthChart = defineAsyncComponent(() => import('~/components/pages/Spot/OrderFlow/DepthChart.vue'));

const route = useRoute();
const mSymbol = String(route.params.mSymbol);
const [currency, quote] = mSymbol.split('_');

const spotStore = useSpotStore();

const items = [
	...(spotStore.symbol !== 'USDTTMN'
		? [{ key: 'globalChart', label: 'globalChart', content: '' }]
		: []),
	{ key: 'bitlandChart', label: 'bitlandChart', content: '' },
];

const orderItems = [
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

onMounted(() => {
	spotStore.symbol = `${currency}${quote}`;
	spotStore.currency = currency;
	spotStore.quote = quote;

	spotStore.getSnapshot();

	spotStore.startSocket();
});

onBeforeUnmount(() => {
	spotStore.stopSocket();
});
</script>
