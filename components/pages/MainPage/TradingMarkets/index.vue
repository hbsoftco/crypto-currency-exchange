<template>
	<div class="pt-10 pb-4 md:pb-20">
		<MarketsHeader v-if="!initFilterLoading" />

		<div class="p-0 md:p-4 pt-2 md:pt-0">
			<table
				class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light rounded"
			>
				<thead v-if="!marketsLoading">
					<tr class="text-center font-normal md:font-medium text-[0.775rem] md:text-base">
						<th class="py-2 md:py-3 px-2 text-right max-w-36 w-36 md:max-w-80 md:w-80 pr-6 md:pr-14">
							{{ $t("market") }}
						</th>
						<th class="py-2 md:py-3 text-center md:text-left">
							{{ $t("lastPrice") }}
						</th>
						<th class="py-2 md:py-3 text-right md:text-left pl-0 md:pl-9">
							{{ $t("change24h") }}
						</th>
						<th
							v-if="!isMobile"
							class="py-2 md:py-3 hidden md:block"
						>
							{{ $t("weeklyChart") }}
						</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="marketsLoading">
						<tr
							v-for="n in 6"
							:key="n"
						>
							<td class="py-3">
								<div class="flex items-center space-x-4">
									<USkeleton
										class="h-9 w-9 ml-3 mr-2"
										:ui="{ rounded: 'rounded-full' }"
									/>
									<div class="space-y-2">
										<USkeleton class="h-4 w-14 md:w-28" />
										<USkeleton class="h-4 w-14 md:w-24" />
									</div>
								</div>
							</td>
							<td class="text-left">
								<div class="flex justify-end pl-8">
									<USkeleton class="h-4 w-14 md:w-24" />
								</div>
							</td>
							<td>
								<div class="flex justify-end pl-8">
									<USkeleton class="h-4 w-12 md:w-20" />
								</div>
							</td>
							<td
								v-if="!isMobile"
								class="hidden md:block"
							>
								<div class="flex justify-center pl-8 pt-6">
									<USkeleton class="h-4 w-36" />
								</div>
							</td>
						</tr>
					</template>

					<TradingMarketsRow
						v-for="(row, index) in markets || []"
						v-else
						:key="row.id || index"
						:row="row"
						:socket-data="publicSocketStore.findMarketDataById(row.id)"
					/>
				</tbody>
			</table>

			<UiSeeMore
				link="/markets"
				text="showAllMarkets"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import MarketsHeader from '~/components/pages/MainPage/TradingMarkets/MarketsHeader.vue';
import TradingMarketsRow from '~/components/pages/MainPage/TradingMarkets/MarketsRow.vue';
import { MarketType } from '~/utils/enums/market.enum';
import type { MarketL21 } from '~/types/definitions/market.types';
import { marketRepository } from '~/repositories/market.repository';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { Language } from '~/utils/enums/language.enum';

const { $mobileDetect, $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const publicSocketStore = usePublicSocketStore();
const marketsPageStore = useMarketsPageStore();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();

const socketMarketIds = ref<number[]>([]);
const markets = ref<MarketL21[]>([]);
const marketsLoading = ref<boolean>(false);
const getMarketListL21 = async () => {
	try {
		if (marketsPageStore.tradingMarketsParams.tagTypeId === '0') {
			marketsPageStore.tradingMarketsParams.tagTypeId = '';
		}

		marketsLoading.value = true;
		const { result } = await marketRepo.getMarketListL21(marketsPageStore.tradingMarketsParams);

		markets.value = await worker.addCurrencyToMarkets(
			result.rows as MarketL21[],
			Number(marketsPageStore.tradingMarketsParams.currencyQuoteId),
			useEnv('apiBaseUrl'),
			MarketType.SPOT,
		);

		if (socketMarketIds.value.length) {
			await publicSocketStore.removeMarketIds(socketMarketIds.value);
		}

		socketMarketIds.value = markets.value.map((item) => item.id);
		await publicSocketStore.addMarketIds(socketMarketIds.value);

		marketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

const initFilterLoading = ref<boolean>(false);
const initFilterItems = async (marketTypeId: number) => {
	initFilterLoading.value = true;
	if (marketTypeId === MarketType.SPOT) {
		marketsPageStore.quoteItems = await worker.fetchSpotQuoteItems(useEnv('apiBaseUrl'));
	}
	else {
		marketsPageStore.quoteItems = await worker.fetchFuturesQuoteItems(useEnv('apiBaseUrl'));
	}
	marketsPageStore.tagItems = await worker.fetchTagItems(Language.PERSIAN, useEnv('apiBaseUrl'));

	marketsPageStore.initQuoteOptions();
	initFilterLoading.value = false;
};

watch(() => marketsPageStore.tradingMarketsParams, async () => {
	await getMarketListL21();
}, { deep: true });

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	marketsPageStore.tradingMarketsParams.tagTypeId = '';

	await Promise.all([
		initFilterItems(MarketType.SPOT),
		getMarketListL21(),
	]);
});

onUnmounted(async () => {
	await publicSocketStore.unSubscribe();
});
</script>
