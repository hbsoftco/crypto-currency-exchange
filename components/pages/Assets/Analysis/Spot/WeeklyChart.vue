<template>
	<div>
		<VChart
			dir="ltr"
			:option="chartOptions"
			class="w-32 h-12"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { LatestWeek } from '~/types/definitions/asset.types';

interface PropsDefinition {
	data: LatestWeek[];
}
const props = defineProps<PropsDefinition>();

const minValue = computed(() => Math.min(...props.data.map((i) => i.p)));
const maxValue = computed(() => Math.max(...props.data.map((i) => i.p)));
const avgValue = computed(() => {
	const sum = props.data.reduce((acc, item) => acc + item.p, 0);
	return sum / props.data.length;
});

const closestToAvg = computed(() => {
	return props.data.reduce((prev, curr) =>
		Math.abs(curr.p - avgValue.value) < Math.abs(prev.p - avgValue.value) ? curr : prev,
	).p;
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
		data: props.data.map((item) => item.d),
		show: false,
	},
	yAxis: {
		type: 'value',
		show: false,
	},
	series: [
		{
			data: props.data.map((item) => ({
				value: item.p,
				itemStyle: {
					color:
						item.p === maxValue.value
							? 'green'
							: item.p === minValue.value
								? 'red'
								: item.p === closestToAvg.value
									? 'blue'
									: 'transparent',
				},
			})),
			type: 'line',
			smooth: false,
			lineStyle: {
				color: 'gray',
				width: 2,
			},
			symbol: 'circle',
			symbolSize: 8,
		},
	],
}));
</script>
