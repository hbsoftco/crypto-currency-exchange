<template>
	<UContainer>
		<div class="mb-4 mt-8">
			<UiTitleWithBack :title="$t('marketStatistics')" />
		</div>
		<div class="flex justify-between w-full h-full relative mb-16">
			<div class="w-[50%]">
				<ClientOnly>
					<VChart
						:option="greenBarOptions"
						class="w-full h-96"
					/>
				</ClientOnly>
				<div class="text-center text-base font-bold">
					{{ $t('numberOfRisingMarkets') }}
				</div>
			</div>
			<div class="w-[50%]">
				<ClientOnly>
					<VChart
						:option="redBarOptions"
						class="w-full h-96"
					/>
				</ClientOnly>
				<div class="text-center text-base font-bold">
					{{ $t('numberOfDecliningMarkets') }}
				</div>
			</div>
			<div class="w-80 h-80 absolute left-0 right-0 m-auto -top-2">
				<ClientOnly>
					<VChart
						:option="pieOptions"
						class="w-full h-80"
					/>
				</ClientOnly>
			</div>
		</div>

		<div class="mb-10">
			<h3 class="text-base font-bold">
				{{ $t('currencyCategories') }}
			</h3>
		</div>
		<div class="mb-28">
			<CurrencyCategorySlider />
		</div>

		<div class="flex justify-between">
			<MarketState />
			<MarketState />
		</div>
	</UContainer>
</template>

<script setup lang="ts">
import CurrencyCategorySlider from '~/components/pages/Site/Market/Statistics/CurrencyCategorySlider.vue';
import MarketState from '~/components/pages/Site/Market/Statistics/MarketState.vue';
import { useNumber } from '~/composables/useNumber';

const redBarOptions = ref({
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		top: '10%',
		containLabel: true,
	},
	xAxis: {
		type: 'value',
		show: false,
		inverse: false,
	},
	yAxis: {
		type: 'category',
		data: ['10٪<', '8٪ تا 10٪', '6٪ تا 8٪', '4٪ تا 6٪', '2٪ تا 4٪', '2٪>'],
		inverse: true,
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			color: '#FFFFFF',
			fontFamily: 'dana',
			fontSize: 14,
			fontWeight: 'bold',
			padding: [0, 0, 0, 10],
			formatter: (value: string) => useNumber(value),
		},
	},
	series: [
		{
			name: 'بازارهای ریزشی',
			type: 'bar',
			data: [63.50, 83.64, 103.76, 123.89, 143.92, 163.94],
			itemStyle: {
				color: '#FF4D4F',
				borderRadius: [4, 4, 4, 4],
			},
			barWidth: 24,
			label: {
				show: true,
				position: 'right',
				color: '#FF4D4F',
			},
		},
	],
});

const greenBarOptions = ref({
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		top: '10%',
		containLabel: true,
	},
	xAxis: {
		type: 'value',
		show: false,
		inverse: true,
	},
	yAxis: {
		position: 'right',
		type: 'category',
		data: ['10٪<', '8٪ تا 10٪', '6٪ تا 8٪', '4٪ تا 6٪', '2٪ تا 4٪', '2٪>'],
		inverse: true,
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			color: '#FFFFFF',
			fontFamily: 'dana',
			position: 'right',
			fontSize: 14,
			fontWeight: 'bold',
			padding: [0, 0, 0, 10],
			formatter: (value: string) => useNumber(value),
		},
	},
	series: [
		{
			name: 'بازارهای افزایشی',
			type: 'bar',
			data: [63.50, 83.64, 103.76, 123.89, 143.92, 163.94],
			itemStyle: {
				color: '#28A745',
				borderRadius: [4, 4, 4, 4],
			},
			barWidth: 24,
			label: {
				show: true,
				position: 'left',
				formatter: '{c}',
				color: '#28A745',
			},
		},
	],
});

const pieOptions = ref({
	title: {
		text: 'رشد و کاهش بازارها',
		left: 'center',
		top: '47%',
		textStyle: {
			color: '#FFFFFF',
			fontSize: 14,
			fontFamily: 'dana',
			fontWeight: 'bold',
		},
	},
	tooltip: {
		trigger: 'item',
		backgroundColor: '#333',
		borderColor: '#FFF',
		borderWidth: 1,
		padding: 10,
		textStyle: {
			color: '#FFFFFF',
			fontSize: 12,
			fontWeight: 'bold',
			fontFamily: 'dana',
		},
		formatter: '{b}: {c}',
	},
	legend: {
		show: false,
	},
	series: [
		{
			name: 'رشد و کاهش بازارها',
			type: 'pie',
			radius: ['40%', '65%'],
			avoidLabelOverlap: false,
			label: {
				show: true,
				position: 'inside',
				fontFamily: 'dana',
				formatter: '{c}',
				color: '#FFFFFF',
				fontSize: 12,
				fontWeight: 'bold',
			},
			labelLine: {
				show: false,
			},
			data: [
				{ value: 6666, name: 'رشد', itemStyle: { color: '#28A745' } },
				{ value: 5555, name: 'کاهش', itemStyle: { color: '#FF4D4F' } },
				{ value: 1306, name: 'دیگر', itemStyle: { color: '#666666' } },
			],
		},
	],
});
</script>
