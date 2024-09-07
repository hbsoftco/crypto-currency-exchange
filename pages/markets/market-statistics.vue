<template>
	<div class="flex justify-between w-full h-full">
		<!-- نمودار ریزشی (قرمز) -->
		<div class="chart-wrapper">
			<ClientOnly>
				<VChart
					:option="redBarOptions"
					class="chart"
				/>
			</ClientOnly>
		</div>

		<!-- نمودار افزایشی (سبز) -->
		<div class="chart-wrapper">
			<ClientOnly>
				<VChart
					:option="greenBarOptions"
					class="chart"
				/>
			</ClientOnly>
		</div>
		<!-- نمودار دایره‌ای -->
		<div class="pie-chart-container mt-4">
			<ClientOnly>
				<VChart
					:option="pieChartOptions"
					class="pie-chart"
				/>
			</ClientOnly>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const redBarOptions = ref({
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true,
	},
	xAxis: {
		type: 'value',
		show: false,
		inverse: false,
	},
	yAxis: {
		type: 'category',
		data: ['>10%', '8% تا 10%', '6% تا 8%', '4% تا 6%', '2% تا 4%', '<2%'],
		inverse: true,
	},
	series: [
		{
			name: 'بازارهای ریزشی',
			type: 'bar',
			data: [163.94, 143.92, 123.89, 103.76, 83.64, 63.50],
			itemStyle: {
				color: '#FF4D4F',
			},
			barWidth: '40%',
			label: {
				show: true,
				position: 'insideRight',
				formatter: '{c}',
			},
		},
	],
});

const greenBarOptions = ref({
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true,
	},
	xAxis: {
		type: 'value',
		show: false,
		inverse: true,
	},
	yAxis: {
		type: 'category',
		data: ['>10%', '8% تا 10%', '6% تا 8%', '4% تا 6%', '2% تا 4%', '<2%'],
		inverse: true,
	},
	series: [
		{
			name: 'بازارهای افزایشی',
			type: 'bar',
			data: [120.50, 110.75, 100.45, 90.30, 80.20, 70.10],
			itemStyle: {
				color: '#4CAF50',
			},
			barWidth: '40%',
			label: {
				show: true,
				position: 'insideRight',
				formatter: '{c}',
			},
		},
	],
});

const pieChartOptions = ref({
	series: [
		{
			name: 'رشد و کاهش بازار',
			type: 'pie',
			radius: ['50%', '70%'],
			avoidLabelOverlap: false,
			label: {
				show: true,
				position: 'center',
				formatter: '{b}\n{c}',
				fontSize: 16,
				color: '#fff',
			},
			data: [
				{ value: 6666, name: 'کاهش', itemStyle: { color: '#FF4D4F' } },
				{ value: 5555, name: 'رشد', itemStyle: { color: '#4CAF50' } },
				{ value: 16, name: 'بدون تغییر', itemStyle: { color: '#888' } },
			],
		},
	],
});
</script>

<style scoped>
.flex {
	height: 100%;
}

.chart-wrapper {
	width: 50%;
	height: 100%;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.chart {
	width: 100%;
	height: 400px;
}

.pie-chart-container {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.pie-chart {
	width: 400px;
	height: 400px;
}
</style>
