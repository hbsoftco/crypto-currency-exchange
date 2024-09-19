<template>
	<div class="mt-8">
		<div class="p-0 pt-2 md:pt-0 mt-4">
			<table
				class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light"
			>
				<thead>
					<tr class="text-center font-normal md:font-medium text-sm md:text-base border-b border-primary-gray-light dark:border-primary-gray-dark">
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-0 md:px-10">
							{{ $t("currencyName") }}
						</th>
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-0 md:px-10">
							{{ $t("currentPrice") }}
						</th>
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-0 md:px-10">
							{{ $t("change24h") }}
						</th>
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-10 md:table-cell hidden">
							{{ $t("changeSinceListing") }}
						</th>
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-10 md:table-cell hidden">
							{{ $t("sinceListing") }}
						</th>
					</tr>
				</thead>

				<tbody v-if="status==='success'">
					<PagesSiteMarketNewCurrencyMarketTableRow
						v-for="(item, index) in markets"
						:key="index"
						:market="item"
					/>
				</tbody>
			</table>
			<div class="flex justify-center py-4">
				<UPagination
					:model-value="Number(params.pageNumber)"
					:page-count="20"
					:total="totalCount"
					:max="6"
					size="xl"
					ul-class="flex space-x-2 bg-blue-500 border-none"
					li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 px-3"
					button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
					button-class-inactive="bg-green-700 hover:bg-gray-600"
					button-class-active="bg-blue-500"
					class="my-14"
					@update:model-value="onPageChange"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { MarketType, SortMode } from '~/utils/enums/market.enum';
import { marketRepository } from '~/repositories/market.repository';
import { Language } from '~/utils/enums/language.enum';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

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
	return useProcessMarketData(response.result.rows, marketBriefList, currencyBriefList);
}, { watch: [params.value], deep: true });

watch(() => props.searchQuery, (newQuery) => {
	params.value.searchStatement = newQuery;
});

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = String(newPage);
};
</script>
