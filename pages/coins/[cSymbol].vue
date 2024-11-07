<template>
	<div class="mt-24">
		<UContainer v-if="currencyInfoLoading">
			<UiLogoLoading />
		</UContainer>
		<UContainer v-if="!currencyInfoLoading && currencyInfo">
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-8">
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
								v-if="currencyInfo.currency"
								:price="currencyInfo.price"
								:price-change-perc7d="currencyInfo.priceChangePerc7d"
								:price-change-perc24h="currencyInfo.priceChangePerc24h"
								:price-change-perc30d="currencyInfo.priceChangePerc30d"
								:price-change-perc60d="currencyInfo.priceChangePerc60d"
								:price-change-perc90d="currencyInfo.priceChangePerc90d"
								:symbol="cSymbol"
								:markets="markets"
								class="hidden md:block"
							/>
							<!-- Chart -->

							<Headline :headline="currencyInfo?.headline || null" />
							<!-- Headline -->

							<PricePerformanceTable :currency="currencyInfo" />
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
				<div class="col-span-4">
					<div class="hidden md:block px-3">
						<section>
							<Calculator />
						</section>
						<section v-if="hottestMarketsLoading">
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
						</section>
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
import type { MarketBrief, MarketState } from '~/types/definitions/market.types';
import type { Currency, CurrencyBrief, CurrencyInfoParams } from '~/types/definitions/currency.types';

const { $api } = useNuxtApp();
const currencyRepo = currencyRepository($api);
const marketRepo = marketRepository($api);

const worker = useBaseWorker();

const route = useRoute();
const cSymbol = String(route.params.cSymbol);

const mostProfitableMarkets = ref<MarketState[]>([]);
const mostProfitableMarketsLoading = ref<boolean>(false);
const getMostProfitableMarkets = async () => {
	try {
		mostProfitableMarketsLoading.value = true;
		const { result } = await marketRepo.getMostProfitableMarkets({ rowCount: '4' });

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
		const { result } = await marketRepo.getHottestMarkets({ rowCount: '4' });

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
		const { result } = await marketRepo.getLatestMarkets({ rowCount: '4' });

		latestMarkets.value = await worker.addCurrencyToMarketStates(useEnv('apiBaseUrl'), result.rows);
		latestMarketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

const mostVoluminousMarkets = ref<MarketState[]>([]);
const mostVoluminousMarketsLoading = ref<boolean>(false);
const getMostVoluminousMarkets = async () => {
	try {
		mostVoluminousMarketsLoading.value = true;
		const { result } = await marketRepo.getMostVoluminous({ rowCount: '4' });

		mostVoluminousMarkets.value = await worker.addCurrencyToMarketStates(useEnv('apiBaseUrl'), result.rows);
		mostVoluminousMarketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

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
		getMostProfitableMarkets(),
		getMostVoluminousMarkets(),
		getHottestMarkets(),
		getLatestMarkets(),
		getCurrencyInfo(),
	]);
});
</script>
