<template>
	<div class="mt-20 md:mt-24">
		<UContainer v-if="currencyInfoLoading">
			<UiLogoLoading />
		</UContainer>
		<UContainer v-if="!currencyInfoLoading && currencyInfo">
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-12 md:col-span-8">
					<div class="flex items-center">
						<img
							:src="`https://api-bitland.site/media/currency/${currencyInfo.currency?.cSymbol}.png`"
							:alt="currencyInfo.currency?.cName"
							class="w-10 h-10 rounded-full"
							format="webp"
						>
						<h1 class="text-base md:text-xl font-bold mr-4">
							{{ currencyInfo.currency?.cName }} ({{ currencyInfo.currency?.cSymbol }})
						</h1>
					</div>
					<div class="block mb-24">
						<div>
							<MarketChart
								v-if="currencyInfo.currency && currentMarket?.id"
								:price="currencyInfo.price"
								:price-change-perc7d="currencyInfo.priceChangePerc7d"
								:price-change-perc24h="currencyInfo.priceChangePerc24h"
								:price-change-perc30d="currencyInfo.priceChangePerc30d"
								:price-change-perc60d="currencyInfo.priceChangePerc60d"
								:price-change-perc90d="currencyInfo.priceChangePerc90d"
								:socket-data="publicSocketStore.findMarketDataById(currentMarket?.id)"
								:symbol="cSymbol"
								:markets="markets"
							/>
							<!-- Chart -->

							<Headline :headline="currencyInfo?.headline || null" />
							<!-- Headline -->

							<PricePerformanceTable
								v-if="currentMarket?.id"
								:currency="currencyInfo"
								:tick-size="currentMarket.tickSize"
								:socket-data="publicSocketStore.findMarketDataById(currentMarket?.id)"
							/>
							<!-- table -->

							<PriceInformation :currency-detail="currencyInfo" />
							<!-- priceInformation -->

							<GlobalMarketInformation :currency-detail="currencyInfo" />
							<!-- globalMarketInformation -->

							<CurrencyDescription :currency-detail="currencyInfo" />
							<!-- Description -->

							<section>
								<div>
									<h1 class="text-xl font-bold mt-8 md:my-4 ">
										{{ $t("FAQ") }}
									</h1>
									<FAQItems
										v-if="currencyInfo?.faqList.length"
										:items="currencyInfo?.faqList"
										:direction="false"
									/>
								</div>
							</section>
							<!-- FAQ -->
						</div>
					</div>
				</div>
				<div class="col-span-12 md:col-span-4">
					<div class="px-3">
						<section>
							<Calculator />
						</section>

						<template v-if="marketsL47Loading">
							<section>
								<SidebarMarketStateSkeleton />
							</section>
						</template>
						<template v-else>
							<section
								v-for="category in marketsL47"
								:key="category.category"
								class="mt-16 mb-6"
							>
								<h4 class="text-xl font-bold mb-6">
									{{ $t(category.category) }}
								</h4>
								<SidebarMarketState
									:markets="category.info ?? []"
								/>
							</section>
						</template>

						<!-- <section v-if="hottestMarketsLoading">
							<SidebarMarketStateSkeleton />
						</section>
						<section
							v-else
							class="mt-16 mb-6"
						>
							<h4 class="text-xl font-bold mb-6">
								{{ $t("hotTopics") }}
							</h4>
							<SidebarMarketState
								:markets="hottestMarkets ?? []"
							/>
						</section>

						<section v-if="mostProfitableMarketsLoading">
							<SidebarMarketStateSkeleton />
						</section>
						<section
							v-else
							class="mt-16 mb-6"
						>
							<h4 class="text-xl font-bold mb-6">
								{{ $t("mostProfitable") }}
							</h4>
							<SidebarMarketState
								:markets="mostProfitableMarkets ?? []"
							/>
						</section>

						<section v-if="mostVoluminousMarketsLoading">
							<SidebarMarketStateSkeleton />
						</section>
						<section
							v-else
							class="mt-16 mb-6"
						>
							<h4 class="text-xl font-bold mb-6">
								{{ $t("mostVoluminous") }}
							</h4>
							<SidebarMarketState
								:markets="mostVoluminousMarkets ?? []"
							/>
						</section>

						<section v-if="latestMarketsLoading">
							<SidebarMarketStateSkeleton />
						</section>
						<section
							v-else
							class="mt-16 mb-6"
						>
							<h4 class="text-xl font-bold mb-6">
								{{ $t("newArrivals") }}
							</h4>
							<SidebarMarketState
								:markets="latestMarkets ?? []"
							/>
						</section> -->
					</div>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import SidebarMarketStateSkeleton from '~/components/pages/Coins/SidebarMarketStateSkeleton.vue';
import GlobalMarketInformation from '~/components/pages/Coins/GlobalMarketInformation.vue';
import PricePerformanceTable from '~/components/pages/Coins/PricePerformanceTable.vue';
import CurrencyDescription from '~/components/pages/Coins/CurrencyDescription.vue';
import SidebarMarketState from '~/components/pages/Coins/SidebarMarketState.vue';
import PriceInformation from '~/components/pages/Coins/PriceInformation.vue';
import MarketChart from '~/components/pages/Coins/MarketChart.vue';
import Headline from '~/components/pages/Coins/Headline.vue';
import Calculator from '~/components/ui/Calculator.vue';
import FAQItems from '~/components/ui/FAQItems.vue';
import { currencyRepository } from '~/repositories/currency.repository';
import { marketRepository } from '~/repositories/market.repository';
import { Language } from '~/utils/enums/language.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { MarketBrief, MarketL47, MarketsL47Params } from '~/types/definitions/market.types';
import type { Currency, CurrencyBrief, CurrencyInfoParams } from '~/types/definitions/currency.types';
import { MarketType } from '~/utils/enums/market.enum';

const { $api } = useNuxtApp();
const currencyRepo = currencyRepository($api);
const marketRepo = marketRepository($api);

const publicSocketStore = usePublicSocketStore();

const worker = useBaseWorker();

const route = useRoute();
const cSymbol = String(route.params.cSymbol);

const socketMarketIds = ref<number[]>([]);

const marketsL47Params = ref<MarketsL47Params>({
	marketTypeId: String(MarketType.SPOT),
	rowCount: '4',
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

const currentMarket = ref<MarketBrief>();
const params = ref<CurrencyInfoParams>({
	id: '',
	languageId: String(Language.ENGLISH),
});
const currency = ref<CurrencyBrief | null>(null);
const markets = ref<MarketBrief[] | []>([]);
const currencyInfo = ref<Currency>();
const currencyInfoLoading = ref<boolean>(false);
const getCurrencyInfo = async () => {
	try {
		currencyInfoLoading.value = true;
		currency.value = await worker.findCurrencyBycSymbol(cSymbol, useEnv('apiBaseUrl'));
		if (currency.value) {
			markets.value = await worker.findMarketsByCurrencyId(useEnv('apiBaseUrl'), currency.value.id);
			params.value.id = String(currency.value.id);
		}
		const { result } = await currencyRepo.getCurrencyInfo(params.value);

		const findMarket = await worker.searchMarkets(useEnv('apiBaseUrl'), `${currency.value?.cSymbol}USDT`, 1);
		currentMarket.value = findMarket[0];
		console.log(currentMarket.value);

		publicSocketStore.addMarketIds([findMarket[0].id]);

		currencyInfo.value = result;
		currencyInfo.value.currency = currency.value;
		currencyInfoLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

onMounted(async () => {
	await Promise.all([
		getCurrencyInfo(),
		getMarketListL47(),
	]);

	await publicSocketStore.addMarketIds(socketMarketIds.value);
});

onUnmounted(async () => {
	await publicSocketStore.unSubscribe();
});
</script>
