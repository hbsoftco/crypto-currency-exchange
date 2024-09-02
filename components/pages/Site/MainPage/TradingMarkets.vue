<template>
	<div class="pt-20 pb-4 md:pb-20">
		<TradingMarketsHeader />

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
					<TradingMarketRow
						v-for="(row, index) in marketData || []"
						:key="row.id || index"
						:row="row"
					/>
				</tbody>
			</table>

			<div class="text-center py-5">
				<UButton
					:padded="false"
					color="primary"
					variant="link"
				>
					<span class="ml-2">{{ $t('showAllMarkets') }}</span>
					<UIcon
						name="i-heroicons-arrow-left-16-solid"
						class="w-6 h-6"
					/>
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import TradingMarketsHeader from './TradingMarketsHeader.vue';
import TradingMarketRow from './TradingMarketRow.vue';

const marketStore = useMarketStore();
const baseDataStore = useBaseDataStore();
await useAsyncData('fetchMarketBriefItems', () => baseDataStore.fetchMarketBriefItems());

const params = ref({
	sortMode: 'ByMarketCaps',
	currencyQuoteId: '1',
	marketTypeId: 'Spot',
	tagTypeId: '1',
});

const { data: marketData } = await useAsyncData('fetchMarketList', () =>
	marketStore.fetchMarketListWithSparkLineChart(params.value),
);
</script>
