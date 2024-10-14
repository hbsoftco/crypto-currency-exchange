<template>
	<UContainer>
		<div v-if="chartsDataLoading === 'success'">
			<div class="mb-4 mt-8">
				<UiTitleWithBack :title="$t('marketStatistics')" />
			</div>
			<div
				class="flex justify-between w-full h-full relative mb-16"
			>
				<div
					v-if="negativeMarketsItems.length > 0"
					class="w-[50%]"
				>
					<ClientOnly>
						<VChart
							:option="positiveMarketBarOptions"
							class="w-full h-96"
						/>
					</ClientOnly>
					<div class="text-center text-base font-bold">
						{{ $t("numberOfRisingMarkets") }}
					</div>
				</div>
				<div
					v-if="positiveMarketsItems.length > 0"
					class="w-[50%]"
				>
					<ClientOnly>
						<VChart
							:option="negativeMarketBarOptions"
							class="w-full h-96"
						/>
					</ClientOnly>
					<div class="text-center text-base font-bold">
						{{ $t("numberOfDecliningMarkets") }}
					</div>
				</div>
				<div
					v-if="neutralMarketsItems.length > 0"
					class="w-80 h-80 absolute left-0 right-0 m-auto -top-2"
				>
					<ClientOnly>
						<VChart
							:option="neutralPieOptions"
							class="w-full h-80"
						/>
					</ClientOnly>
				</div>
			</div>
		</div>

		<div class="mb-10">
			<h3 class="text-base font-bold">
				{{ $t("currencyCategories") }}
			</h3>
		</div>
		<div
			v-if="marketCurrencyCategoriesLoading === 'success'"
			class="mb-18"
		>
			<CurrencyCategorySlider :items="marketCurrencyCategories ?? []" />
		</div>

		<div class="flex flex-wrap justify-around">
			<MarketState
				v-for="(item, index) in marketListByCategory"
				:key="index"
				:item="item"
			/>
		</div>
	</UContainer>
</template>

<script setup lang="ts">
import CurrencyCategorySlider from '~/components/pages/Market/Statistics/CurrencyCategorySlider.vue';
import MarketState from '~/components/pages/Market/Statistics/MarketState.vue';
import { useNumber } from '~/composables/useNumber';
import { marketRepository } from '~/repositories/market.repository';
import type { MarketCurrencyCategoriesResponse, MarketListByCategoryResponse, NeutralMarketItem, PriceChangeState } from '~/types/response/market.types';
import { Language } from '~/utils/enums/language.enum';
import { MarketType } from '~/utils/enums/market.enum';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const { data: chartsData, status: chartsDataLoading } = useAsyncData(
	'marketStatisticsChartsData',
	async () => {
		const response = await marketRepo.getMarketStatisticsCharts();
		return response;
	},
);

const { useCachedCurrencyBriefList } = useCachedData();

const { data: cachedCurrencyBriefList } = await useCachedCurrencyBriefList({ languageId: Language.PERSIAN });

const currencyBriefList = cachedCurrencyBriefList.value ?? [];

const { data: marketCurrencyCategories, status: marketCurrencyCategoriesLoading } = useAsyncData(
	'marketCurrencyCategories',
	async () => {
		const response: MarketCurrencyCategoriesResponse = await marketRepo.getMarketCurrencyCategories();

		const processedMarketCategories = response.result.rows.map((category) => {
			const updatedMarkets = category.markets.map((market) => {
				const currencyItem = currencyBriefList.find((item) => item.id === market.cid) || null;

				return {
					...market,
					currencyDetails: currencyItem,
				};
			});

			return {
				...category,
				markets: updatedMarkets,
			};
		});

		return processedMarketCategories;
	},
);

const { data: marketListByCategory, status: marketListByCategoryLoading } = useAsyncData(
	'marketListByCategory',
	async () => {
		const response: MarketListByCategoryResponse = await marketRepo.getMarketListByCategory({
			marketTypeId: String(MarketType.SPOT),
			rowCount: '10',
		});

		const processedMarketList = response.result.rows.map((category) => {
			const updatedMarkets = category.info.map((market) => {
				const currencyItem = currencyBriefList.find((item) => item.id === market.cid) || null;

				return {
					...market,
					currencyDetails: currencyItem,
				};
			});

			return {
				...category,
				info: updatedMarkets,
			};
		});
		return processedMarketList;
	},
);

console.log('marketListByCategory', marketListByCategory.value);
console.log(marketListByCategoryLoading.value);

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

const calculatePositiveMarkets = (priceChangeStats: PriceChangeState[], positiveRanges: [string, string][]) => {
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

const calculateNegativeMarkets = (priceChangeStats: PriceChangeState[], negativeRanges: [string, string][]) => {
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

const calculateNeutralMarkets = (priceChangeStats: PriceChangeState[]) => {
	let neutral = 0;
	priceChangeStats.forEach((d) => {
		const percent = getPercent(d.priceChangeRange);
		if (percent !== null && percent > -2 && percent < 2) {
			neutral += d.countOfMarkets;
		}
	});
	return neutral;
};

const positiveMarkets = ref(0);
const negativeMarkets = ref(0);
const neutralMarkets = ref(0);

const positiveMarketsItems = ref<number[]>([]);
const negativeMarketsItems = ref<number[]>([]);
const neutralMarketsItems = ref<NeutralMarketItem[]>([]);

watch(chartsData, (newData) => {
	if (!newData || !newData.result || !newData.result.priceChangeStats) return;

	const priceChangeStats = newData.result.priceChangeStats;

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
});

const negativeMarketBarOptions = computed(() => ({
	grid: {
		left: '3%',
		right: '4%',
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
			useNumber(useT('lessThanMinus10Percent')),
			useNumber(useT('minus8ToMinus10Percent')),
			useNumber(useT('minus6ToMinus8Percent')),
			useNumber(useT('minus4ToMinus6Percent')),
			useNumber(useT('minus2ToMinus4Percent')),
			useNumber(useT('greaterThanMinus2Percent')),
		],
		inverse: true,
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			color: '#FFFFFF',
			fontFamily: 'dana',
			fontSize: 14,
			fontWeight: 'bold',
			padding: [0, 0, 0, 10],
			formatter: (value: string) => useNumber(value),
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
		left: '3%',
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
			useNumber(useT('greaterThanPlus10Percent')),
			useNumber(useT('plus8ToPlus10Percent')),
			useNumber(useT('plus6ToPlus8Percent')),
			useNumber(useT('plus4ToPlus6Percent')),
			useNumber(useT('plus2ToPlus4Percent')),
			useNumber(useT('lessThanPlus2Percent')),
		],
		inverse: true,
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			color: '#FFFFFF',
			fontFamily: 'dana',
			position: 'right',
			fontSize: 14,
			fontWeight: 'bold',
			padding: [0, 0, 0, 10],
			formatter: (value: string) => useNumber(value),
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
			color: '#FFFFFF',
			fontSize: 14,
			fontFamily: 'dana',
			fontWeight: 'bold',
		},
	},
	tooltip: {
		trigger: 'item',
		backgroundColor: '#333',
		borderColor: '#FFF',
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
				borderWidth: 2,
			},
			label: {
				show: true,
				position: 'inside',
				fontFamily: 'dana',
				formatter: '{c}',
				color: '#FFFFFF',
				fontSize: 12,
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
