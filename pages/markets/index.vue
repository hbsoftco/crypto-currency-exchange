<template>
	<div>
		<UContainer>
			<div class="hidden md:flex justify-between my-6 ">
				<h1 class="text-base font-bold">
					{{ $t("tradingMarkets") }}
				</h1>
				<div class="flex">
					<div class="flex ml-10">
						<NuxtImg
							src="/images/svg/market/new.png"
							alt="new-currencies"
							class="w-9 h-6"
						/>
						<ULink to="/markets/new-currencies">
							<div>
								<span class="text-sm font-normal mr-2">{{
									$t("currenciesWayBitland")
								}}</span>
							</div>
						</ULink>
					</div>
					<div class="flex">
						<NuxtImg
							src="/images/svg/market/chart.png"
							alt="chart-statistics"
							class="w-5 h-5"
						/>
						<ULink to="/markets/market-statistics">
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
					v-if="mostProfitableMarketsPending || latestMarketsPending || hottestMarketsPending"
					class="flex justify-center items-center h-64"
				>
					<p>{{ $t('isLoading') }} ...</p>
				</div>
				<div
					v-else
					class="hidden md:flex justify-between"
				>
					<MarketState
						:title="$t('mostProfitableAssets')"
						:items="mostProfitableMarkets ?? []"
					/>

					<MarketState
						:title="$t('hotTopics')"
						:items="hottestMarkets ?? []"
					/>

					<MarketState
						:title="$t('newest')"
						:items="latestMarkets ?? []"
					/>
				</div>
			</div>
			<div class="relative mt-14 md:mt-8">
				<UTabs :items="items">
					<template #default="{ item, selected }">
						<span
							class="truncate"
							:class="[selected && 'text-black dark:text-white']"
						>{{ $t(item.label) }}</span>
					</template>
					<template #item="{ item }">
						<div
							v-if="item.key === 'marketSpot'"
							class="space-y-3"
						>
							<MarketTable :search-query="searchQuery" />
						</div>
						<div
							v-else-if="item.key === 'marketFutures'"
							class="space-y-3"
						>
							<p>eee</p>
						</div>
					</template>
				</UTabs>
				<div class="w-72 h-10 hidden md:block absolute left-0 top-0 py-2 px-3 border border-primary-gray-light dark:border-primary-gray-dark rounded-lg">
					<div class="w-full h-full relative">
						<input
							v-model="searchQuery"
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
					<NuxtImg
						src="/images/svg/market/chart.png"
						alt="chart"
						class="w-5 h-5 mt-3"
					/>
				</ULink>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import MarketState from '~/components/pages/Site/Market/MarketState.vue';
import IconSearch from '~/assets/svg-icons/menu/search.svg';
import MarketTable from '~/components/pages/Site/Market/MarketTable.vue';
import { marketRepository } from '~/repositories/market.repository';
import { Language } from '~/utils/enums/language.enum';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const searchQuery = ref('');

const { useCachedCurrencyBriefList, useCachedMarketBriefList } = useCachedData();

const { data: cachedCurrencyBriefList } = await useCachedCurrencyBriefList({ languageId: Language.PERSIAN });
const { data: cachedMarketBriefList } = await useCachedMarketBriefList();

const currencyBriefList = cachedCurrencyBriefList.value ?? [];
const marketBriefList = cachedMarketBriefList.value ?? [];

const { data: mostProfitableMarkets, pending: mostProfitableMarketsPending } = useAsyncData(
	'mostProfitableMarkets',
	async () => {
		const response = await marketRepo.getMostProfitableMarkets({ rowCount: 3 });
		return useProcessMarketData(response.result.rows, marketBriefList, currencyBriefList);
	},
);

const { data: hottestMarkets, pending: hottestMarketsPending } = useAsyncData(
	'hottestMarkets',
	async () => {
		const response = await marketRepo.getHottestMarkets({ rowCount: 3 });
		return useProcessMarketData(response.result.rows, marketBriefList, currencyBriefList);
	},
);

const { data: latestMarkets, pending: latestMarketsPending } = useAsyncData(
	'latestMarkets',
	async () => {
		const response = await marketRepo.getLatestMarkets({ rowCount: 3 });
		return useProcessMarketData(response.result.rows, marketBriefList, currencyBriefList);
	},
);

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
