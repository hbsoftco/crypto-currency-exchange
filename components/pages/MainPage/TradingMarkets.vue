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
					<template v-if="marketStore.isMarketListLoading && !marketData?.length">
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
						v-for="(row, index) in marketData || []"
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
import type { ErrorResponse } from '~/types/response/error.type';
import type { MarketListWithSparkLineChartItem } from '~/types/response/market.types';
import { MarketType, SortMode } from '~/utils/enums/market.enum';

const marketStore = useMarketStore();
const publicSocketStore = usePublicSocketStore();

const params = ref({
	sortMode: String(SortMode.BY_MARKET_CAPS),
	currencyQuoteId: '1',
	marketTypeId: String(MarketType.SPOT),
	tagTypeId: '1',
});

const marketData = ref<MarketListWithSparkLineChartItem[]>([]);

const updateFilter = async (selectedValue: SortMode) => {
	params.value.sortMode = String(selectedValue);
	await fetchMarketData();
};

const updateTag = async (selectedValue: SortMode) => {
	params.value.tagTypeId = String(selectedValue);
	await fetchMarketData();
};

const updateCurrency = async (selectedId: string) => {
	params.value.currencyQuoteId = selectedId;
	await fetchMarketData();
};

const fetchMarketData = async () => {
	try {
		const response = await marketStore.fetchMarketListWithSparkLineChart(params.value);
		marketData.value = response || [];

		marketIdParams.value = marketData.value.map((item) => item.id).join(',');
		publicSocketStore.refreshSocketRequest(marketIdParams.value, 'main');
	}
	catch (error: unknown) {
		const err = error as ErrorResponse;
		throw createError({
			statusCode: 500,
			statusMessage: `${err.response._data.message}`,
		});
	}
};

const marketIdParams = ref<string>('');

onMounted(async () => {
	await fetchMarketData();
});
</script>
