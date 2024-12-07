<template>
	<div>
		<div>
			<div
				v-if="kLineLoading"
				class="h-80 w-full pt-40 flex justify-center items-center"
			>
				<UiLogoLoading />
			</div>
			<div
				v-else
				class="h-40 md:h-80 w-full"
			>
				<div class="flex justify-between flex-col md:flex-row mt-0 md:mt-2 mb-7">
					<div
						dir="ltr"
						class="mr-14 mb-4 md:mb-0"
					>
						<span
							:class="priceClass"
							class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark"
						>${{ priceFormat(localPrice) }}</span>
						<span class="text-sm font-normal mx-1">
							<UiChangePrice
								classes="text-sm font-normal pr-1.5"
								:show-percent="true"
								pl="pl-0.5"
								:change="parseFloat(String(localPriceChangePerc24h))"
								:icon="false"
							/>
						</span>
					</div>
					<ul class="flex justify-end">
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
		<div class="relative top-28 md:top-16">
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
import { bigNumber, priceFormat } from '~/utils/helpers';
import { formatDateToPersian } from '~/utils/format-date-to-persian';
import type { MarketBrief } from '~/types/definitions/market.types';
import { spotRepository } from '~/repositories/spot.repository';
import type { KLineParams } from '~/types/definitions/spot.types';
import type { SocketSpotData } from '~/types/socket.types';

interface PropsDefinition {
	markets: MarketBrief[];
	symbol: string;
	tickSize: string;
	price: string;
	priceChangePerc7d: string;
	priceChangePerc24h: string;
	priceChangePerc30d: string;
	priceChangePerc60d: string;
	priceChangePerc90d: string;
	socketData: SocketSpotData | null;
}

const props = defineProps<PropsDefinition>();

const { $api } = useNuxtApp();
const spotRepo = spotRepository($api);

const localPrice = ref(props.price);
const localPriceChangePerc24h = ref(props.priceChangePerc24h);

const textClass = ref('');

watch(() => props.socketData, (newData) => {
	if (newData) {
		const newIndexPrice = newData.i;

		if (newIndexPrice > localPrice.value) {
			textClass.value = 'text-[#c8ffc8] dark:text-[#13241f]';
		}
		else {
			textClass.value = 'text-[#ffc8c8] dark:text-[#2b181c]';
		}

		localPrice.value = newIndexPrice;
		localPriceChangePerc24h.value = newData.p;

		setTimeout(() => {
			textClass.value = '';
		}, 500);
	}
});

const priceClass = computed(() => `${textClass.value} transition duration-500`);

interface ChartOption {
	header_option: string;
	timeFrameType: string;
	timeTo: string;
	timeFrom: string;
}
const options = ref<ChartOption[]>([
	{ header_option: '24h', timeFrameType: '5min', timeTo: 'TOMORROW', timeFrom: '24HOURS_AGO' },
	{ header_option: '1w', timeFrameType: '1hour', timeTo: 'TOMORROW', timeFrom: '1WEEK_AGO' },
	{ header_option: '1m', timeFrameType: '4hour', timeTo: 'TOMORROW', timeFrom: '1MONTH_AGO' },
	{ header_option: '3m', timeFrameType: '1day', timeTo: 'TOMORROW', timeFrom: '3MONTHS_AGO' },
	{ header_option: '1y', timeFrameType: '1day', timeTo: 'TOMORROW', timeFrom: '1YEAR_AGO' },
]);
const selectedOption = ref(options.value[1]);

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

const chartData = ref<number[]>([]);
const xAxisData = ref<string[]>([]);

const selectedCurrency = ref<'TMN' | 'USDT'>('TMN');

const findMarketId = (quote: 'TMN' | 'USDT') => {
	const res = props.markets.find((market) => (
		market.mSymbol.toLowerCase().includes(quote.toLowerCase())
		&& market.typeId === 111),
	);

	if (res) {
		params.value.marketId = String(res.id);
	}
};

const changeMarket = async (quote: 'TMN' | 'USDT') => {
	await findMarketId(quote);

	selectedCurrency.value = quote;

	await getChartKline();
};

const processChartData = (data: any[]) => {
	const timestamps = data.map((item) => String(Number(item[0])));
	const values = data.map((item) => Number(item[2]));
	return { timestamps, values };
};

const updateChart = async (option: ChartOption) => {
	dataCache.value.clear();
	selectedOption.value = option;
	params.value.timeFrom = String(getEpochTime(option.timeFrom));
	params.value.timeTo = String(getEpochTime(option.timeTo));
	params.value.timeFrameType = option.timeFrameType;
	await getChartKline();
};

const TMNkLines = ref<string[]>([]);
const USDTkLines = ref<string[]>([]);

const params = ref<KLineParams>({
	timeFrom: String(getEpochTime('1WEEK_AGO')),
	timeTo: String(getEpochTime('TOMORROW')),
	candleCount: '1000',
	timeFrameType: '1hour',
	marketId: '',
});

const dataCache = ref<Map<string, string[]>>(new Map());

const kLines = ref<string[]>([]);
const kLineLoading = ref<boolean>(false);
const getChartKline = async () => {
	try {
		kLineLoading.value = true;
		if (dataCache.value.has(selectedCurrency.value)) {
			if (selectedCurrency.value === 'TMN') {
				TMNkLines.value = dataCache.value.get('TMN') || [];
			}
			else {
				USDTkLines.value = dataCache.value.get('USDT') || [];
			}

			const { timestamps, values } = processChartData(selectedCurrency.value === 'TMN'
				? TMNkLines.value
				: USDTkLines.value);
			chartData.value = values;
			xAxisData.value = timestamps;

			kLineLoading.value = false;
			return;
		}

		const { result } = await spotRepo.getKLine(params.value);
		kLines.value = result;

		const { timestamps, values } = processChartData(result);
		chartData.value = values;
		xAxisData.value = timestamps;

		if (selectedCurrency.value === 'TMN') {
			TMNkLines.value = kLines.value;

			const market = props.markets.find((market) => (
				market.mSymbol.toLowerCase().includes('usdt')
				&& market.typeId === 111),
			);

			const tempParams: KLineParams = {
				...params.value,
				marketId: String(market?.id),
			};
			const { result } = await spotRepo.getKLine(tempParams);
			USDTkLines.value = result;

			dataCache.value.set('TMN', TMNkLines.value);
			dataCache.value.set('USDT', USDTkLines.value);
		}
		else {
			USDTkLines.value = kLines.value;

			const market = props.markets.find((market) => (
				market.mSymbol.toLowerCase().includes('tmn')
				&& market.typeId === 111),
			);

			const tempParams: KLineParams = {
				...params.value,
				marketId: String(market?.id),
			};
			const { result } = await spotRepo.getKLine(tempParams);
			TMNkLines.value = result;

			dataCache.value.set('TMN', TMNkLines.value);
			dataCache.value.set('USDT', USDTkLines.value);
		}

		kLineLoading.value = false;
	}
	catch (error) {
		console.log(error);
		kLineLoading.value = false;
	}
};

onMounted(async () => {
	findMarketId(selectedCurrency.value);
	await getChartKline();
});

const timeFormat = (value: string | number) => {
	const time = selectedOption.value.header_option;
	const data = Number(value);

	let result = '';

	if (time === '24h') {
		result = timeFormatter(data, false);
	}
	else if (time === '1w') {
		result = timeFormatter(data, false, true);
	}
	else if (time === '3m') {
		result = timeFormatter(data, false, true);
	}
	else if (time === '1y') {
		result = timeFormatter(data, false, true);
	}
	else if (time === '1m') {
		result = timeFormatter(data, false, true);
	}

	return result;
};

const tooltipShowPersianDate = (value: string | number) => {
	const time = selectedOption.value.header_option;
	const data = Number(value);

	let result = '';

	if (time === '24h') {
		result = formatDateToPersian(data);
	}
	else if (time === '1w') {
		result = formatDateToPersian(data);
	}
	else if (time === '3m') {
		result = formatDateToPersian(data);
	}
	else if (time === '1y') {
		result = formatDateToPersian(data);
	}
	else if (time === '1m') {
		result = formatDateToPersian(data);
	}

	return result;
};

const tooltipTimeFormat = (value: string | number) => {
	const time = selectedOption.value.header_option;
	const data = Number(value);

	let result = formatDate(data, 'full');

	if (time === '3m') {
		result = formatDate(data, 'year-month-day');
	}
	else	if (time === '1y') {
		result = formatDate(data, 'year-month-day');
	}

	return result;
};

const tooltipShowToman = (value: string | number, axisValue: string | number) => {
	try {
		const priceType = selectedCurrency.value;

		if (priceType === 'TMN') {
			return priceFormat(value);
		}
		else {
			const data: any = TMNkLines.value.find((item) => item[0] === String(axisValue));
			if (data) {
				return priceFormat(data[2]);
			}
			return 0;
		}
	}
	catch (error) {
		console.log(error);
	}
};

const tooltipShowDollar = (value: string | number, axisValue: string | number) => {
	try {
		const priceType = selectedCurrency.value;

		if (priceType === 'USDT') {
			return priceFormat(value);
		}
		else {
			const data: any = USDTkLines.value.find((item) => item[0] === String(axisValue));
			if (data) {
				return priceFormat(data[2]);
			}
			return 0;
		}
	}
	catch (error) {
		console.log(error);
	}
};

interface AxisParams {
	componentType: string;
	componentSubType: string;
	componentIndex: number;
	seriesType: string;
	seriesIndex: number;
	seriesId: string;
	seriesName: string;
	name: string;
	dataIndex: number;
	data: number;
	value: number;
	color: string;
	dimensionNames: string[];
	encode: {
		x: number[];
		y: number[];
	};
	$vars: string[];
	axisDim: string;
	axisIndex: number;
	axisType: string;
	axisId: string;
	axisValue: string;
	axisValueLabel: string;
	marker: string;
};

const chartOptions = computed(() => ({
	tooltip: {
		trigger: 'axis',
		formatter: function (params: AxisParams[]) {
			return `<div class="text-black pb-1">
						<div>
							<span class='text-black text-xs font-dana'>${tooltipShowPersianDate	(params[0].axisValue)}</span>
							<span class='text-black text-xs font-dana'>|</span>
							<strong class='text-black text-xs font-dana'>
								${tooltipTimeFormat(params[0].axisValue)}
							</strong>
						</div>
						<div>
							<span class="inline-block w-1.5 h-1.5 rounded-full bg-white dark:bg-black"></span>
							<span class='text-black text-xs font-dana'>${useT('priceInDollar')}:</span>
							<strong class='text-black text-xs font-dana'>${tooltipShowDollar(params[0].value, params[0].axisValue)}</strong>
							<strong class='text-black text-xs font-dana'>$</strong>
						</div>
						${tooltipShowToman(params[0].value, params[0].axisValue) !== '0'
						? `
							<div>
								<span class="inline-block w-1.5 h-1.5 rounded-full bg-white dark:bg-black"></span>
								<span class='text-black text-xs font-dana'>${useT('priceInToman')}:</span>:
								<strong class='text-black text-xs font-dana'>${tooltipShowToman(params[0].value, params[0].axisValue)}</strong>
								<strong class='text-black text-xs font-dana'>${useT('toman')}</strong>
							</div>
							`
						: ``}
					</div>`;
		},
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		top: '10%',
		containLabel: true,
	},
	xAxis: {
		inverse: true,
		type: 'category',
		data: xAxisData.value,
		boundaryGap: false,
		axisLine: {
			lineStyle: {
				color: '#666',
			},
		},
		axisLabel: {
			fontFamily: 'dana',
			formatter: (value: number) => {
				return `${(timeFormat(value))}`;
			},
		},
		splitLine: {
			lineStyle: {
				color: '#333',
				type: 'dashed',
			},
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
		axisLabel: {
			fontFamily: 'dana',
			formatter: (value: number) => {
				return (String(bigNumber(value)));
			},
		},
		min: () => {
			const minPrice = Math.min(...chartData.value);
			return formatByDecimal((minPrice - (minPrice * (0.1)) || 0), props.tickSize);
		},
		// max: () => {
		// 	const maxPrice = Math.max(...chartData.value);
		// 	return maxPrice + (maxPrice * 0.1);
		// },
	},
	series: [
		{
			data: chartData.value,
			type: 'line',
			markPoint: {
				data: [
					{
						type: 'max',
						name: 'Highest',
						symbol: 'circle',
						symbolSize: 50,
						value: '3232323',
						label: {
							show: true,
							formatter: '{c}',
						},
					},
					{
						type: 'min',
						name: 'Lowest',
						symbol: 'circle',
						symbolSize: 50,
						value: '3232323',
						label: {
							show: true,
							formatter: '{c}',
						},
					},
				],
			},
			smooth: true,
			name: 'Market',
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
