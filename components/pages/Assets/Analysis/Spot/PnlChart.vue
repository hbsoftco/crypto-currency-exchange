<template>
	<div>
		<div class="flex justify-between mb-6">
			<p class="text-lg font-extrabold text-subtle-text-light dark:text-subtle-text-dark">
				{{ $t('amountCurrenciesProfitLoss') }}
			</p>
			<div class="w-48">
				<USelectMenu
					v-model="selectedType"
					size="lg"
					:options="typeItems"
					option-attribute="value"
					:ui="{
						background: '',
						color: {
							white: {
								outline: ' bg-hover-light dark:bg-hover-dark',
							},
						},
					}"
				/>
			</div>
		</div>
		<div>
			<VChart
				:option="neutralPieOptions"
				class="w-full h-[35rem]"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { assetRepository } from '~/repositories/asset.repository';
import type { AssetSpotPnlAgg, AssetSpotPnlAggListParams } from '~/types/definitions/asset.types';
import type { KeyValue } from '~/types/definitions/common.types';
import { PnlSortMode } from '~/utils/enums/asset.enum';

const { $api } = useNuxtApp();
const assetRepo = assetRepository($api);

const params = ref<AssetSpotPnlAggListParams>({
	pnlCourseId: '2',
	sortMode: '0',
});
const assetSpotPnlAggListLoading = ref<boolean>(false);
const assetSpotPnlAggList = ref<AssetSpotPnlAgg[]>([]);
const getAssetSpotPnlAggList = async () => {
	try {
		assetSpotPnlAggListLoading.value = true;
		const { result } = await assetRepo.getAssetSpotPnlAggList(params.value);
		assetSpotPnlAggList.value = result.rows as AssetSpotPnlAgg[];
		assetSpotPnlAggListLoading.value = false;
	}
	catch (error) {
		console.log(error);
	}
};

onMounted(async () => {
	await getAssetSpotPnlAggList();
});

const typeItems = ref<KeyValue[]>([
	{ key: PnlSortMode.None, value: useT('allAssets') },
	{ key: PnlSortMode.MostWorthless, value: useT('mostWorthless') },
	{ key: PnlSortMode.MostBeneficial, value: useT('mostBeneficial') },
	{ key: PnlSortMode.HighestIncome, value: useT('highestIncome2') },
	{ key: PnlSortMode.MostExpensive, value: useT('mostExpensive') },
]);

const selectedType = ref(typeItems.value[0].value);

const neutralPieOptions = computed(() => {
	const sortedData = [...assetSpotPnlAggList.value]
		.sort((a, b) => a.latestPnlAvgPerc - b.latestPnlAvgPerc)
		.slice(0, 20);

	return {
		title: {
			text: '',
			left: '5%',
			top: '3%',
		},
		tooltip: {
			trigger: 'item',
			formatter: (param: any) => {
				return `${param.data[3]}: ${param.data[1].toFixed(2)}%`;
			},
		},
		legend: {
			right: '3%',
			top: '3%',
			data: sortedData.map((item) => item.cSymbol),
		},
		grid: {
			left: '5%',
			right: '5%',
			top: '10%',
		},
		xAxis: {
			type: 'category',
			data: sortedData.map((item) => item.cSymbol),
			splitLine: {
				show: false,
			},
		},
		yAxis: {
			type: 'value',
			name: 'Latest PNL Avg (%)',
			scale: true,
			splitLine: {
				show: true,
				lineStyle: {
					color: '#3b3b3b',
					type: 'dashed',
				},
			},
		},
		series: [
			{
				name: 'Profit/Loss',
				data: sortedData.map((item) => [
					item.cSymbol,
					item.latestPnlAvgPerc,
					Math.abs(item.latestPnlBasedAvgInUsd),
					item.cSymbol,
				]),
				type: 'scatter',
				symbolSize: (data: number[]) => {
					const baseSize = 110;
					const scaleFactor = 50;

					return Math.log(Math.abs(data[2]) + 1) * scaleFactor + baseSize;
				},
				label: {
					show: true,
					formatter: (param: any) => param.data[3],
					position: 'inside',
					color: '#fff',
				},
				itemStyle: {
					opacity: 0.6,
					color: (param: any) => (param.data[1] > 0 ? '#00C853' : '#D50000'),
				},
			},
		],
	};
});
</script>
