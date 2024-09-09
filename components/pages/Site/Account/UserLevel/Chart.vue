<template>
	<div class="relative w-72 h-72  rounded-full">
		<ClientOnly>
			<VChart
				:option="halfPieOptions"
				class="w-full h-96"
			/>
		</ClientOnly>
		<!-- <ClientOnly>
			<VChart
				:option="chartOptions"
				style="height: 100%; width: 100%;"
			/>
			<div class="absolute inset-0 flex flex-col items-center justify-center">
				<span class="text-yellow-400 text-lg"> {{ useNumber('876,321') }}{{ $t('dollar') }}</span>
				<div class="flex items-center justify-center mt-2 bg-gray-800 rounded-full px-3 py-1">
					<span class="text-white text-lg">سطح ماهی</span>
					<NuxtImg
						src="/images/delete/fish.png"
						alt="Fish Icon"
						class="w-6 h-6 ml-2"
					/>
				</div>
			</div>
		</ClientOnly> -->
	</div>
</template>

<script setup>
// import { useNumber } from '~/composables/useNumber';

const halfPieOptions = ref({
	title: {
		text: '871,231 دلار',
		left: 'center',
		top: '40%',
		textStyle: {
			color: '#FFD700', // رنگ زرد برای متن
			fontSize: 18,
			fontWeight: 'bold',
			fontFamily: 'dana',
		},
	},
	series: [
		{
			name: 'نمودار نیم‌دایره',
			type: 'pie',
			startAngle: 180,
			radius: ['0%', '75%'],
			center: ['50%', '50%'],
			avoidLabelOverlap: false,
			label: {
				show: false,
			},
			labelLine: {
				show: false,
			},
			itemStyle: {
				borderRadius: 0,
			},
			data: [
				{
					value: 75,
					itemStyle: { color: '#333', borderColor: '#FFD700', borderWidth: 2 },
					emphasis: {
						scale: true,
						scaleSize: 0,
						itemStyle: {
							shadowBlur: 0,
							shadowOffsetX: 0,
						},
					},
				},
				{
					value: 25,
					name: '100 دلار',
					itemStyle: { color: '#FFD700', borderColor: '#FFD700', borderWidth: 2 },
					emphasis: {
						scale: true,
						scaleSize: 10,
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						},
					},
				},

			],
		},
	],
	graphic: {
		elements: [
			{
				type: 'text',
				left: 'center',
				top: '50%',
				style: {
					text: 'سطح ماهی',
					fill: '#FFFFFF',
					font: 'bold 16px dana',
				},
			},
		],
	},
});
</script>
