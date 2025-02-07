<template>
	<div v-if="assetListLoading">
		<UiLogoLoading />
	</div>

	<div v-else>
		<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
			<p class="text-lg font-extrabold text-subtle-text-light dark:text-subtle-text-dark">
				{{ $t('mapAssets') }}
			</p>
		</div>
		<div class="flex justify-between items-center mt-3">
			<div class="flex justify-start items-center">
				<div class="w-8 border-l-2 border-primary-gray-light dark:border-primary-gray-dark ml-3">
					<IconRefresh
						class="text-xl cursor-pointer text-subtle-text-light dark:text-subtle-text-dark"
						@click="getAssetList()"
					/>
				</div>
				<div class="flex gap-4">
					<label
						for="type"
						class="text-sm text-subtle-text-light dark:text-subtle-text-dark"
					>
						{{ $t('showType') }}:
					</label>
					<URadioGroup
						id="type"
						v-model="selected"
						:options="options"
						:ui="{
							wrapper: 'items-center',
							fieldset: 'flex gap-3',
						}"
					>
						<template #label="{ option }">
							<p class="py-1">
								{{ option.label }}
							</p>
						</template>
					</URadioGroup>
				</div>
			</div>

			<div class="flex justify-start gap-2">
				<div
					v-for="item in boxColors"
					:key="item.id"
					:class="item.color"
					class="h-9 w-12 text-center flex justify-center items-center text-sm font-semibold rounded text-white"
					dir="ltr"
				>
					{{ item.text }}
				</div>
			</div>
		</div>
		<section dir="ltr">
			<VChart
				:option="treemapOptions"
				class="w-full h-[45rem]"
			/>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconRefresh from '~/assets/svg-icons/refresh.svg';
import { assetRepository } from '~/repositories/asset.repository';
import type { Asset, AssetListParams } from '~/types/definitions/asset.types';
import { BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const { $api, $mobileDetect } = useNuxtApp();
const assetRepo = assetRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const selected = ref('value');
const options = [{
	value: 'value',
	label: useT('value'),
}, {
	value: 'volume',
	label: useT('volume'),
}];

const boxColors = ref([
	{ id: 'box_01', text: '-9%', color: 'bg-[#FF2211]' },
	{ id: 'box_02', text: '-6%', color: 'bg-[#BF4045]' },
	{ id: 'box_03', text: '-3%', color: 'bg-[#8B444E]' },
	{ id: 'box_04', text: '0%', color: 'bg-[#4B4B4B]' },
	{ id: 'box_05', text: '+3%', color: 'bg-[#35764E]' },
	{ id: 'box_06', text: '+6%', color: 'bg-[#2F9E4F]' },
	{ id: 'box_07', text: '+9%', color: 'bg-[#4CAF50]' },
]);

const worker = useBaseWorker();

const publicSocketStore = usePublicSocketStore();
const socketMarketIds = ref<number[]>([]);

const assetListParams = ref<AssetListParams>({
	assessmentCurrencyId: '',
	statement: '',
	pageNumber: '1',
	pageSize: '20',
	assetType: useEnv('assetType'),
	boxMode: String(BoxMode.Spot),
	miniAssetMode: String(MiniAssetMode.Any),
});
const assetList = ref<Asset[]>([]);
const assetListLoading = ref<boolean>(true);
const getAssetList = async () => {
	try {
		assetListLoading.value = true;
		const { result } = await assetRepo.getAssetList(assetListParams.value);

		assetList.value = await worker.addCurrencyToAsset(
			useEnv('apiBaseUrl'),
			(result.rows as Asset[]).filter((item) => parseFloat(item.aAvailable) > 0),
		);

		if (socketMarketIds.value.length) {
			await publicSocketStore.removeMarketIds(socketMarketIds.value);
		}

		socketMarketIds.value = assetList.value
			.map((item) => item.markets?.find((m) => m.mSymbol.includes('USDT'))?.id)
			.filter((id): id is number => id !== undefined);

		await publicSocketStore.addMarketIds(socketMarketIds.value);

		console.log(assetList.value);

		assetListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		assetListLoading.value = false;
	}
};

watch(
	() => publicSocketStore.latestMarketData,
	(newData) => {
		if (newData) {
			newData.forEach((updatedMarket) => {
				const marketId = updatedMarket.data.mi;

				assetList.value.forEach((item, index) => {
					const findMarket = assetList.value[index].markets?.find((market) => market.id === marketId);
					if (findMarket) {
						assetList.value[index].percentage = updatedMarket.data.p;
						assetList.value[index].price = updatedMarket.data.i;
					}
				});
			});
		}
	},
	{ deep: true },
);

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
	await getAssetList();
});

const treemapData = computed(() => {
	return assetList.value.map((asset) => {
		let currentPrice = parseFloat(asset.aAvailable) || 0;

		if (selected.value === 'volume') {
			currentPrice = parseFloat(asset.qAvailable) || 0;
		}
		const color = getColorTreeMapSlice(Number(asset.percentage));

		return {
			name: asset.currency?.cName || 'Unknown',
			id: `asset-${asset.currencyId}`,
			value: [currentPrice, parseFloat(asset.qAvailable)],
			quote: asset.currency?.cSymbol || 'Unknown',
			asset,
			itemStyle: { color },
		};
	});
});

const getColorTreeMapSlice = (percentChange: number) => {
	if (percentChange < -9) return '#FF2211';
	if (percentChange >= -9 && percentChange < -6) return '#BF4045';
	if (percentChange >= -6 && percentChange < -3) return '#8B444E';
	if (percentChange >= -3 && percentChange < 3) return '#4B4B4B';
	if (percentChange >= 3 && percentChange < 6) return '#35764E';
	if (percentChange >= 6 && percentChange < 9) return '#2F9E4F';
	if (percentChange > 9) return '#4CAF50';
	return '#4B4B4B';
};

const treemapOptions = computed(() => ({
	title: { show: false },
	grid: { left: '5%', right: '5%', top: '10%' },
	tooltip: {
		formatter: function (params: any) {
			const isPositive = params.data.asset.percentage > 0;
			const className = isPositive ? 'text-accent-green' : 'text-accent-red';

			return `
					<div class="text-black dark:text-black py-1 text-sm" dir="rtl">
						<div class="flex justify-between mb-1">
							<div class="text-black dark:text-black font-dana">${useT('coin')}</div>
							<div class="text-black dark:text-black font-dana mr-6">
								${params.data.name}
							</div>
						</div>
						<div class="flex items-center justify-between mb-1">
							<div class="text-black dark:text-black font-dana">${useT('available')}</div>
							<div class="text-black dark:text-black flex mr-4 text-xs">
								<span>USDT</span>
								<span class="mr-1 font-dana">
									(${useNumber(priceFormat(String(params.data.asset.aAvailable)))})
								</span>
								<span class="mr-1 font-dana">
									${useNumber(priceFormat(String(params.data.asset.qAvailable)))}
								</span>
							</div>
						</div>
						<div class="flex items-center justify-between mb-1">
							<div class="text-black dark:text-black font-dana">${useT('locked')}</div>
							<div class="text-black dark:text-black flex mr-4 text-xs">
								<span>USDT</span>
								<span class="mr-1 font-dana">
									(${useNumber(priceFormat(String(params.data.asset.aLocked ?? 0)))})
								</span>
								<span class="mr-1 font-dana">
									${useNumber(priceFormat(String(params.data.asset.qLocked ?? 0)))}
								</span>
							</div>
						</div>
						<div class="flex items-center justify-between mb-1">
							<div class="text-black dark:text-black font-dana">${useT('priceInDollar')}</div>
							<div class="text-black dark:text-black flex mr-4 text-xs">
								<span>USDT</span>
								<span class="mr-1 font-dana">
									${useNumber(priceFormat(String(params.data.asset.price ?? 0)))}
								</span>
							</div>
						</div>
						<div class="flex items-center justify-between mb-1">
							<div class="text-black dark:text-black font-dana">${useT('todayChangePercent')}</div>
							<div class="text-black dark:text-black flex mr-4 text-xs" dir="ltr">
								<span class="${className}">${isPositive ? '+' : ''}${useNumber(params.data.asset.percentage)}%</span>
							</div>
						</div>
					</div>
				`;
		},
	},
	series: [{
		name: '',
		type: 'treemap',
		label: {
			show: true,
			fontFamily: 'dana',
			fontWeight: 'bold',
			formatter: function (params: any) {
				return `${params.name} \n\n ${priceFormat(params.value[1])} ${params.data.quote}`;
			},
		},
		itemStyle: { borderColor: '#fff', borderWidth: 0.2 },
		data: treemapData.value,
		visualMin: 0,
		visualDimension: 0,
		zoomToNodeRatio: 0.8,
		nodeClick: false,
		colorMappingBy: 'id',
	}],
}));
</script>
