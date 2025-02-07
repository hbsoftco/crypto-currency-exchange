<template>
	<div class="mb-20">
		<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
			<p class="text-lg font-extrabold text-subtle-text-light dark:text-subtle-text-dark">
				{{ $t('pnlTable') }}
			</p>
		</div>
		<div class="relative">
			<UTabs
				v-model="tabItem"
				:items="items"
				dir="rtl"
				class="text-right"
				:ui="{
					container: 'mt-0',
					list: {
						padding: 'pl-4 pt-4',
						tab: {
							size: 'text-base font-bold',
							padding: 'px-2',
						},
					},
				}"
				@change="checkItem($event)"
			>
				<template #default="{ item, selected }">
					<span
						class="truncate"
						:class="[selected && 'text-primary-500 dark:text-primary-400']"
					>{{ $t(item.label) }}</span>
				</template>
				<template #item="{ item }">
					<div class="p-2">
						<div
							v-if="item.key === 'active'"
							class="pt-6"
						>
							<PnlTable :items="assetSpotPnlActiveList" />
						</div>
						<div
							v-else-if="item.key === 'history'"
							class="pt-6"
						>
							<PnlTable :items="assetSpotPnlHistoryList" />
						</div>
						<div
							v-else-if="item.key === 'latest'"
							class="pt-6"
						>
							<PnlTable :items="assetSpotPnlLatestList" />
						</div>
					</div>
				</template>
			</UTabs>
			<div class="absolute left-0 top-4">
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
		</div>
	</div>
</template>

<script setup lang="ts">
import { assetRepository } from '~/repositories/asset.repository';
import type { AssetSpotPnlListParams, Portfolio } from '~/types/definitions/asset.types';
import type { KeyValue } from '~/types/definitions/common.types';
import { PnlFilterMode, PnlSortMode } from '~/utils/enums/asset.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import PnlTable from '~/components/pages/Assets/Analysis/Spot/PnlTable.vue';

const { $api } = useNuxtApp();
const assetRepo = assetRepository($api);

const worker = useBaseWorker();

const params = ref<AssetSpotPnlListParams>({
	pnlCourseId: '2',
	sortMode: PnlSortMode.None,
	from: '',
	to: '',
	filterMode: PnlFilterMode.Open,
	pageNumber: '1',
	pageSize: '20',
});
const assetSpotPnlListLoading = ref<boolean>(true);
const assetSpotPnlList = ref<Portfolio[]>([]);
const assetSpotPnlActiveList = ref<Portfolio[]>([]);
const assetSpotPnlHistoryList = ref<Portfolio[]>([]);
const assetSpotPnlLatestList = ref<Portfolio[]>([]);
const getAssetSpotPnlList = async () => {
	try {
		assetSpotPnlListLoading.value = true;
		const { result } = await assetRepo.getAssetSpotPnlList(params.value);
		assetSpotPnlList.value = await worker.addCurrencyToPortfolio(
			useEnv('apiBaseUrl'),
			result.rows as Portfolio[],
		);

		if (params.value.filterMode === PnlFilterMode.Open) {
			assetSpotPnlActiveList.value = assetSpotPnlList.value;
		}
		else if (params.value.filterMode === PnlFilterMode.Finished) {
			assetSpotPnlHistoryList.value = assetSpotPnlList.value;
		}
		else {
			assetSpotPnlLatestList.value = assetSpotPnlList.value;
		}
		console.log(assetSpotPnlList.value);

		assetSpotPnlListLoading.value = false;
	}
	catch (error) {
		console.log(error);
	}
};

onMounted(async () => {
	await getAssetSpotPnlList();
});

const items = [
	{
		key: 'active',
		label: 'active',
		content: '',
	},
	{
		key: 'history',
		label: 'history',
		content: '',
	},
	{
		key: 'latest',
		label: 'latest',
		content: '',
	},
];

const typeItems = ref<KeyValue[]>([
	{ key: PnlSortMode.None, value: useT('allAssets') },
	{ key: PnlSortMode.MostWorthless, value: useT('mostWorthless') },
	{ key: PnlSortMode.MostBeneficial, value: useT('mostBeneficial') },
	{ key: PnlSortMode.HighestIncome, value: useT('highestIncome2') },
	{ key: PnlSortMode.MostExpensive, value: useT('mostExpensive') },
]);

const selectedType = ref(typeItems.value[0].value);

watch(() => selectedType.value, async (newValue) => {
	if (newValue) {
		params.value.sortMode = newValue.key;

		await Promise.all([
			getAssetSpotPnlList(),
		]);
	}
});

const tabItem = ref();
const checkItem = async (event: any) => {
	if (event === 0) {
		params.value.filterMode = PnlFilterMode.Open;
	}
	else if (event === 1) {
		params.value.filterMode = PnlFilterMode.Finished;
	}
	else {
		params.value.filterMode = PnlFilterMode.Latest;
	}

	await getAssetSpotPnlList();
};
</script>
