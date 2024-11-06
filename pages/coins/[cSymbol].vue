<template>
	<div class="mt-24">
		<UContainer v-if="currencyDetailLoading">
			<UiLogoLoading />
		</UContainer>
		<UContainer v-if="!currencyDetailLoading && currencyDetail">
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-8">
					<div class="flex items-center">
						<img
							:src="`https://api-bitland.site/media/currency/${currency?.cSymbol}.png`"
							:alt="currency?.cName"
							class="w-10 h-10 rounded-full"
							format="webp"
						>
						<h1 class="text-base md:text-xl font-bold mr-4">
							{{ currency?.cName }} ({{ currency?.cSymbol }})
						</h1>
					</div>
					<div class="block mb-24">
						<div>
							<MarketChart
								v-if="currency"
								:price="currencyDetail.price"
								:price-change-perc7d="currencyDetail.priceChangePerc7d"
								:price-change-perc24h="currencyDetail.priceChangePerc24h"
								:price-change-perc30d="currencyDetail.priceChangePerc30d"
								:price-change-perc60d="currencyDetail.priceChangePerc60d"
								:price-change-perc90d="currencyDetail.priceChangePerc90d"
								:symbol="cSymbol"
								class="hidden md:block"
							/>
							<!-- Chart -->

							<Headline :headline="currencyDetail?.headline || null" />
							<!-- Headline -->

							<PricePerformanceTable :currency="currencyDetail" />
							<!-- table -->

							<PriceInformation :currency-detail="currencyDetail" />
							<!-- priceInformation -->

							<GlobalMarketInformation :currency-detail="currencyDetail" />
							<!-- globalMarketInformation -->

							<CurrencyDescription :currency-detail="currencyDetail" />
							<!-- Description -->

							<section>
								<div>
									<h1 class="text-xl font-bold mt-8 md:my-4 ">
										{{ $t("FAQ") }}
									</h1>
									<FAQItems
										v-if="currencyDetail?.faqList.length"
										:items="currencyDetail?.faqList"
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
import MarketChart from '~/components/pages/Coins/MarketChart.vue';
import SidebarMarketState from '~/components/pages/Coins/SidebarMarketState.vue';
import FAQItems from '~/components/ui/FAQItems.vue';
import Calculator from '~/components/ui/Calculator.vue';
import { currencyRepository } from '~/repositories/currency.repository';
import { marketRepository } from '~/repositories/market.repository';
import { Language } from '~/utils/enums/language.enum';
import type { GetCurrencyParams } from '~/types/base.types';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';
import Headline from '~/components/pages/Coins/Headline.vue';
import PricePerformanceTable from '~/components/pages/Coins/PricePerformanceTable.vue';
import type { Currency } from '~/types/response/currency.types';
import PriceInformation from '~/components/pages/Coins/PriceInformation.vue';
import GlobalMarketInformation from '~/components/pages/Coins/GlobalMarketInformation.vue';
import CurrencyDescription from '~/components/pages/Coins/CurrencyDescription.vue';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { MarketState } from '~/types/definitions/market.types';
import SidebarMarketStateSkeleton from '~/components/pages/Coins/SidebarMarketStateSkeleton.vue';

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

onMounted(async () => {
	await Promise.all([
		getCurrencyDetail(),
		getMostProfitableMarkets(),
		getMostVoluminousMarkets(),
		getHottestMarkets(),
		getLatestMarkets(),
	]);
});
/// /// Old

const baseDataStore = useBaseDataStore();
await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);

const currencyDetail = ref<Currency>();
const currency = ref<CurrencyBriefItem | null>();

const params = ref<GetCurrencyParams>({
	id: '',
	languageId: String(Language.ENGLISH),
});
const currencyDetailLoading = ref<boolean>(false);
const getCurrencyDetail = async () => {
	try {
		currencyDetailLoading.value = true;

		currency.value = await baseDataStore.findCurrencyBycSymbol(cSymbol);
		if (currency.value) {
			params.value.id = String(currency.value.id);
		}

		const { result } = await currencyRepo.getCurrencyDetail(params.value);
		currencyDetail.value = result;

		currencyDetailLoading.value = false;
	}
	catch (error) {
		console.log(error);

		currencyDetailLoading.value = false;
	}
};
</script>
