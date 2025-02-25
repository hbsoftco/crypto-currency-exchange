<template>
	<UContainer v-if="marketsL51Loading || marketsL47Loading || marketDailyPriceChangeLoading">
		<div v-if="!isMobile">
			<div class="py-20">
				<ChartMarketStateSkeleton />
			</div>
			<div class="pb-20">
				<MarketCategorySkeleton />
			</div>
			<MarketCategorySliderSkeleton />
		</div>
		<div v-else>
			<UiLogoLoading />
		</div>
	</UContainer>
	<UContainer v-else>
		<BackHeader
			v-if="isMobile"
			:title="$t('marketStatisticalInformation')"
		/>
		<div>
			<div>
				<div
					v-if="!isMobile"
					class="mb-0 md:mb-4 mt-0 md:mt-8"
				>
					<UiTitleWithBack :title="$t('marketStatistics')" />
				</div>
				<div v-if="isMobile">
					<div
						class="flex justify-between w-full h-full relative mb:2 md:mb-16"
					>
						<div
							v-if="negativeMarketsItems.length > 0"
							class="w-[27%] relative"
						>
							<div class="absolute top-11 pr-1 right-0">
								<p class="text-xs mb-[2.65rem]">
									{{ $t('greaterThanPlus10Percent') }}
								</p>
								<p class="text-xs mb-[2.65rem]">
									{{ $t('plus8ToPlus10Percent') }}
								</p>
								<p class="text-xs mb-[2.65rem]">
									{{ $t('plus6ToPlus8Percent') }}
								</p>
								<p class="text-xs mb-[2.65rem]">
									{{ $t('plus4ToPlus6Percent') }}
								</p>
								<p class="text-xs mb-[2.65rem]">
									{{ $t('plus2ToPlus4Percent') }}
								</p>
								<p class="text-xs mb-[2.65rem]">
									{{ $t('lessThanPlus2Percent') }}
								</p>
							</div>
							<VChart
								:option="positiveMarketBarMobileOptions"
								class="w-full h-96"
							/>
						</div>
						<!-- Left Chart Mobile -->
						<div
							v-if="neutralMarketsItems.length > 0"
							class="w-[46%] pt-5 relative"
						>
							<div class="w-20 h-10 z-20 absolute top-16 right-0 left-0 text-center m-auto">
								<span class="text-[0.7rem]">{{ $t('marketGrowthDecline24h') }}</span>
							</div>
							<VChart
								:option="neutralPieMobileOptions"
								class="w-full md:w-full h-40 md:h-80 z-0"
							/>
						</div>
						<!-- Pie Chart Mobile -->
						<div
							v-if="positiveMarketsItems.length > 0"
							class="w-[27%] relative"
						>
							<div class="absolute top-11 pl-1 left-0">
								<p class="text-xs mb-[2.65rem]">
									{{ $t('lessThanMinus10Percent') }}
								</p>
								<p class="text-xs mb-[2.65rem]">
									{{ $t('minus8ToMinus10Percent') }}
								</p>
								<p class="text-xs mb-[2.65rem]">
									{{ $t('minus6ToMinus8Percent') }}
								</p>
								<p class="text-xs mb-[2.65rem]">
									{{ $t('minus4ToMinus6Percent') }}
								</p>
								<p class="text-xs mb-[2.65rem]">
									{{ $t('minus2ToMinus4Percent') }}
								</p>
								<p class="text-xs mb-[2.65rem]">
									{{ $t('greaterThanMinus2Percent') }}
								</p>
							</div>
							<VChart
								:option="negativeMarketBarMobileOptions"
								class="w-full h-96"
							/>
						</div>
						<!-- Right Chart Mobile -->
					</div>

					<div class="flex justify-between">
						<div class="text-center text-sm font-medium">
							{{ $t("numberOfRisingMarkets") }}
						</div>
						<div class="text-center text-sm font-medium">
							{{ $t("numberOfDecliningMarkets") }}
						</div>
					</div>
				</div>
				<div
					v-else
					class="flex justify-between w-full h-full relative mb:2 md:mb-16"
				>
					<div
						v-if="negativeMarketsItems.length > 0"
						class="w-[40%]"
					>
						<VChart
							:option="positiveMarketBarOptions"
							class="w-full h-96"
						/>
						<div class="text-center text-sm md:text-base font-bold">
							{{ $t("numberOfRisingMarkets") }}
						</div>
					</div>
					<div
						v-if="positiveMarketsItems.length > 0"
						class="w-[40%]"
					>
						<VChart
							:option="negativeMarketBarOptions"
							class="w-full h-96"
						/>
						<div class="text-center text-sm md:text-base font-bold">
							{{ $t("numberOfDecliningMarkets") }}
						</div>
					</div>
					<div
						v-if="neutralMarketsItems.length > 0 && !isMobile"
						class="w-80 h-80 absolute left-0 right-0 m-auto top-8"
					>
						<VChart
							:option="neutralPieOptions"
							class="w-40 md:w-full h-40 md:h-80"
						/>
					</div>
				</div>
			</div>

			<div
				v-if="marketsL51.length"
				class="mt-10 md:mt-0"
			>
				<div class="mb-10">
					<h3 class="text-base font-bold">
						{{ $t("currencyCategories") }}
					</h3>
				</div>
				<div class="mb-18">
					<MarketCategorySlider :items="marketsL51" />
				</div>
			</div>
			<!-- Currency Categories -->

			<div class="flex flex-wrap justify-around">
				<ChartMarketState
					v-for="(item, index) in marketsL47"
					:key="index"
					:item="item"
				/>
			</div>
			<!-- Bellow tables and its charts -->
		</div>
	</UContainer>
</template>

<script setup lang="ts">
import MarketCategorySlider from '~/components/pages/Market/Statistics/MarketCategorySlider.vue';
import ChartMarketState from '~/components/pages/Market/Statistics/ChartMarketState.vue';
import { marketRepository } from '~/repositories/market.repository';
import { MarketType } from '~/utils/enums/market.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { DailyPriceChange, MarketL47, MarketL51, MarketsL47Params } from '~/types/definitions/market.types';
import type { NeutralMarketItem } from '~/types/response/market.types';
import ChartMarketStateSkeleton from '~/components/pages/Market/Statistics/ChartMarketStateSkeleton.vue';
import MarketCategorySkeleton from '~/components/pages/Market/Statistics/MarketCategorySkeleton.vue';
import MarketCategorySliderSkeleton from '~/components/pages/Market/Statistics/MarketCategorySliderSkeleton.vue';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

const { $api, $mobileDetect } = useNuxtApp();
const marketRepo = marketRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();

const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	},
});

const marketsL51 = ref<MarketL51[]>([]);
const marketsL51Loading = ref<boolean>(false);
const getMarketListL51 = async () => {
	try {
		marketsL51Loading.value = true;
		const { result } = await marketRepo.getMarketListL51();
		marketsL51.value = await worker.addCurrencyToMarketsL51(
			useEnv('apiBaseUrl'),
			result.rows as MarketL51[],
		);

		marketsL51Loading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};
// Currency Categories

const marketsL47Params = ref<MarketsL47Params>({
	marketTypeId: String(MarketType.SPOT),
	rowCount: '10',
});
const marketsL47 = ref<MarketL47[]>([]);
const marketsL47Loading = ref<boolean>(false);
const getMarketListL47 = async () => {
	try {
		marketsL47Loading.value = true;
		const { result } = await marketRepo.getMarketListL47(marketsL47Params.value);
		marketsL47.value = await worker.addCurrencyToMarketsL47(
			useEnv('apiBaseUrl'),
			result.rows as MarketL47[],
		);

		marketsL47Loading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};
// Bellow tables and its charts

const marketDailyPriceChange = ref<DailyPriceChange[]>([]);
const marketDailyPriceChangeLoading = ref<boolean>(false);
const getMarketDailyPriceChange = async () => {
	try {
		marketDailyPriceChangeLoading.value = true;
		const { result } = await marketRepo.getMarketDailyPriceChange();
		marketDailyPriceChange.value = result.priceChangeStats;

		await initChatsData();
		marketDailyPriceChangeLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};
// Market daily price changes

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getMarketListL51(),
		getMarketListL47(),
		getMarketDailyPriceChange(),
	]);
});

const positiveRanges: [string, string][] = [
	['> 10%', '> +10.0%'],
	['8% to 10%', '> +08.0%'],
	['6% to 8%', '> +06.0%'],
	['4% to 6%', '> +04.0%'],
	['2% to 4%', '> +02.0%'],
	['< 2%', '>  00.0%'],
];

const negativeRanges: [string, string][] = [
	['-10% >', '< -10.0%'],
	['-8% to -10%', '< -08.0%'],
	['-6% to -8%', '< -06.0%'],
	['-4% to -6%', '< -04.0%'],
	['-2% to -4%', '< -02.0%'],
	['-2% <', '<  00.0%'],
];

const calculatePositiveMarkets = (priceChangeStats: DailyPriceChange[], positiveRanges: [string, string][]) => {
	let positive = 0;
	positiveRanges.forEach(([_, originalRange]) => {
		if (originalRange !== '>  00.0%') {
			positive += priceChangeStats
				.filter((d) => d.priceChangeRange === originalRange)
				.reduce((sum, d) => sum + d.countOfMarkets, 0);
		}
	});
	return positive;
};

const calculateNegativeMarkets = (priceChangeStats: DailyPriceChange[], negativeRanges: [string, string][]) => {
	let negative = 0;
	negativeRanges.forEach(([_, originalRange]) => {
		if (originalRange !== '<  00.0%') {
			negative += priceChangeStats
				.filter((d) => d.priceChangeRange === originalRange)
				.reduce((sum, d) => sum + d.countOfMarkets, 0);
		}
	});
	return negative;
};

const getPercent = (priceChangeRange: string): number | null => {
	const percent = parseFloat(priceChangeRange.replace(/[^\d.-]/g, ''));
	return isNaN(percent) ? null : percent;
};

const calculateNeutralMarkets = (priceChangeStats: DailyPriceChange[]) => {
	let neutral = 0;
	priceChangeStats.forEach((d) => {
		const percent = getPercent(d.priceChangeRange);
		if (percent !== null && percent > -2 && percent < 2) {
			neutral += d.countOfMarkets;
		}
	});
	return neutral;
};

const positiveMarkets = ref<number>(0);
const negativeMarkets = ref<number>(0);
const neutralMarkets = ref<number>(0);

const positiveMarketsItems = ref<number[]>([]);
const negativeMarketsItems = ref<number[]>([]);
const neutralMarketsItems = ref<NeutralMarketItem[]>([]);

const initChatsData = async () => {
	const priceChangeStats = marketDailyPriceChange.value;

	positiveMarkets.value = calculatePositiveMarkets(priceChangeStats, positiveRanges);
	negativeMarkets.value = calculateNegativeMarkets(priceChangeStats, negativeRanges);
	neutralMarkets.value = calculateNeutralMarkets(priceChangeStats);

	positiveMarketsItems.value = positiveRanges.map(([_, originalRange]) => {
		return priceChangeStats
			.filter((d) => d.priceChangeRange === originalRange)
			.reduce((sum, d) => sum + d.countOfMarkets, 0);
	});

	negativeMarketsItems.value = negativeRanges.map(([_, originalRange]) => {
		return priceChangeStats
			.filter((d) => d.priceChangeRange === originalRange)
			.reduce((sum, d) => sum + d.countOfMarkets, 0);
	});

	// Update pie chart data
	neutralMarketsItems.value = [
		{ value: positiveMarkets.value, name: useT('growth'), itemStyle: { color: '#28A745' } },
		{ value: negativeMarkets.value, name: useT('decline'), itemStyle: { color: '#FF4D4F' } },
		{ value: neutralMarkets.value, name: useT('neutral'), itemStyle: { color: '#666666' } },
	];
};

const negativeMarketBarMobileOptions = computed(() => ({
	grid: {
		left: '3%',
		right: '30%',
		bottom: '3%',
		top: '0%',
		containLabel: true,
	},
	xAxis: {
		type: 'value',
		show: false,
		inverse: false,
	},
	yAxis: {
		type: 'category',
		show: false,
		data: [],
		inverse: true,
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			color: isDark.value ? '#FFFFFF' : '#000000',
			fontFamily: 'dana',
			fontSize: 10,
			fontWeight: 'bold',
			padding: [0, 0, 0, 10],
			formatter: (value: string) => value,
		},
	},
	series: [
		{
			name: useT('fallingMarkets'),
			type: 'bar',
			data: negativeMarketsItems.value,
			itemStyle: {
				color: '#FF4D4F',
				borderRadius: [1, 1, 1, 1],
			},
			barWidth: 14,
			label: {
				show: true,
				position: 'right',
				color: '#FF4D4F',
			},
		},
	],
}));

const positiveMarketBarMobileOptions = computed(() => ({
	grid: {
		left: '20%',
		right: '4%',
		bottom: '3%',
		top: '0%',
		containLabel: true,
	},
	xAxis: {
		type: 'value',
		show: false,
		inverse: true,
	},
	yAxis: {
		position: 'right',
		type: 'category',
		show: false,
		data: [],
		inverse: true,
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			color: isDark.value ? '#FFFFFF' : '#000000',
			fontFamily: 'dana',
			position: 'right',
			fontSize: 10,
			fontWeight: 'bold',
			padding: [0, 0, 0, 10],
			formatter: (value: string) => value,
		},
	},
	series: [
		{
			name: useT('risingMarkets'),
			type: 'bar',
			data: positiveMarketsItems.value,
			itemStyle: {
				color: '#28A745',
				borderRadius: [1, 1, 1, 1],
			},
			barWidth: 14,
			label: {
				show: true,
				position: 'left',
				formatter: '{c}',
				color: '#28A745',
			},
		},
	],
}));

const neutralPieMobileOptions = computed(() => ({
	title: {
		text: '',
		left: 'center',
		top: '0%',
		textStyle: {
			color: isDark.value ? '#FFFFFF' : '#000000',
			fontSize: 14,
			fontFamily: 'dana',
			fontWeight: 'bold',
		},
	},
	tooltip: {
		show: false,
	},
	legend: {
		show: false,
	},
	series: [
		{
			name: useT('marketGrowthAndDecline'),
			type: 'pie',
			radius: ['100%', '55%'],
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 1,
				borderColor: isDark.value ? '#121212' : '#ffffff',
				borderWidth: 0,
			},
			label: {
				show: true,
				position: 'inside',
				fontFamily: 'dana',
				formatter: '{c}',
				color: isDark.value ? '#000000' : '#FFFFFF',
				fontSize: 11,
				fontWeight: 'bold',
			},
			labelLine: {
				show: false,
			},
			data: neutralMarketsItems.value,
			emphasis: {
				scale: false,
			},
		},
	],
}));

const negativeMarketBarOptions = computed(() => ({
	grid: {
		left: '3%',
		right: '10%',
		bottom: '3%',
		top: '10%',
		containLabel: true,
	},
	xAxis: {
		type: 'value',
		show: false,
		inverse: false,
	},
	yAxis: {
		type: 'category',
		data: [
			useT('lessThanMinus10Percent'),
			useT('minus8ToMinus10Percent'),
			useT('minus6ToMinus8Percent'),
			useT('minus4ToMinus6Percent'),
			useT('minus2ToMinus4Percent'),
			useT('greaterThanMinus2Percent'),
		],
		inverse: true,
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			color: isDark.value ? '#FFFFFF' : '#000000',
			fontFamily: 'dana',
			fontSize: 14,
			fontWeight: 'bold',
			padding: [0, 0, 0, 10],
			formatter: (value: string) => value,
		},
	},
	series: [
		{
			name: useT('fallingMarkets'),
			type: 'bar',
			data: negativeMarketsItems.value,
			itemStyle: {
				color: '#FF4D4F',
				borderRadius: [4, 4, 4, 4],
			},
			barWidth: 24,
			label: {
				show: true,
				position: 'right',
				color: '#FF4D4F',
			},
		},
	],
}));

const positiveMarketBarOptions = computed(() => ({
	grid: {
		left: '10%',
		right: '4%',
		bottom: '3%',
		top: '10%',
		containLabel: true,
	},
	xAxis: {
		type: 'value',
		show: false,
		inverse: true,
	},
	yAxis: {
		position: 'right',
		type: 'category',
		data: [
			useT('greaterThanPlus10Percent'),
			useT('plus8ToPlus10Percent'),
			useT('plus6ToPlus8Percent'),
			useT('plus4ToPlus6Percent'),
			useT('plus2ToPlus4Percent'),
			useT('lessThanPlus2Percent'),
		],
		inverse: true,
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			color: isDark.value ? '#FFFFFF' : '#000000',
			fontFamily: 'dana',
			position: 'right',
			fontSize: 14,
			fontWeight: 'bold',
			padding: [0, 0, 0, 10],
			formatter: (value: string) => value,
		},
	},
	series: [
		{
			name: useT('risingMarkets'),
			type: 'bar',
			data: positiveMarketsItems.value,
			itemStyle: {
				color: '#28A745',
				borderRadius: [4, 4, 4, 4],
			},
			barWidth: 24,
			label: {
				show: true,
				position: 'left',
				formatter: '{c}',
				color: '#28A745',
			},
		},
	],
}));

const neutralPieOptions = computed(() => ({
	title: {
		text: useT('marketGrowthAndDecline'),
		left: 'center',
		top: '47%',
		textStyle: {
			color: isDark.value ? '#FFFFFF' : '#000000',
			fontSize: 14,
			fontFamily: 'dana',
			fontWeight: 'bold',
		},
	},
	tooltip: {
		trigger: 'item',
		backgroundColor: '#333',
		borderColor: '#fff',
		borderWidth: 1,
		padding: 10,
		textStyle: {
			color: '#FFFFFF',
			fontSize: 12,
			fontWeight: 'bold',
			fontFamily: 'dana',
		},
		formatter: '{b}: {c}',
	},
	legend: {
		show: false,
	},
	series: [
		{
			name: useT('marketGrowthAndDecline'),
			type: 'pie',
			radius: ['40%', '65%'],
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 5,
				borderColor: isDark.value ? '#121212' : '#ffffff',
				borderWidth: 2,
			},
			label: {
				show: true,
				position: 'inside',
				fontFamily: 'dana',
				formatter: '{c}',
				color: isDark.value ? '#000000' : '#FFFFFF',
				fontSize: 11,
				fontWeight: 'bold',
			},
			labelLine: {
				show: false,
			},
			data: neutralMarketsItems.value,
		},
	],
}));
</script>
