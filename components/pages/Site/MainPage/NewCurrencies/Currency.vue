<template>
	<div
		class="border border-secondary-gray-light  dark:border-secondary-gray-dark py-4 px-6 w-64 max-w-64 rounded"
		dir="rtl"
	>
		<div class="flex flex-row-reverse items-center">
			<NuxtImg
				src="/images/delete/bitcoin.png"
				alt="trand Logo"
				class="w-8 h-8 mr-3"
			/>
			<span class="text-base font-bold">PAW</span>/
			<span class="text-base font-bold">USDT</span>
		</div>
		<div class="flex justify-between flex-row-reverse mt-2">
			<div
				class="flex justify-between flex-col"
				dir="ltr"
			>
				<span class="text-base font-bold text-left">{{ useNumber(0.00001953) }}</span>
				<span class="text-base font-medium text-accent-green text-left">{{ useNumber('+9.55%') }}</span>
			</div>
			<div class="w-24 h-14">
				<ClientOnly>
					<VChart
						v-if="data.length"
						:option="chartOptions"
						class="w-24 h-14"
					/>
				</ClientOnly>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';

const data = [1, 2, -1, 11, 33, 5, 6, 3];
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
			data: data,
			type: 'line',
			smooth: true,
			lineStyle: {
				color: '#4CAF50',
				width: 2,
			},
			itemStyle: {
				opacity: 0,
			},
			areaStyle: {
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 0,
							color: 'rgba(76, 175, 80, 0.6)',
						},
						{
							offset: 1,
							color: 'rgba(76, 175, 80, 0)',
						},
					],
					global: false,
				},
			},
		},
	],
}));
</script>
