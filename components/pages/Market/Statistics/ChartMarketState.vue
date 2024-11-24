<template>
	<div class="bg-hover-light dark:bg-hover-dark rounded-lg shadow-lg p-4 mb-10 w-[34.75rem]">
		<div class="h-60">
			<VChart
				:option="doughnutOptions"
				class="w-full h-96"
			/>
		</div>
		<!-- List of Items -->
		<table class="min-w-full p-6 text-right relative z-1">
			<thead>
				<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark  text-subtle-text-light dark:text-subtle-text-dark">
					<th />
					<th class="pb-2 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
						{{ $t('tradingPair') }}
					</th>
					<th class="pb-2 text-sm text-left pl-2 font-normal">
						{{ $t('price') }}
					</th>
					<th class="pb-2 text-sm text-left pl-4 font-normal">
						{{ $t('change') }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(market, index) in item.info"
					:key="index"
					:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark  hover:bg-primary-gray-light hover:dark:bg-primary-gray-dark rounded duration-200 transition-all ' : 'bg-hover2-light dark:bg-hover2-dark  hover:bg-primary-gray-light hover:dark:bg-primary-gray-dark rounded duration-200 transition-all']"
					class="pb-1"
				>
					<td class="pr-1">
						{{ useNumber(index+1) }}
					</td>
					<td class="text-xs font-normal py-2 ">
						<ULink
							class="flex justify-start items-center"
							:to="`/spot/${splitMarket(market.mSymbol)}`"
						>
							<img
								v-if="market.currency?.cSymbol"
								:src="`https://api-bitland.site/media/currency/${market.currency?.cSymbol}.png`"
								:alt="market.currency?.cName"
								class="w-5 h-5 rounded-full ml-1"
								format="webp"
								densities="x1"
							>
							<span class="text-sm font-normal">{{ market.quote?.cSymbol }} </span> /
							<span class="text-sm font-normal">{{ market.currency?.cSymbol }}</span>
						</ULink>
					</td>
					<td class="text-sm font-normal text-left py-2">
						<span>{{ useNumber(priceFormat(String(market.indexPrice))) }}</span>
					</td>
					<td class="text-sm text-left font-normal py-2">
						<UiChangePrice
							classes="text-sm font-normal"
							:show-percent="true"
							pl="pl-2"
							:change="parseFloat(String(market.priceChangePercIn24H))"
							:icon="false"
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { splitMarket } from '~/utils/split-market';
import { priceFormat } from '~/utils/price-format';
import { useNumber } from '~/composables/useNumber';
import type { MarketL47 } from '~/types/definitions/market.types';

interface PropsDefinition {
	item: MarketL47;
}

const props = defineProps<PropsDefinition>();
const colors = [
	'#F7931A',
	'#627EEA',
	'#F0B90B',
	'#3EC1D3',
	'#2775CA',
	'#23292F',
	'#C2A633',
	'#2C97DE',
	'#FF0600',
	'#0033AD',
];

const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	},
});

const pieChartData = computed(() => {
	return props.item.info.map((market, index) => ({
		value: parseFloat(market.valueOfTradesIn24H),
		name: market?.currency?.cSymbol ?? '',
		market: market,
		itemStyle: {
			color: colors[index % colors.length],
		},
	}));
});

const category = useT(props.item.category);

const doughnutOptions = computed(() => ({
	title: {
		text: category,
		left: 'center',
		top: '43%',
		textStyle: {
			color: isDark.value ? '#FFFFFF' : '#000000',
			fontSize: 16,
			fontWeight: 'bold',
			fontFamily: 'dana',
		},
	},
	tooltip: {
		trigger: 'item',
		formatter: function (params: any) {
			const isPositive = params.data.market.priceChangePercIn24H > 0;
			const className = isPositive ? 'text-accent-green' : 'text-accent-red';
			return `
			<div class="text-black dark:text-black p-1">
				<div class="flex justify-between mb-1">
					<div class="text-black dark:text-black font-dana">${useT('coin')}</div>
					<div class="text-black dark:text-black font-dana mr-6">
						${params.data.name}
					</div>
				</div>
				<div class="flex justify-between mb-1">
					<div class="text-black dark:text-black font-dana">${useT('price')}</div>
					<div class="text-black dark:text-black flex">
						<span>USDT</span>
						<span class="mr-1 font-dana">${useNumber(priceFormat(String(params.data.market.indexPrice)))}</span>
					</div>
				</div>
				<div class="flex justify-between mb-1">
					<div class="text-black dark:text-black font-dana">${useT('changeIn24h')}</div>
					<div class="text-black dark:text-black font-dana mr-6" dir="ltr">
						<span class="${className}">${isPositive ? '+' : ''}${useNumber(params.data.market.priceChangePercIn24H)}%</span>
					</div>
				</div>
				<div class="flex justify-between mb-1">
					<div class="text-black dark:text-black font-dana">${useT('volumeIn24h')}</div>
					<div class="text-black dark:text-black font-dana mr-6" dir="ltr">
						<span>${useNumber(formatBigNumber(params.data.market.valueOfTradesIn24H, 3))}</span>
						<span>USDT</span>
					</div>
				</div>
			</div>
		`;
		},
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
				color: isDark.value ? '#FFFFFF' : '#000000',
				fontSize: 12,
			},
			labelLine: {
				show: true,
				lineStyle: {
					color: isDark.value ? '#FFFFFF' : '#000000',
				},
			},
			itemStyle: {
				borderWidth: 2,
				borderColor: isDark.value ? '#181818' : '#f8f8f8',
				borderRadius: 5,
			},
			data: pieChartData.value,
		},
	],
}));
</script>
