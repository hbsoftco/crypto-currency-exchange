<template>
	<div class="w-full pt-16">
		<ClientOnly>
			<VChart
				:option="chartOptions"
				class="w-full h-[25rem]"
			/>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
const { depthData } = useSpotStore();

const chartOptions = ref({});

const data = {
	asks: depthData.value?.depthOfAsk,
	bids: depthData.value?.depthOfBid,
};

if (data.bids && data.asks) {
	const obj2arr = (arr: string[][], key: number) => arr.map((item) => parseFloat(item[key]));
	const centerPrice = parseFloat(((parseFloat(data.asks[0][0]) + parseFloat(data.bids[0][0])) / 2).toFixed(2));
	data.bids.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));

	const categoryBids = obj2arr(data.bids, 0);
	const categoryAsks = obj2arr(data.asks, 0);

	const category = [...categoryBids, centerPrice, ...categoryAsks];

	const bids = obj2arr(data.bids, 1);

	bids.push(NaN);

	const ask = Array(bids.length - 1).fill('');

	ask.push(NaN);

	const asks = [...ask, ...obj2arr(data.asks, 1)];

	chartOptions.value = {
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
			data: category,
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
				data: bids,
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
								color: 'rgba(18, 41, 34, 1)',
							},
							{
								offset: 1,
								color: 'rgba(18, 41, 34, 1)',
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
				data: asks,
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
								color: 'rgba(51, 24, 29, 1)',
							},
							{
								offset: 1,
								color: 'rgba(51, 24, 29, 1)',
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
	};
}
else {
	console.warn('داده‌های bids یا asks موجود نیستند.');
}
</script>
