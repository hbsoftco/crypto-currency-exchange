<template>
	<div class="mt-8">
		<MarketTableHeader
			@filter-change="updateFilter"
			@currency-change="updateCurrency"
			@tag-change="updateTag"
		/>

		<div class="p-0 pt-2 md:pt-0 mt-4">
			<table
				class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light"
			>
				<thead>
					<tr class="text-center font-normal md:font-medium text-sm md:text-base border-b border-primary-gray-light dark:border-primary-gray-dark">
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-0 md:px-10">
							<span class="hidden md:block">{{ $t("tradingPair") }}</span>
							<span class="block md:hidden">{{ $t("market") }}</span>
						</th>
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-0 md:px-10">
							<span class="hidden md:block">{{ $t("currentPrice") }}</span>
							<span class="block md:hidden">{{ $t("lastPrice") }}</span>
						</th>
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-0 md:px-10">
							{{ $t("change24h") }}
						</th>
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-10 md:table-cell hidden">
							{{ $t("roof24h") }}
						</th>
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-10 md:table-cell hidden">
							{{ $t("floor24h") }}
						</th>
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-10 md:table-cell hidden">
							{{ $t("volume24h") }}
						</th>
					</tr>
				</thead>

				<tbody v-if="status==='pending'">
					<tr
						v-for="n in 10"
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
				</tbody>

				<tbody v-if="status==='success'">
					<MarketTableRow
						v-for="(item, index) in markets"
						:key="index"
						:socket-data="publicSocketStore.findMarketDataById(item.id)"
						:market="item"
					/>
				</tbody>
			</table>

			<div class="flex justify-center py-4">
				<UPagination
					:model-value="Number(params.pageNumber)"
					:page-count="20"
					:total="totalCount"
					:to="(page: number) => ({
						query: { page },
					})"
					:max="6"
					size="xl"
					@update:model-value="onPageChange"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import MarketTableRow from '~/components/pages/Market/MarketTableRow.vue';
import MarketTableHeader from '~/components/pages/Market/MarketTableHeader.vue';
import { MarketType, SortMode } from '~/utils/enums/market.enum';
import { marketRepository } from '~/repositories/market.repository';
import { Language } from '~/utils/enums/language.enum';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const publicSocketStore = usePublicSocketStore();

interface PropsDefinition {
	searchQuery: string;
}

const props = defineProps<PropsDefinition>();

const { useCachedCurrencyBriefList, useCachedMarketBriefList } = useCachedData();

const { data: cachedCurrencyBriefList } = await useCachedCurrencyBriefList({ languageId: Language.PERSIAN });
const { data: cachedMarketBriefList } = await useCachedMarketBriefList();

const marketBriefList = cachedMarketBriefList.value ?? [];
const currencyBriefList = cachedCurrencyBriefList.value ?? [];

const totalCount = ref(0);

const params = ref({
	sortMode: String(SortMode.BY_MARKET_CAPS),
	currencyQuoteId: '1',
	marketTypeId: String(MarketType.SPOT),
	tagTypeId: '',
	searchStatement: '',
	pageNumber: '1',
	pageSize: '20',
});

const { data: markets, status } = useAsyncData('markets', async () => {
	const response = await marketRepo.getMarkets(params.value);
	totalCount.value = response.result.totalCount;

	const fixedIds = response.result.rows.map((market) => market.id);
	const combinedMarketIds = `${fixedIds.join(',')}`;

	publicSocketStore.refreshSocketRequest(combinedMarketIds);

	return useProcessMarketData(response.result.rows, marketBriefList, currencyBriefList);
}, { watch: [params.value], deep: true });

watch(() => props.searchQuery, (newQuery) => {
	params.value.searchStatement = newQuery;
});

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = String(newPage);
};

const updateFilter = async (selectedValue: SortMode) => {
	params.value.sortMode = String(selectedValue);
};

const updateTag = async (selectedValue: string) => {
	params.value.tagTypeId = selectedValue;
};

const updateCurrency = async (selectedId: string) => {
	params.value.currencyQuoteId = selectedId;
};
</script>
