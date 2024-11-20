<template>
	<ULink
		:to="`/spot/${splitMarket(market?.mSymbol)}`"
		class="border border-secondary-gray-light hover:shadow-lg hover:cursor-pointer dark:border-secondary-gray-dark py-4 px-6 pr-4 w-64 min-w-64 max-w-64 rounded"
		dir="rtl"
	>
		<div class="flex flex-row-reverse items-center">
			<img
				v-if="market.currency"
				:src="`https://api-bitland.site/media/currency/${market?.currency?.cSymbol}.png`"
				:alt="market?.currency?.cName"
				class="w-8 h-8 mr-3 rounded-full"
			>
			<span class="text-base font-bold">{{ market?.currency?.cSymbol }}</span>
			<span class="mx-0.5">/</span>
			<span class="text-base font-bold">{{ market?.quote?.cSymbol }}</span>
		</div>
		<div class="flex justify-between flex-row-reverse mt-2">
			<div
				class="flex justify-between flex-col"
				dir="ltr"
			>
				<span class="text-base font-bold text-left">{{ useNumber(priceFormat(market.indexPrice, ',')) }}</span>
				<span :class="priceChangeClass">{{ useNumber(market.priceChangePercIn24H) }}</span>
			</div>
			<div class="w-24 h-14 pt-3">
				<ClientOnly>
					<VChart
						v-if="market.sparklineChart.length"
						:option="chartOptions"
						class="w-24 h-14"
					/>
				</ClientOnly>
			</div>
		</div>
	</ULink>
</template>

<script setup lang="ts">
import { priceFormat } from '~/utils/price-format';
import { splitMarket } from '~/utils/split-market';
import { useNumber } from '~/composables/useNumber';
import type { MarketL21 } from '~/types/definitions/market.types';

interface Props {
	market: MarketL21;
}

const props = defineProps<Props>();

const priceChangeClass = computed(() => {
	return Number(props.market.priceChangePercIn24H) >= 0
		? 'text-base font-medium text-accent-green text-left'
		: 'text-base font-medium text-accent-red text-left';
});

const chartOptions = computed(() => ({
	grid: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	xAxis: {
		type: 'category',
		data: [],
		show: false,
	},
	yAxis: {
		type: 'value',
		show: false,
	},
	series: [
		{
			data: props.market.sparklineChart,
			type: 'line',
			smooth: true,
			lineStyle: {
				color: Number(props.market.priceChangePercIn24H) >= 0 ? '#4CAF50' : '#F44336',
				width: 2,
			},
			itemStyle: {
				opacity: 0,
			},
		},
	],
}));
</script>
