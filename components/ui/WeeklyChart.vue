<template>
	<VChart
		:option="chartOptions"
		style="height: 3rem; width: 100%;"
	/>
</template>

<script setup lang="ts">
interface Props {
	color: 'red' | 'green';
	data: number[];
}

const props = defineProps<Props>();

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
			data: props.data,
			type: 'line',
			smooth: true,
			lineStyle: {
				color: props.color === 'green' ? '#4CAF50' : '#FF4D4F',
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
							color: props.color === 'green' ? 'rgba(76, 175, 80, 0.6)' : 'rgba(255, 77, 79, 0.6)',
						},
						{
							offset: 1,
							color: props.color === 'green' ? 'rgba(76, 175, 80, 0)' : 'rgba(255, 77, 79, 0)',
						},
					],
					global: false,
				},
			},
		},
	],
}));
</script>
