<template>
	<div>
		<div class="flex justify-between mb-11">
			<p class="text-sm font-bold text-subtle-text-light dark:text-subtle-text-dark">
				{{ $t('chartAverage') }}
			</p>
			<USelectMenu
				v-model="selectedMarket"
				:options="market"
				:ui="{
					background: '',
					color: {
						white: {
							outline: ' bg-hover-light dark:bg-hover-dark',
						},
					},
				}"
			/>
		</div>
		<div>
			<VChart
				:option="neutralPieOptions"
				class="w-full h-[45rem]"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
const market = ['بازار', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];

const selectedMarket = ref(market[0]);

// const colorMode = useColorMode();
// const isDark = computed({
// 	get() {
// 		return colorMode.value === 'dark';
// 	},
// 	set() {
// 		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
// 	},
// });

const data = [
	[
		[28604, 77, 17096869, 'Australia', 1990],
		[1516, 68, 1154605773, 'China', 1990],
		[29476, 77.1, 36922243299, 'France', 1990],
		[31476, 75.4, 78958237, 'Germany', 1990],
		[28666, 78.1, 2511334830, 'Iceland', 1990],
	],
	[
		[44056, 81.8, 23968973, 'Australia', 2015],
		[21291, 78.5, 11389333562, 'Cuba', 2015],
		[38923, 80.8, 5591203457, 'Finland', 2015],
	],
];

const neutralPieOptions = computed(() => ({
	title: {
		text: '',
		left: '5%',
		top: '3%',
	},
	legend: {
		right: '3%',
		top: '3%',
		data: ['1990', '2015'],
	},
	grid: {
		left: '5%',
		right: '5%',
		top: '10%',
	},
	xAxis: {
		splitLine: {
			show: false,
		},
	},
	yAxis: {
		splitLine: {
			show: true,
			lineStyle: {
				color: '#3b3b3b',
				type: 'dashed',
			},
		},
		scale: true,
	},
	series: [
		{
			name: '1990',
			data: data[0],
			type: 'scatter',
			symbolSize: function (data: number[]) {
				return Math.sqrt(data[2]) / 5e2;
			},
			label: {
				show: true,
				formatter: function (param: any) {
					return param.data[3];
				},
				position: 'inside',
				color: '#fff',
			},
			itemStyle: {
				shadowBlur: 0,
				shadowColor: '',
				shadowOffsetY: 0,
				opacity: 0.6,
				// color:
			},
		},
		{
			name: '2015',
			data: data[1],
			type: 'scatter',
			symbolSize: function (data: number[]) {
				return Math.sqrt(data[2]) / 5e2;
			},
			label: {
				show: true,
				formatter: function (param: any) {
					return param.data[3];
				},
				position: 'inside',
				color: '#fff',
			},
			itemStyle: {
				shadowBlur: 10,
				shadowColor: 'rgba(25, 100, 150, 0.5)',
				shadowOffsetY: 5,
				opacity: 0.6,
				// color:
			},
		},
	],
}));
</script>
