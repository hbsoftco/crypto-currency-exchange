<template>
	<div>
		<div>
			<div
				v-if="loading"
				class="h-80 w-full flex justify-center items-center"
			>
				<span>{{ $t('isLoading') }} ...</span>
			</div>
			<div
				v-else
				class="h-80 w-full"
			>
				<div class="flex justify-between mt-2 mb-7">
					<div
						dir="ltr"
						class="mr-14"
					>
						<span
							class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark"
						>${{ useNumber(priceFormat(price)) }}</span>
						<span class="text-sm font-normal text-accent-green mx-1">
							<UiChangePrice
								classes="text-sm font-normal"
								:show-percent="true"
								pl="pl-0.5"
								:change="parseFloat(String(priceChangePerc7d))"
								:icon="false"
							/>
						</span>
					</div>
					<ul class="flex">
						<li
							v-for="(option, index) in options"
							:key="index"
							class="mx-2 text-sm font-normal cursor-pointer rounded mb-0 px-1 pt-0.5"
							:class="[selectedOption.header_option === option.header_option ? 'bg-primary-yellow-light dark:bg-primary-yellow-dark font-bold dark:font-bold dark:text-text-dark' : 'text-subtle-text-light dark:text-subtle-text-dark']"
							@click="updateChart(option)"
						>
							<span>
								{{ option.header_option }}
							</span>
						</li>
					</ul>
				</div>
				<VChart
					:option="chartOptions"
					class="w-full h-full"
				/>
			</div>
		</div>
		<div class="relative top-16">
			<ul class="flex justify-center items-center">
				<li
					:class="['flex justify-center items-center cursor-pointer ml-4', selectedCurrency === 'TMN' ? 'text-text-dark dark:text-text-light' : 'text-gray-400']"
					@click="changeMarket('TMN')"
				>
					<span class="text-sm ml-1 font-semibold">{{ $t('priceInToman') }}</span>
					<span
						:class="['w-3 h-3 rounded-full inline-block', selectedCurrency === 'TMN' ? 'bg-primary-yellow-light dark:bg-primary-yellow-dark' : 'bg-gray-300']"
					/>
				</li>
				<li
					:class="['flex justify-center items-center cursor-pointer', selectedCurrency === 'USDT' ? 'text-text-dark dark:text-text-light' : 'text-gray-400']"
					@click="changeMarket('USDT')"
				>
					<span class="text-sm ml-1 font-semibold">{{ $t('priceInDollar') }}</span>
					<span
						:class="['w-3 h-3 rounded-full inline-block', selectedCurrency === 'USDT' ? 'bg-primary-yellow-light dark:bg-primary-yellow-dark' : 'bg-gray-300']"
					/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useSpot } from '~/composables/spot/useSpot';
import { useNumber } from '~/composables/useNumber';
// import type { Quote } from '~/types/definitions/quote.types';
// import { MarketType } from '~/utils/enums/market.enum';
import { priceFormat } from '~/utils/price-format';
// import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

interface PropsDefinition {
	symbol: string;
	price: string;
	priceChangePerc7d: string;
	priceChangePerc24h: string;
	priceChangePerc30d: string;
	priceChangePerc60d: string;
	priceChangePerc90d: string;
}

const props = defineProps<PropsDefinition>();

// const worker = useBaseWorker();
// const selectedCurrency = ref<Quote[]>();

// const selectedCurrency = ref<Quote[]>();

onMounted(async () => {
	await getMarketId();
	await fetchChartKline();
});

const selectedCurrency = ref<'TMN' | 'USDT'>('TMN');

//////
const baseDataStore = useBaseDataStore();
await baseDataStore.fetchMarketBriefItems();

const { loading, getChartKline } = useSpot();

const changeMarket = async (quote: 'TMN' | 'USDT') => {
	selectedCurrency.value = quote;

	await getMarketId();
	await fetchChartKline();
};

const options = [
	{ header_option: '24h', timeFrameType: '5min', timeTo: 'TOMORROW', timeFrom: '24HOURS_AGO' },
	{ header_option: '1w', timeFrameType: '1hour', timeTo: 'TOMORROW', timeFrom: '1WEEK_AGO' },
	{ header_option: '1m', timeFrameType: '4hour', timeTo: 'TOMORROW', timeFrom: '1MONTH_AGO' },
	{ header_option: '3m', timeFrameType: '1day', timeTo: 'TOMORROW', timeFrom: '3MONTHS_AGO' },
	{ header_option: '1y', timeFrameType: '1day', timeTo: 'TOMORROW', timeFrom: '1YEAR_AGO' },
];

const getMarketId = async (): Promise<number | null> => {
	const marketItem = await baseDataStore.findMarketBymSymbol(`${props.symbol}${selectedCurrency.value}`);
	if (marketItem) {
		params.value.marketId = String(marketItem.id);
	}
	return marketItem ? marketItem.id : null;
};

const getEpochTime = (timeFrame: string): number => {
	const now = new Date();
	switch (timeFrame) {
		case 'TOMORROW':
			return Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() / 1000);
		case '24HOURS_AGO':
			return Math.floor(new Date(now.getTime() - 24 * 60 * 60 * 1000).getTime() / 1000);
		case '1WEEK_AGO':
			return Math.floor(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).getTime() / 1000);
		case '1MONTH_AGO':
			return Math.floor(new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).getTime() / 1000);
		case '3MONTHS_AGO':
			return Math.floor(new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()).getTime() / 1000);
		case '1YEAR_AGO':
			return Math.floor(new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).getTime() / 1000);
		default:
			return Math.floor(now.getTime() / 1000);
	}
};

const updateChart = async (option: { header_option: string; timeFrameType: string; timeTo: string; timeFrom: string }) => {
	selectedOption.value = option;
	params.value.timeFrom = String(getEpochTime(option.timeFrom));
	params.value.timeTo = String(getEpochTime(option.timeTo));
	params.value.timeFrameType = option.timeFrameType;
	await fetchChartKline();
};

const selectedOption = ref(options[1]);

const chartData = ref<number[]>([]);
const xAxisData = ref<string[]>([]);

const params = ref({
	timeFrom: String(getEpochTime('1WEEK_AGO')),
	timeTo: String(getEpochTime('TOMORROW')),
	candleCount: '1000',
	timeFrameType: '1hour',
	marketId: '',
});

const processChartData = (data: any[]) => {
	const timestamps = data.map((item) => new Date(Number(item[0]) * 1000).toLocaleTimeString());
	const values = data.map((item) => Number(item[2]));
	return { timestamps, values };
};

const fetchChartKline = async () => {
	try {
		const { result } = await getChartKline(params.value);
		const { timestamps, values } = processChartData(result);
		chartData.value = values;
		xAxisData.value = timestamps;
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};

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
		data: chartData.value,
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
			// formatter: (value: number) => {
			// 	return new Date(value).toLocaleDateString();
			// },
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
			data: chartData.value,
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
