<template>
	<div class="w-full pt-16">
		<ClientOnly>
			<VChart
				:option="chartOptions"
				class="w-full h-96"
			/>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = {
	asks: [
		[3580.38, 200.0],
		[3586.17, 178],
		[3587.96, 176.2],
		[3589.75, 165.6],
		[3591.54, 152.62],
		[3593.33, 150.83],
		[3595.12, 140.61],
		[3596.92, 131.58],
		[3598.71, 121.66],
		[3600.5, 11.14],
	],
	bids: [
		[3580.19, 11.91],
		[3579.0, 56.2],
		[3577.21, 114.9],
		[3575.42, 115.95],
		[3573.63, 116.4],
		[3571.84, 117.95],
		[3570.05, 118.89],
		[3568.25, 119.58],
		[3566.46, 120.18],
		[3564.67, 124.22],
	],
};

const obj2arr = (arr, key) => arr.map((item) => item[key]);
const centerPrice = parseFloat(((data.asks[0][0] + data.bids[0][0]) / 2).toFixed(2));

data.bids.sort((a, b) => a[0] - b[0]);
const categoryBids = obj2arr(data.bids, 0);
const categoryAsks = obj2arr(data.asks, 0);
const category = [...categoryBids, centerPrice, ...categoryAsks];

const bids = obj2arr(data.bids, 1);
bids.push(0);
data.asks.reverse();
const ask = Array(bids.length - 1).fill('');
ask.push(0);
const asks = [...ask, ...obj2arr(data.asks, 1)];

const chartOptions = ref({
	tooltip: {
		trigger: 'axis',
		formatter: function (params: any) {
			return `
          قیمت: ${params[0].axisValue}<br/>
          <span style="color: green">خرید: ${params[0].data}</span><br/>
          <span style="color: red">فروش: ${params[1].data}</span>
        `;
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
		data: category, // قیمت‌ها
	},
	yAxis: {
		type: 'value',
		name: 'مقدار',
		splitLine: {
			show: false,
		},
	},
	series: [
		{
			name: 'خرید',
			type: 'line',
			step: 'end', // نمودار پله‌ای
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
							offset: 0,
							color: 'rgba(0, 255, 0, 0.6)', // رنگ سبز با شفافیت
						},
						{
							offset: 1,
							color: 'rgba(0, 255, 0, 0)', // شفافیت کامل در پایین
						},
					],
				},
			},
			smooth: true,
			symbol: 'circle',
			symbolSize: 8,
			itemStyle: {
				color: '#00ff00',
			},
			lineStyle: { color: '#00ff00' }, // خط سبز برای خرید
		},
		{
			name: 'فروش',
			type: 'line',
			step: 'start', // نمودار پله‌ای
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
							offset: 0,
							color: 'rgba(255, 0, 0, 0.6)', // رنگ قرمز با شفافیت
						},
						{
							offset: 1,
							color: 'rgba(255, 0, 0, 0)', // شفافیت کامل در پایین
						},
					],
				},
			},
			smooth: true,
			symbol: 'circle',
			symbolSize: 8,
			itemStyle: {
				color: '#ff0000',
			},
			lineStyle: { color: '#ff0000' }, // خط قرمز برای فروش
		},
	],
});
</script>
