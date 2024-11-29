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
							src="/images/svg/market/chart.svg"
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
				<div class="hidden md:flex justify-between">
					<div v-if="marketsL47Loading">
						<MarketStateSkeleton />
					</div>
					<TopMarketState
						v-else
						:sort-mode="SortMode.BY_MOST_PROFIT"
						:title="$t('mostProfitableAssets')"
						:items="mostProfitableMarkets ?? []"
					/>

					<div v-if="marketsL47Loading">
						<MarketStateSkeleton />
					</div>
					<TopMarketState
						v-else
						:sort-mode="SortMode.BY_RECENTLY_CHANGED"
						:title="$t('hotTopics')"
						:items="hottestMarkets ?? []"
					/>

					<div v-if="marketsL47Loading">
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

			<div class="relative mt-0 md:mt-8">
				<UTabs :items="items">
					<template #default="{ item, selected }">
						<span
							class="truncate"
							:class="[selected && 'text-primary-yellow-light dark:text-primary-yellow-dark']"
						>{{
							$t(item.label) }}</span>
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
							<FuturesMarketTable
								v-if="!initFilterLoading"
								:search-query="searchQuery"
							/>
						</div>
					</template>
				</UTabs>
				<div
					class="w-72 h-10 hidden md:block absolute left-0 top-0 py-2 px-3 border border-primary-gray-light dark:border-primary-gray-dark rounded-lg"
				>
					<div class="w-full h-full relative">
						<input
							v-model="search"
							type="text"
							class="outline-none h-full w-full text-sm"
							:placeholder="$t('searchMarket')"
						>
						<IconSearch
							class="absolute left-1 top-1 text-subtle-text-light dark:text-subtle-text-dark cursor-pointer"
						/>
					</div>
				</div>
				<ULink
					to="/markets/statistics"
					class="block absolute left-0 top-0 md:hidden"
				>
					<img
						src="/images/svg/market/chart.svg"
						alt="chart"
						class="w-7 h-7 mt-2"
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
import type { MarketL47, MarketL47Item, MarketsL47Params } from '~/types/definitions/market.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { MarketType, SortMode } from '~/utils/enums/market.enum';
import { Language } from '~/utils/enums/language.enum';

const FuturesMarketTable = defineAsyncComponent(() => import('~/components/pages/Market/FuturesMarketTable.vue'));

const { $mobileDetect, $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const marketsPageStore = useMarketsPageStore();
const publicSocketStore = usePublicSocketStore();

const worker = useBaseWorker();

const route = useRoute();

const search = ref<string>('');
const searchQuery = ref<string>('');
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

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

const mostProfitableMarkets = ref<MarketL47Item[]>([]);
const hottestMarkets = ref<MarketL47Item[]>([]);
const latestMarkets = ref<MarketL47Item[]>([]);

const socketMarketIds = ref<number[]>([]);

const marketsL47Params = ref<MarketsL47Params>({
	marketTypeId: String(MarketType.SPOT),
	rowCount: '3',
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

		marketsL47.value.map((category) => {
			if (category.category === 'MostProfitable') {
				mostProfitableMarkets.value = category.info;
			}
			else if (category.category === 'Hottest') {
				hottestMarkets.value = category.info;
			}
			else if (category.category === 'Newest') {
				latestMarkets.value = category.info;
			}
		});

		marketsL47Loading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

const initFilterLoading = ref<boolean>(true);
const initFilterItems = async () => {
	initFilterLoading.value = true;
	marketsPageStore.quoteItems = await worker.fetchQuoteItems(MarketType.SPOT, useEnv('apiBaseUrl'));
	marketsPageStore.tagItems = await worker.fetchTagItems(Language.PERSIAN, useEnv('apiBaseUrl'));
	marketsPageStore.futuresQuoteItems = await worker.fetchQuoteItems(MarketType.FUTURES, useEnv('apiBaseUrl'));

	marketsPageStore.initQuoteOptions();
	marketsPageStore.initFuturesQuoteOptions();
	initFilterLoading.value = false;
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	items.value = [
		{
			key: 'marketSpot',
			label: !isMobile.value ? 'marketSpot' : 'spot',
			content: 'This is the content shown for Tab1',
		},
		{
			key: 'marketFutures',
			label: !isMobile.value ? 'marketFutures' : 'futures',
			content: 'And, this is the content for Tab2',
		},
	];

	const query = ref<string | undefined>(route.query.query as string || '');

	if (query.value) {
		search.value = query.value;
	}
	await Promise.all([
		initFilterItems(),
		getMarketListL47(),
	]);

	await publicSocketStore.addMarketIds(socketMarketIds.value);
});

onUnmounted(async () => {
	await publicSocketStore.unSubscribe();
});

const items = ref();
</script>
