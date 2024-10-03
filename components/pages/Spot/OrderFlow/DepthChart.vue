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

console.log(depthData.value?.depthOfAsk);

const data = {
	asks: depthData.value?.depthOfAsk,
	bids: depthData.value?.depthOfBid,
};

const category = [];

// const obj2arr = (arr: number[][], key: number) => arr.map((item) => item[key]);
// const centerPrice = parseFloat(((data.asks[0][0] + data.bids[0][0]) / 2).toFixed(2));

// data.bids.sort((a, b) => a[0] - b[0]);
// const categoryBids = obj2arr(data.bids, 0);
// const categoryAsks = obj2arr(data.asks, 0);
// const category = [...categoryBids, centerPrice, ...categoryAsks];

// const bids = obj2arr(data.bids, 1);
// bids.push(0);
// data.asks.reverse();
// const ask = Array(bids.length - 1).fill('');
// ask.push(0);
// const asks = [...ask, ...obj2arr(data.asks, 1)];

const bids = data.bids;
const asks = data.asks;

const chartOptions = ref({
	tooltip: {
		trigger: 'axis',
		formatter: function (params: any) {
			if (params && params.length >= 2) {
				const buyData = params[0].data !== undefined ? params[0].data : 'ناموجود';
				const sellData = params[1].data !== undefined ? params[1].data : 'ناموجود';

				return `
      قیمت: ${params[0].axisValue}<br/>
      <span style="color: green">خرید: ${buyData}</span><br/>
      <span style="color: red">فروش: ${sellData}</span>
    `;
			}
			return 'اطلاعات موجود نیست';
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
});
</script>
