<template>
	<div class="pt-20 pb-4 md:pb-20">
		<TradingMarketsHeader
			@filter-change="updateFilter"
			@currency-change="updateCurrency"
			@tag-change="updateTag"
		/>

		<div class="p-0 md:p-4 pt-2 md:pt-0">
			<table
				class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light"
			>
				<thead>
					<tr class="text-center font-normal md:font-medium text-sm md:text-base">
						<th class="py-2 md:py-3 px-2 text-right max-w-36 w-36 md:max-w-80 md:w-80 pr-6 md:pr-14">
							{{ $t("market") }}
						</th>
						<th class="py-2 md:py-3 text-center md:text-center">
							{{ $t("lastPrice") }}
						</th>
						<th class="py-2 md:py-3 text-right md:text-center ">
							{{ $t("change24h") }}
						</th>
						<th class="py-2 md:py-3 hidden md:block">
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
										<USkeleton class="h-4 w-28" />
										<USkeleton class="h-4 w-24" />
									</div>
								</div>
							</td>
							<td class="text-left">
								<div class="flex justify-end pl-8">
									<USkeleton class="h-4 w-24" />
								</div>
							</td>
							<td>
								<div class="flex justify-end pl-8">
									<USkeleton class="h-4 w-20" />
								</div>
							</td>
							<td>
								<div class="flex justify-center pl-8">
									<USkeleton class="h-4 w-36" />
								</div>
							</td>
						</tr>
					</template>

					<TradingMarketRow
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
import TradingMarketsHeader from '~/components/pages/MainPage/TradingMarketsHeader.vue';
import TradingMarketRow from '~/components/pages/MainPage/TradingMarketRow.vue';
import { MarketType, SortMode } from '~/utils/enums/market.enum';
import type { MarketL21 } from '~/types/definitions/market.types';
import { marketRepository } from '~/repositories/market.repository';
import { useCurrencyWorker } from '~/workers/currency-worker/currency-worker-wrapper';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const publicSocketStore = usePublicSocketStore();

const currencyWorker = useCurrencyWorker();

const params = ref({
	sortMode: String(SortMode.BY_MARKET_CAPS),
	currencyQuoteId: '1',
	marketTypeId: String(MarketType.SPOT),
	tagTypeId: '',
});
const marketIdParams = ref<string>('');

const markets = ref<MarketL21[]>([]);
const marketsLoading = ref<boolean>(false);
const getMarketListL21 = async () => {
	try {
		marketsLoading.value = true;
		const { result } = await marketRepo.getMarketListL21(params.value);

		markets.value = await currencyWorker.addCurrencyToMarkets(result.rows, Number(params.value.currencyQuoteId));

		marketIdParams.value = markets.value.map((item) => item.id).join(',');
		publicSocketStore.refreshSocketRequest(marketIdParams.value, 'main');

		console.log('PPPPP', markets.value);

		marketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

onMounted(async () => {
	await getMarketListL21();
});

const updateFilter = async (selectedValue: SortMode) => {
	params.value.sortMode = String(selectedValue);
	await getMarketListL21();
};

const updateTag = async (selectedValue: SortMode) => {
	params.value.tagTypeId = String(selectedValue);
	await getMarketListL21();
};

const updateCurrency = async (selectedId: string) => {
	params.value.currencyQuoteId = selectedId;
	await getMarketListL21();
};
</script>
