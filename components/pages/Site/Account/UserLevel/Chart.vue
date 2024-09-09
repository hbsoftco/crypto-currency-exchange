<template>
	<div class="relative w-72 h-72  rounded-full">
		<ClientOnly>
			<VChart
				:option="chartOptions"
				style="height: 100%; width: 100%;"
			/>
			<div class="absolute inset-0 flex flex-col items-center justify-center">
				<span class="text-yellow-400 text-lg"> {{ useNumber('876,321') }}{{ $t('dollar') }}</span>
				<div class="flex items-center justify-center mt-2 bg-gray-800 rounded-full px-3 py-1">
					<span class="text-white text-lg">سطح ماهی</span>
					<NuxtImg
						src="/images/delete/fish.png"
						alt="Fish Icon"
						class="w-6 h-6 ml-2"
					/>
				</div>
			</div>
		</ClientOnly>
	</div>
</template>

<script setup>
import { useNumber } from '~/composables/useNumber';

const chartOptions = computed(() => ({
	series: [
		{
			type: 'pie',
			radius: ['50%', '0%'],
			avoidLabelOverlap: false,
			label: {
				show: false,
			},
			emphasis: {
				label: {
					show: false,
				},
			},
			labelLine: {
				show: false,
			},
			data: [
				{ value: 33, name: '100', itemStyle: { color: '#FFCC00' } },
				{ value: 67, name: '1000', itemStyle: { color: '#444444' } },
			],
		},
	],
	backgroundColor: '#000000',
	graphic: [
		{
			type: 'text',
			left: 'center',
			top: 'center',
			style: {
				text: '876,321 دلار',
				textAlign: 'center',
				fill: '#FFD700',
				fontSize: 18,
				fontWeight: 'bold',
			},
		},
	],
}));
</script>
