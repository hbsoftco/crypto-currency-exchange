<template>
	<div class="mt-24">
		<UContainer v-if="status === 'success'">
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-8">
					<div class="flex items-center">
						<NuxtImg
							:src="`https://api-bitland.site/media/currency/${currency?.symbol}.png`"
							:alt="currency?.marketBriefItem?.currencyBriefItem?.cName"
							class="w-10 h-10 rounded-full"
							format="webp"
						/>
						<h1 class="text-base md:text-xl font-bold mr-4">
							{{ currency?.marketBriefItem?.currencyBriefItem?.cName }} ({{ currency?.symbol }})
						</h1>
					</div>
					<div class="block mb-24">
						<div>
							<MarketChart
								v-if="currency"
								:price="currency.price"
								:price-change-perc7d="currency.priceChangePerc7d"
								:price-change-perc24h="currency.priceChangePerc24h"
								:price-change-perc30d="currency.priceChangePerc30d"
								:price-change-perc60d="currency.priceChangePerc60d"
								:price-change-perc90d="currency.priceChangePerc90d"
								:symbol="symbol"
								:quote="quote"
								class="hidden md:block"
							/>

							<section class="my-8 md:pt-12 md:pb-2">
								<h1 class="text-xl font-bold">
									{{ $t("liveInstantPriceInformation") }}
								</h1>
								<p
									class="text-base font-medium mt-4 text-subtle-text-light dark:text-subtle-text-50"
									dir="ltr"
								>
									{{ currency?.headline }}
								</p>
							</section>
							<!-- Chart and title -->

							<section
								class="border border-primary-gray-light dark:border-primary-gray-dark py-4 px-8 rounded-md"
							>
								<h1 class="text-xl font-bold mb-2">
									{{ $t("pricePerformanceAgainstDollar") }}
								</h1>
								<table class="w-full">
									<thead
										class="py-4 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
									>
										<tr class="text-right">
											<th class="text-sm font-bold py-2">
												{{ $t("course") }}
											</th>
											<th class="text-sm font-bold py-2">
												{{ $t("changeUSD") }}
											</th>
											<th class="text-sm font-bold py-2">
												{{ $t("changePercent") }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr
											class="py-8 text-right border-b-primary-gray-light dark:border-b-primary-gray-dark border-b hover:bg-hover-light dark:hover:bg-hover-dark"
										>
											<td class="text-sm font-normal py-1.5">
												{{ $t("today") }}
											</td>
											<td class=" py-1.5">
												<UiChangePrice
													classes="text-sm font-normal"
													:show-percent="false"
													pre-text="$"
													pl="pl-0"
													:change="parseFloat(String(currency?.priceChangePerc24h))"
													:icon="false"
												/>
											</td>
											<td class=" py-1.5">
												<UiChangePrice
													v-if="currency?.price"
													classes="text-sm font-normal"
													:show-percent="false"
													pl="pl-0"
													:change="changePrice(currency?.price, currency?.priceChangePerc24h)"
													:icon="false"
												/>
											</td>
										</tr>
										<!-- priceChangePerc24h -->
										<tr
											class="py-8 text-right border-b-primary-gray-light dark:border-b-primary-gray-dark border-b hover:bg-hover-light dark:hover:bg-hover-dark"
										>
											<td class="text-sm font-normal py-1.5">
												{{ $t("from30DaysAgo") }}
											</td>
											<td class=" py-1.5">
												<UiChangePrice
													classes="text-sm font-normal"
													:show-percent="false"
													pre-text="$"
													pl="pl-0"
													:change="parseFloat(String(currency?.priceChangePerc30d))"
													:icon="false"
												/>
											</td>
											<td class=" py-1.5">
												<UiChangePrice
													v-if="currency?.price"
													classes="text-sm font-normal"
													:show-percent="false"
													pl="pl-0"
													:change="changePrice(currency?.price, currency?.priceChangePerc30d)"
													:icon="false"
												/>
											</td>
										</tr>
										<!-- priceChangePerc30d -->
										<tr
											class="py-8 text-right border-b-primary-gray-light dark:border-b-primary-gray-dark border-b hover:bg-hover-light dark:hover:bg-hover-dark"
										>
											<td class="text-sm font-normal py-1.5">
												{{ $t("from60DaysAgo") }}
											</td>
											<td class=" py-1.5">
												<UiChangePrice
													classes="text-sm font-normal"
													:show-percent="false"
													pre-text="$"
													pl="pl-0"
													:change="parseFloat(String(currency?.priceChangePerc60d))"
													:icon="false"
												/>
											</td>
											<td class=" py-1.5">
												<UiChangePrice
													v-if="currency?.price"
													classes="text-sm font-normal"
													:show-percent="false"
													pl="pl-0"
													:change="changePrice(currency?.price, currency?.priceChangePerc60d)"
													:icon="false"
												/>
											</td>
										</tr>
										<!-- priceChangePerc60d -->
										<tr class="py-8 text-right hover:bg-hover-light dark:hover:bg-hover-dark">
											<td class="text-sm font-normal py-1.5">
												{{ $t("from90DaysAgo") }}
											</td>
											<td class=" py-1.5">
												<UiChangePrice
													classes="text-sm font-normal"
													:show-percent="false"
													pre-text="$"
													pl="pl-0"
													:change="parseFloat(String(currency?.priceChangePerc90d))"
													:icon="false"
												/>
											</td>
											<td class=" py-1.5">
												<UiChangePrice
													v-if="currency?.price"
													classes="text-sm font-normal"
													:show-percent="false"
													pl="pl-0"
													:change="changePrice(currency?.price, currency?.priceChangePerc90d)"
													:icon="false"
												/>
											</td>
										</tr>
										<!-- priceChangePerc90d -->
									</tbody>
								</table>
								<!-- end of table -->
							</section>
							<!-- table -->

							<section class="my-10">
								<h1 class="text-xl font-bold mb-2 mt-4">
									{{ $t("priceInformation") }}
								</h1>
								<div class="grid grid-cols-2 md:grid-cols-2 gap-4">
									<div>
										<div
											class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
										>
											<span
												class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
											>{{ $t("hours24Lowest") }}</span>
										</div>
										<div class="text-sm font-normal text-black dark:text-white pt-1">
											<span class="mr-1">{{ useNumber(String(currency?.priceLowIn24h)) }} </span>
											<span>USDT</span>
										</div>
									</div>
									<!-- priceLowIn24h -->

									<div>
										<div
											class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
										>
											<span
												class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
											>{{ $t("hours24Highest") }}</span>
										</div>
										<div class="text-sm font-normal text-black dark:text-white pt-1">
											<span class="mr-1">{{ useNumber(String(currency?.priceHighIn24h)) }} </span>
											<span>USDT</span>
										</div>
									</div>
									<!-- priceHighIn24h -->

									<div>
										<div
											class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
										>
											<span
												class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
											>{{ $t("generalHighest") }}</span>
										</div>
										<div class="text-sm font-normal text-black dark:text-white pt-1">
											<span class="mr-1">{{ useNumber(String(currency?.ath)) }} </span>
											<span>USDT</span>
										</div>
									</div>
									<!-- ath -->

									<div>
										<div
											class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b  pb-0.5"
										>
											<span
												class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
											>{{ $t("generalLowest") }}</span>
										</div>
										<div class="text-sm font-normal text-black dark:text-white pt-1">
											<span class="mr-1">{{ useNumber(String(currency?.atl)) }} </span>
											<span>USDT</span>
										</div>
									</div>
									<!-- atl -->
								</div>
							</section>
							<!-- priceInformation -->

							<section class="my-10">
								<h1 class="text-xl font-bold mb-2 mt-4">
									{{ $t("globalMarketInformation") }}
								</h1>
								<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
									<div>
										<div
											class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
										>
											<span
												class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
											>{{ $t("totalMarketValue") }}</span>
										</div>
										<div
											class="text-sm font-normal text-black dark:text-white pt-1"
										>
											<span dir="ltr">
												<span
													v-if="currency?.marketCap"
													class="mr-1"
												>{{ useNumber(formatBigNumber(currency?.marketCap, 3)) }}</span>
												<span>USDT</span>
											</span>
										</div>
									</div>
									<!-- marketCap -->

									<div>
										<div
											class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
										>
											<span
												class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
											>{{ $t("tradingVolume24Hours") }}</span>
										</div>
										<div
											class="text-sm font-normal text-black dark:text-white pt-1"
										>
											<span dir="ltr">
												<span
													v-if="currency?.volume24h"
													class="mr-1"
												>{{ useNumber(formatBigNumber(currency?.volume24h, 3)) }}</span>
												<span>USDT</span>
											</span>
										</div>
									</div>
									<!-- volume24h -->

									<div>
										<div
											class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
										>
											<span
												class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
											>{{ $t("currencyCirculation") }}</span>
										</div>
										<div
											class="text-sm font-normal text-black dark:text-white pt-1"
										>
											<span dir="ltr">
												<span
													v-if="currency?.volume24h"
													class="mr-1"
												>{{ useNumber(formatBigNumber(currency?.circulatingSupply, 3)) }}</span>
												<span>{{ currency?.symbol }}</span>
											</span>
										</div>
									</div>
									<!-- circulatingSupply -->

									<div>
										<div
											class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
										>
											<span
												class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
											>{{ $t("marketDominance") }}</span>
										</div>
										<div class="text-sm font-normal text-black dark:text-white pt-1">
											<span>{{ useNumber(Number(currency?.dominance)) }} </span>
										</div>
									</div>
									<!-- dominance -->

									<div>
										<div
											class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
										>
											<span
												class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
											>{{ $t("marketRank") }}</span>
										</div>
										<div class="text-sm font-normal pt-1">
											<span>{{ useNumber(Number(currency?.rank)) }} </span>
										</div>
									</div>
									<!-- rank -->

									<div>
										<div
											class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
										>
											<span
												class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
											>{{ $t("maxSupply") }}</span>
										</div>
										<div
											class="text-sm font-normal text-black dark:text-white pt-1"
										>
											<span dir="ltr">
												<span
													v-if="currency?.volume24h"
													class="mr-1"
												>{{ useNumber(formatBigNumber(currency?.maxSupply, 3)) }}</span>
												<span>{{ currency?.symbol }}</span>
											</span>
										</div>
									</div>
									<!-- maxSupply -->
								</div>
							</section>
							<!-- globalMarketInformation -->

							<section v-if="currency && currency?.descriptionList.length">
								<div
									v-for="(item, index) in currency?.descriptionList"
									:key="`description-wrap-${item.key ? item.key : 'first'}`"
									:index="index"
									class="my-10"
								>
									<h3
										:key="`description-title-${item.key ? item.key : 'first'}`"
										class="text-base font-bold"
									>
										{{ item.key }}
									</h3>
									<p
										v-if="item.value"
										:key="`description-body-${item.key ? item.key : 'first'}`"
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>
										{{ item.value }}
									</p>
								</div>
								<div
									class="flex items-center justify-center md:hidden"
									@click="toggleShowMore"
								>
									<span>{{ showMore ? $t('showLess') : $t('showMore') }}</span>
									<IconArrowDown />
								</div>
							</section>
							<!-- Description -->

							<section>
								<div>
									<h1 class="text-xl font-bold mt-8 md:my-4 ">
										{{ $t("FAQ") }}
									</h1>
									<FAQItems
										v-if="currency?.faqList.length"
										:items="currency?.faqList"
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
						<section
							v-if="hottestMarketsStatus === 'success'"
							class="mt-16 mb-6"
						>
							<h4 class="text-xl font-bold mb-6">
								{{ $t("hotTopics") }}
							</h4>
							<MarketState
								:items="hottestMarkets ?? []"
							/>
						</section>

						<section
							v-if="mostProfitableMarketsStatus === 'success'"
							class="mt-16"
						>
							<h4 class="text-xl font-bold mb-6">
								{{ $t("mostProfitable") }}
							</h4>
							<MarketState
								:items="mostProfitableMarkets ?? []"
							/>
						</section>

						<section
							v-if="mostVoluminousMarketsStatus === 'success'"
							class="mt-16 mb-6"
						>
							<h4 class="text-xl font-bold mb-6">
								{{ $t("mostVoluminous") }}
							</h4>
							<MarketState
								:items="mostVoluminousMarkets ?? []"
							/>
						</section>

						<section
							v-if="latestMarketsStatus === 'success'"
							class="mt-16 mb-6"
						>
							<h4 class="text-xl font-bold mb-6">
								{{ $t("newArrivals") }}
							</h4>
							<MarketState
								:items="latestMarkets ?? []"
							/>
						</section>
					</div>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import MarketChart from '~/components/pages/Coins/Chart.vue';
import MarketState from '~/components/pages/Coins/MarketState.vue';
import FAQItems from '~/components/ui/FAQItems.vue';
import Calculator from '~/components/ui/Calculator.vue';
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import { currencyRepository } from '~/repositories/currency.repository';
import { marketRepository } from '~/repositories/market.repository';
import { Language } from '~/utils/enums/language.enum';
import type { GetCurrencyParams } from '~/types/base.types';
import { formatBigNumber } from '~/utils/format-big-number';

const { $api } = useNuxtApp();
const currencyRepo = currencyRepository($api);
const marketRepo = marketRepository($api);

const route = useRoute();
const cSymbol = String(route.params.cSymbol);
const [symbol, quote] = cSymbol.split('_');

const baseDataStore = useBaseDataStore();
await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);

const currencyItem = baseDataStore.currencyBriefItems.find((item) => item.cSymbol === symbol);

const params = ref<GetCurrencyParams>({
	id: String(currencyItem?.id),
	languageId: String(Language.ENGLISH),
});

const { data: currency, status } = useAsyncData('currencyDetail', async () => {
	const response = await currencyRepo.getCurrencyDetail(params.value);
	console.log(response.result);

	return response.result;
}, { watch: [params.value], deep: true });

const { useCachedCurrencyBriefList, useCachedMarketBriefList } = useCachedData();

const { data: cachedCurrencyBriefList } = await useCachedCurrencyBriefList({ languageId: Language.PERSIAN });
const { data: cachedMarketBriefList } = await useCachedMarketBriefList();

const currencyBriefList = cachedCurrencyBriefList.value ?? [];
const marketBriefList = cachedMarketBriefList.value ?? [];

const { data: mostProfitableMarkets, status: mostProfitableMarketsStatus } = useAsyncData(
	'mostProfitableMarkets',
	async () => {
		const response = await marketRepo.getMostProfitableMarkets({ rowCount: 4 });
		return useProcessMarketData(response.result.rows, marketBriefList, currencyBriefList);
	},
);

const { data: mostVoluminousMarkets, status: mostVoluminousMarketsStatus } = useAsyncData(
	'mostVoluminousMarkets',
	async () => {
		const response = await marketRepo.getMostVoluminous({ rowCount: 4 });
		return useProcessMarketData(response.result.rows, marketBriefList, currencyBriefList);
	},
);

const { data: hottestMarkets, status: hottestMarketsStatus } = useAsyncData(
	'hottestMarkets',
	async () => {
		const response = await marketRepo.getHottestMarkets({ rowCount: 4 });
		return useProcessMarketData(response.result.rows, marketBriefList, currencyBriefList);
	},
);

const { data: latestMarkets, status: latestMarketsStatus } = useAsyncData(
	'latestMarkets',
	async () => {
		const response = await marketRepo.getLatestMarkets({ rowCount: 4 });
		return useProcessMarketData(response.result.rows, marketBriefList, currencyBriefList);
	},
);

const changePrice = (price: string | number, priceChangePercent: string | number) => {
	return (parseFloat(String(price)) * parseFloat(String(priceChangePercent)));
};

const showMore = ref(false);
const toggleShowMore = () => {
	showMore.value = !showMore.value;
};
</script>
