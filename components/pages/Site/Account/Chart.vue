<template>
	<div class="relative w-full h-48 mx-8">
		<ClientOnly>
			<VChart
				:option="halfPieOptions"
				class="w-full h-48"
			/>
		</ClientOnly>
		<div class="absolute top-24 left-16">
			<div
				class="flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-full px-3 py-1"
			>
				<img
					src="/images/delete/fish.png"
					alt="Fish Icon"
					class="w-5 h-5"
				>
				<span class="text-white text-sm mr-2">سطح ماهی</span>
			</div>
		</div>
		<div class="absolute top-32 left-7">
			<div>
				<span class="text-xs font-bold">{{ useNumber('100') }}</span>
			</div>
			<div>
				<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('dollar') }}</span>
			</div>
		</div>
		<div class="absolute top-32 right-7">
			<div>
				<span class="text-xs font-bold">{{ useNumber('1000') }}</span>
			</div>
			<div>
				<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('dollar') }}</span>
			</div>
		</div>
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
			color: '#FFC107', // رنگ زرد برای متن
			fontSize: 12,
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
					itemStyle: {
						color: '#FFD700',
						borderColor: '#FFD700',
						borderWidth: 2,
					},
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
