<template>
	<div class="bg-hover-light dark:bg-hover-dark rounded-lg shadow-lg p-4 mb-10 w-[34.75rem]">
		<div class="h-60">
			<ClientOnly>
				<VChart
					:option="doughnutOptions"
					class="w-full h-96"
				/>
			</ClientOnly>
		</div>
		<!-- List of Items -->
		<table class="min-w-full p-6 text-right">
			<thead>
				<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark  text-subtle-text-light dark:text-subtle-text-dark">
					<th />
					<th class="pb-2 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
						{{ $t('tradingPair') }}
					</th>
					<th class="pb-2 text-sm font-normal">
						{{ $t('price') }}
					</th>
					<th class="pb-2 text-sm font-normal">
						{{ $t('change') }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(currency, index) in item.info"
					:key="index"
					:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
					class="pb-1"
				>
					<td>{{ useNumber(index+1) }}</td>
					<td class="text-xs font-normal py-2 ">
						<div class="flex justify-start items-center">
							<NuxtImg
								:src="`https://api-bitland.site/media/currency/${currency.currencyDetails?.cSymbol}.png`"
								:alt="currency.currencyDetails?.cName"
								class="w-5 h-5 rounded-full"
								format="webp"
								densities="x1"
							/>
							<span class="text-xs font-normal mx-1 text-subtle-text-light dark:text-subtle-text-dark">{{ currency.currencyDetails?.cSymbol }} </span>/
							<span class="text-xs font-normal mx-1 text-subtle-text-light dark:text-subtle-text-dark">USDT</span>
						</div>
					</td>
					<td class="text-sm font-normal py-2">
						<span>{{ useNumber(currency.indexPrice) }}</span>
					</td>
					<td class="text-sm font-normal py-2">
						<UiChangePrice
							classes="text-sm font-normal"
							:show-percent="true"
							pl="pl-2"
							:change="parseFloat(String(currency.priceChangePercIn24H))"
							:icon="false"
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import type { MarketCategoryInfo } from '~/types/response/market.types';
import { useNumber } from '~/composables/useNumber';

interface PropsDefinition {
	item: MarketCategoryInfo;
}

const props = defineProps<PropsDefinition>();
// const colors = ['#78D7F6', '#6AC7EA', '#5EBAE0', '#51ABD5', '#459FCC', '#3992C2', '#2B83B7', '#2076AD', '#1267A2', '#005393'];
const colors = ['#F7931A', '#627EEA', '#F0B90B', '#3EC1D3', '#2775CA', '#23292F', '#C2A633', '#2C97DE', '#FF0600', '#0033AD'];

const pieChartData = computed(() => {
	return props.item.info.map((currency, index) => ({
		value: parseFloat(currency.valueOfTradesIn24H),
		name: currency?.currencyDetails?.cSymbol ?? '',
		itemStyle: {
			color: colors[index % colors.length],
		},
	}));
});

const doughnutOptions = ref({
	title: {
		text: props.item.category,
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
			data: pieChartData.value,
		},
	],
});
</script>
