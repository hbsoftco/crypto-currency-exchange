<template>
	<div class="bg-hover-light dark:bg-hover-dark rounded-lg shadow-lg p-4 mb-4 w-[34.75rem]">
		<div class="mb-2">
			<ClientOnly>
				<VChart
					:option="doughnutOptions"
					class="w-full h-96"
				/>
			</ClientOnly>
		</div>
		<!-- List of Items -->
		<ul class="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 h-44">
			<li class="flex justify-between items-center py-1">
				<span class="text-green-500 text-sm font-normal">+1.24%</span>
				<div class="flex justify-start">
					<span class="text-sm font-normal mx-2">BTC USDT</span>
					<img
						src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
						alt="BTC"
						class="w-5 h-5"
					>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
// import { useNumber } from '~/composables/useNumber';
const doughnutOptions = ref({
	title: {
		text: 'داغ‌ترین ها',
		left: 'center',
		top: '43%',
		textStyle: {
			color: '#FFFFFF',
			fontSize: 16,
			fontWeight: 'bold',
			fontFamily: 'dana',
		},
	},
	tooltip: {
		trigger: 'item',
	},
	series: [
		{
			type: 'pie',
			startAngle: 180,
			endAngle: 0,
			radius: ['40%', '70%'],
			avoidLabelOverlap: false,
			label: {
				show: true,
				color: '#FFFFFF',
				fontSize: 12,
			},
			labelLine: {
				show: true,
			},
			itemStyle: {
				borderWidth: 2,
				borderColor: '#000',
				borderRadius: 5,
			},
			data: [
				{ value: 6.34, name: 'ETH', itemStyle: { color: '#78D7F6' } },
				{ value: 6.34, name: 'BTC', itemStyle: { color: '#6AC7EA' } },
				{ value: 6.34, name: 'ETH', itemStyle: { color: '#5EBAE0' } },
				{ value: 6.34, name: 'BTC', itemStyle: { color: '#51ABD5' } },
				{ value: 6.34, name: 'ETH', itemStyle: { color: '#459FCC' } },
				{ value: 6.34, name: 'BTC', itemStyle: { color: '#3992C2' } },
				{ value: 6.34, name: 'ETH', itemStyle: { color: '#2B83B7' } },
				{ value: 6.34, name: 'BTC', itemStyle: { color: '#2076AD' } },
				{ value: 6.34, name: 'BTC', itemStyle: { color: '#1267A2' } },
				{ value: 6.34, name: 'BTC', itemStyle: { color: '#005393' } },
			],
		},
	],
});
</script>
