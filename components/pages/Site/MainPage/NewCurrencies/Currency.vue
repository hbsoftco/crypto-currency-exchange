<template>
	<ULink
		:to="`/spot/${splitMarket(currency?.marketBriefItem?.mSymbol)}`"
		class="border border-secondary-gray-light hover:shadow-lg hover:cursor-pointer dark:border-secondary-gray-dark py-4 px-6 pr-4 w-64 min-w-64 max-w-64 rounded"
		dir="rtl"
	>
		<div class="flex flex-row-reverse items-center">
			<NuxtImg
				:src="`https://api-bitland.site/media/currency/${currency.marketBriefItem?.currencyBriefItem?.cSymbol}.png`"
				:alt="currency.marketBriefItem?.currencyBriefItem?.cName"
				class="w-8 h-8 mr-3 rounded-full"
			/>
			<span class="text-base font-bold">{{ currency.marketBriefItem?.currencyBriefItem?.cSymbol }}</span>
			<span class="mx-0.5">/</span>
			<span class="text-base font-bold">{{ currency.marketBriefItem?.quoteItem?.cSymbol }}</span>
		</div>
		<div class="flex justify-between flex-row-reverse mt-2">
			<div
				class="flex justify-between flex-col"
				dir="ltr"
			>
				<span class="text-base font-bold text-left">{{ useNumber(priceFormat(currency.indexPrice, ',')) }}</span>
				<span :class="priceChangeClass">{{ useNumber(currency.priceChangePercIn24H) }}</span>
			</div>
			<div class="w-24 h-14 pt-3">
				<ClientOnly>
					<VChart
						v-if="currency.sparklineChart.length"
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
import { splitMarket } from '~/utils/splitMarket';
import { useNumber } from '~/composables/useNumber';
import type { MarketListWithSparkLineChartItem } from '~/types/response/market.types';

interface Props {
	currency: MarketListWithSparkLineChartItem;
}

const props = defineProps<Props>();

const priceChangeClass = computed(() => {
	return Number(props.currency.priceChangePercIn24H) >= 0
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
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		show: false,
	},
	yAxis: {
		type: 'value',
		show: false,
	},
	series: [
		{
			data: props.currency.sparklineChart,
			type: 'line',
			smooth: true,
			lineStyle: {
				color: Number(props.currency.priceChangePercIn24H) >= 0 ? '#4CAF50' : '#F44336', // Green if positive, Red if negative
				width: 2,
			},
			itemStyle: {
				opacity: 0,
			},
		},
	],
}));
</script>
