<template>
	<div>
		<UContainer>
			<div class="hidden md:flex justify-between my-6 ">
				<h1 class="text-base font-bold">
					{{ $t("tradingMarkets") }}
				</h1>
				<div class="flex">
					<div class="flex ml-10">
						<img
							src="/images/svg/market/new.png"
							alt="new-currencies"
							class="w-9 h-6"
						>
						<ULink to="/markets/upcoming">
							<div>
								<span class="text-sm font-normal mr-2">{{
									$t("currenciesWayBitland")
								}}</span>
							</div>
						</ULink>
					</div>
					<div class="flex">
						<img
							src="/images/svg/market/chart.png"
							alt="chart-statistics"
							class="w-5 h-5"
						>
						<ULink to="/markets/statistics">
							<div>
								<span class="text-sm font-normal mr-2">{{
									$t("marketStatisticalInformation")
								}}</span>
							</div>
						</ULink>
					</div>
				</div>
			</div>

			<div>
				<div
					class="hidden md:flex justify-between"
				>
					<div v-if="mostProfitableMarketsLoading">
						<MarketStateSkeleton />
					</div>
					<TopMarketState
						v-else
						:sort-mode="SortMode.BY_MOST_PROFIT"
						:title="$t('mostProfitableAssets')"
						:items="mostProfitableMarkets ?? []"
					/>

					<div v-if="hottestMarketsLoading">
						<MarketStateSkeleton />
					</div>
					<TopMarketState
						v-else
						:sort-mode="SortMode.BY_RECENTLY_CHANGED"
						:title="$t('hotTopics')"
						:items="hottestMarkets ?? []"
					/>

					<div v-if="latestMarketsLoading">
						<MarketStateSkeleton />
					</div>
					<TopMarketState
						v-else
						:sort-mode="SortMode.BY_NEWEST_COINS"
						:title="$t('newest')"
						:items="latestMarkets ?? []"
					/>
				</div>
			</div>
			<!-- Market box -->

			<div class="relative mt-14 md:mt-8">
				<UTabs :items="items">
					<template #default="{ item, selected }">
						<span
							class="truncate"
							:class="[selected && 'text-primary-yellow-light dark:text-primary-yellow-dark']"
						>{{ $t(item.label) }}</span>
					</template>
					<template #item="{ item }">
						<div
							v-if="item.key === 'marketSpot'"
							class="space-y-3"
						>
							<MarketTable
								v-if="!initFilterLoading"
								:search-query="searchQuery"
							/>
						</div>
						<div
							v-else-if="item.key === 'marketFutures'"
							class="space-y-3"
						>
							<p>Futures</p>
						</div>
					</template>
				</UTabs>
				<div class="w-72 h-10 hidden md:block absolute left-0 top-0 py-2 px-3 border border-primary-gray-light dark:border-primary-gray-dark rounded-lg">
					<div class="w-full h-full relative">
						<input
							v-model="search"
							type="text"
							class="outline-none h-full w-full text-sm"
							:placeholder="$t('searchMarket')"
						>
						<IconSearch class="absolute left-1 top-1 text-subtle-text-light dark:text-subtle-text-dark cursor-pointer" />
					</div>
				</div>
				<ULink
					to=""
					class="block absolute left-0 top-0 md:hidden"
				>
					<img
						src="/images/svg/market/chart.png"
						alt="chart"
						class="w-5 h-5 mt-3"
					>
				</ULink>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import TopMarketState from '~/components/pages/Market/TopMarketState.vue';
import IconSearch from '~/assets/svg-icons/menu/search.svg';
import MarketTable from '~/components/pages/Market/MarketTable.vue';
import { marketRepository } from '~/repositories/market.repository';
import MarketStateSkeleton from '~/components/pages/Market/MarketStateSkeleton.vue';
import type { MarketState } from '~/types/definitions/market.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { MarketType, SortMode } from '~/utils/enums/market.enum';
import { Language } from '~/utils/enums/language.enum';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const marketsPageStore = useMarketsPageStore();

const worker = useBaseWorker();

const marketTypeId = ref<number>(MarketType.SPOT);

const search = ref<string>('');
const searchQuery = ref<string>('');

watch(search, (newValue) => {
	if (searchTimeout) {
		clearTimeout(searchTimeout);
	}

	if (newValue) {
		searchTimeout = setTimeout(async () => {
			searchQuery.value = newValue;
		}, 2000);
	}
	else {
		searchQuery.value = newValue;
	}
});

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const mostProfitableMarkets = ref<MarketState[]>([]);
const mostProfitableMarketsLoading = ref<boolean>(false);
const getMostProfitableMarkets = async () => {
	try {
		mostProfitableMarketsLoading.value = true;
		const { result } = await marketRepo.getMostProfitableMarkets({ rowCount: '3' });

		mostProfitableMarkets.value = await worker.addCurrencyToMarketStates(useEnv('apiBaseUrl'), result.rows);
		mostProfitableMarketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

const hottestMarkets = ref<MarketState[]>([]);
const hottestMarketsLoading = ref<boolean>(false);
const getHottestMarkets = async () => {
	try {
		hottestMarketsLoading.value = true;
		const { result } = await marketRepo.getHottestMarkets({ rowCount: '3' });

		hottestMarkets.value = await worker.addCurrencyToMarketStates(useEnv('apiBaseUrl'), result.rows);
		hottestMarketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

const latestMarkets = ref<MarketState[]>([]);
const latestMarketsLoading = ref<boolean>(false);
const getLatestMarkets = async () => {
	try {
		latestMarketsLoading.value = true;
		const { result } = await marketRepo.getLatestMarkets({ rowCount: '3' });

		latestMarkets.value = await worker.addCurrencyToMarketStates(useEnv('apiBaseUrl'), result.rows);
		latestMarketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

const initFilterLoading = ref<boolean>(false);
const initFilterItems = async () => {
	initFilterLoading.value = true;
	marketsPageStore.quoteItems = await worker.fetchQuoteItems(marketTypeId.value, useEnv('apiBaseUrl'));
	marketsPageStore.tagItems = await worker.fetchTagItems(Language.PERSIAN, useEnv('apiBaseUrl'));

	marketsPageStore.initQuoteOptions();
	initFilterLoading.value = false;
};

onMounted(async () => {
	await Promise.all([
		initFilterItems(),
		getMostProfitableMarkets(),
		getHottestMarkets(),
		getLatestMarkets(),
	]);
});

const items = [
	{
		key: 'marketSpot',
		label: 'marketSpot',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'marketFutures',
		label: 'marketFutures',
		content: 'And, this is the content for Tab2',
	},
];
</script>
