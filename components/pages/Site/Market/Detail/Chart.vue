<template>
	<div class="w-full h-80">
		<ClientOnly>
			<VChart
				:option="chartOptions"
				class="w-full h-full"
			/>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
const data = [
	2.74, 2.76, 2.78, 2.77, 2.75, 2.78, 49.8, 48.82, 2.78, 2.83, 2.81, 2.84, 2.83,
];

const chartOptions = computed(() => ({
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		top: '10%',
		containLabel: true,
	},
	xAxis: {
		type: 'category',
		data: [
			useNumber('16:00'),
			'18:00',
			'20:00',
			'22:00',
			'00:00',
			'02:00',
			'04:00',
			'06:00',
			'08:00',
			'10:00',
			'12:00',
		],
		boundaryGap: false,
		axisLine: {
			lineStyle: {
				color: '#666',
			},
		},
		axisLabel: {
			rich: {
				value: {
					fontFamily: 'dana',
					fontSize: 16,
					color: '#aaa',
					fontWeight: 'bold',
				},
			},
			// formatter: (value: any) => `<span class="font-dana">${value}</span>`,
			// color: '#aaa',
			// rich: {
			// 	fontStyle: {
			// 		fontFamily: 'Dana',
			// 	},
			// },
		},
	},
	yAxis: {
		position: 'right',
		type: 'value',
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		splitLine: {
			lineStyle: {
				color: '#333',
				type: 'dashed',
			},
		},
	},
	series: [
		{
			data: data,
			type: 'line',
			step: 'end',
			lineStyle: {
				color: '#FFA500',
				width: 2,
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
							color: 'rgba(255, 165, 0, 0.6)',
						},
						{
							offset: 1,
							color: 'rgba(255, 165, 0, 0)',
						},
					],
				},
			},
			itemStyle: {
				opacity: 0,
			},
		},
	],
}));
</script>
