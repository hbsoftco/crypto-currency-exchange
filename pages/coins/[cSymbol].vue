<template>
	<div class="mt-0 md:mt-24">
		<UContainer v-if="currencyInfoLoading">
			<UiLogoLoading />
		</UContainer>
		<UContainer v-if="!currencyInfoLoading && currencyInfo">
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-12 md:col-span-8">
					<div class="flex justify-between items-center">
						<div class="flex items-center">
							<img
								:src="`https://api-bitland.site/media/currency/${currencyInfo.currency?.cSymbol}.png`"
								:alt="currencyInfo.currency?.cName"
								class="w-7 md:w-10 h-7 md:h-10 rounded-full"
								format="webp"
								@error="handleImageError"
							>
							<h1 class="text-base md:text-xl font-bold mr-1 md:mr-4">
								{{ currencyInfo.currency?.cName }} ({{ currencyInfo.currency?.cSymbol }})
							</h1>
						</div>
						<div v-if="isMobile">
							<span class="text-sm font-normal mx-1">
								<UiChangePrice
									:bg-color="false"
									classes="text-sm font-normal pr-1.5"
									:show-percent="true"
									pl="pl-0.5"
									:change="parseFloat(String(currencyInfo.priceChangePerc24h))"
									:icon="false"
								/>
							</span>
							<span
								class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark"
							>${{ priceFormat(currencyInfo.price) }}</span>
						</div>
					</div>
					<div class="block mb-8 md:mb-24">
						<div>
							<MarketChart
								v-if="currencyInfo.currency && currentMarket?.id && !isMobile"
								:price="currencyInfo.price"
								:price-change-perc7d="currencyInfo.priceChangePerc7d"
								:price-change-perc24h="currencyInfo.priceChangePerc24h"
								:price-change-perc30d="currencyInfo.priceChangePerc30d"
								:price-change-perc60d="currencyInfo.priceChangePerc60d"
								:price-change-perc90d="currencyInfo.priceChangePerc90d"
								:socket-data="publicSocketStore.findMarketDataById(currentMarket?.id)"
								:tick-size="currentMarket.tickSize"
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

							<section v-if="currencyInfo?.faqList.length">
								<div>
									<h1 class="text-base md:text-xl font-bold mt-8 md:my-4 ">
										{{ $t("FAQ") }}
									</h1>
									<FAQItems
										:items="currencyInfo?.faqList"
									/>
								</div>
							</section>
							<!-- FAQ -->
						</div>
					</div>
				</div>
				<div
					v-if="!isMobile"
					class="col-span-12 md:col-span-4"
				>
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
								class="mt-10 md:mt-16 mb-6"
							>
								<h4 class="text-base md:text-xl font-bold mb-6">
									{{ $t(category.category) }}
								</h4>
								<SidebarMarketState
									:markets="category.info ?? []"
								/>
							</section>
						</template>
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
import { priceFormat, handleImageError } from '~/utils/helpers';

const { $mobileDetect, $api } = useNuxtApp();
const currencyRepo = currencyRepository($api);
const marketRepo = marketRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

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
	languageId: String(Language.PERSIAN),
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
	isMobile.value = !!mobileDetect.mobile();

	await getCurrencyInfo();
	await getMarketListL47();

	await publicSocketStore.addMarketIds(socketMarketIds.value);
});

onUnmounted(async () => {
	await publicSocketStore.unSubscribe();
});
</script>
