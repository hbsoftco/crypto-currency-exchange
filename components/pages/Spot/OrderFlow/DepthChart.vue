<template>
	<div class="min-h-[27rem]">
		<div
			v-if="spotStore.snapshotLoading && chartDataLoading"
			class="w-full pt-16"
		>
			{{ $t("isLoading") }}...
		</div>
		<div
			v-if="!spotStore.snapshotLoading && !chartDataLoading"
			class="w-full pt-16"
		>
			<VChart
				ref="chartRef"
				autoresize
				:option="chartOptions"
				class="w-full h-[25rem]"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ECharts } from 'echarts/core';

const spotStore = useSpotStore();

const chartDataLoading = ref<boolean>(true);

const state = reactive({
	category: [] as number[],
	bids: [] as number[],
	asks: [] as number[],
});

const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	},
});

const chartRef = ref<ECharts>();

const chartOptions = ref({
	animation: false,
	autoresize: true,
	tooltip: {
		trigger: 'axis',
		formatter: function (params: any) {
			let result = '';
			const dominantColor = params[0].color;

			params.forEach((item: any) => {
				if (dominantColor === '#459F4B' && item.color === '#459F4B') {
					result += `<div class="flex items-center space-x-2">
									<span class="font-bold text-green-700 mx-2">${item.seriesName}: ${item.value}</span>
									<span class="inline-block rounded-full w-2.5 h-2.5" style="background-color:${item.color};"></span>
								</div>`;
				}
				else if (dominantColor === '#F14235' && item.color === '#F14235') {
					result += `<div class="flex items-center space-x-2">
										<span class="font-bold text-red-700 mx-2">${item.seriesName}: ${item.value}</span>
										<span class="inline-block rounded-full w-2.5 h-2.5" style="background-color:${item.color};"></span>
								</div>`;
				}
			});

			return result;
		},
	},
	grid: {
		left: '10%',
		right: '10%',
		top: '10%',
		bottom: '10%',
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: state.category,
	},
	yAxis: {
		type: 'value',
		name: '',
		splitLine: {
			show: false,
		},
	},
	series: [
		{
			name: 'BUY',
			type: 'line',
			step: 'end',
			data: state.bids,
			areaStyle: {
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 1,
							color: isDark.value
								? 'rgba(18, 41, 34, 1)'
								: 'rgba(200, 255, 200, 1)',
						},
						{
							offset: 1,
							color: isDark.value
								? 'rgba(18, 41, 34, 1)'
								: 'rgba(200, 255, 200, 1)',
						},
					],
				},
			},
			smooth: true,
			symbol: false,
			symbolSize: 1,
			itemStyle: {
				color: '#459F4B',
			},
			lineStyle: { color: '#459F4B' },
		},
		{
			name: 'SELL',
			type: 'line',
			step: 'start',
			data: state.asks,
			areaStyle: {
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 1,
							color: isDark.value
								? 'rgba(51, 24, 29, 1)'
								: 'rgba(255, 200, 200, 1)',
						},
						{
							offset: 1,
							color: isDark.value
								? 'rgba(51, 24, 29, 1)'
								: 'rgba(255, 200, 200, 1)',
						},
					],
				},
			},
			smooth: true,
			symbol: false,
			symbolSize: 1,
			itemStyle: {
				color: '#F14235',
			},
			lineStyle: { color: '#F14235' },
		},
	],
	// backgroundColor: '#fff',
});

const generateChartData = () => {
	if (spotStore.depth?.depthOfAsk && spotStore.depth?.depthOfBid) {
		chartDataLoading.value = true;

		const obj2arr = (arr: string[][], key: number) =>
			arr.map((item) => parseFloat(item[key]));
		const centerPrice = parseFloat(
			((parseFloat(spotStore.depth?.depthOfAsk[0][0]) + parseFloat(spotStore.depth?.depthOfBid[0][0])) / 2).toFixed(
				2,
			),
		);
		spotStore.depth?.depthOfBid.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));

		state.category = [
			...obj2arr(spotStore.depth?.depthOfBid, 0),
			centerPrice,
			...obj2arr(spotStore.depth?.depthOfAsk, 0),
		];
		state.bids = [...obj2arr(spotStore.depth?.depthOfBid, 1), NaN];
		const ask = Array(state.bids.length - 1).fill('');
		state.asks = [NaN, ...ask, ...obj2arr(spotStore.depth?.depthOfAsk, 1)];

		chartDataLoading.value = false;
	}
};

watch(
	() => spotStore.depth,
	async () => {
		state.category = [];
		state.bids = [];
		state.asks = [];

		await generateChartData();

		if (chartRef.value) {
			chartRef.value.setOption({
				series: [
					{
						name: 'BUY',
						data: state.bids,
					},
					{
						name: 'SELL',
						data: state.asks,
					},
				],
				xAxis: {
					data: state.category,
				},
			});

			chartRef.value.resize();
		}
	},
	{ deep: true },
);

onMounted(async () => {
	await nextTick();
	await generateChartData();
});
</script>
