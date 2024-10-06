<template>
	<div>
		<div
			class="grid grid-cols-12 gap-0 text-center text-sm pb-5 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div
				class="col-span-5 md:col-span-2 border-l-2 border-primary-gray-light dark:border-primary-gray-dark flex justify-center items-center"
			>
				<span class="text-base font-bold">{{ $t("tradingMarkets") }}</span>
			</div>
			<div class="col-span-4 md:col-span-2 flex justify-center items-center">
				<UDropdown
					:items="marketFilters"
					:popper="{ arrow: true }"
					:ui="{
						width: 'w-auto',
						item: {
							padding: 'px-5',
						},
					}"
				>
					<span class="flex justify-center items-center cursor-pointer">
						<span
							class="ml-2 text-primary-yellow-light font-bold dark:text-primary-yellow-dark"
						>{{ selectedMarketFilter.label }}</span>
						<UIcon
							name="i-heroicons-chevron-down"
							class="w-5 h-5 text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
					</span>
				</UDropdown>
			</div>
			<div class="col-span-6 hidden md:block">
				<TradingMarketsHeaderItems @tag-selected="updateTagFilter" />
			</div>
			<div class="col-span-2 pr-8 text-center flex justify-center items-center">
				<UDropdown
					:items="currencyOptions"
					:popper="{ arrow: true }"
					:ui="{
						width: 'w-auto',
						item: {
							padding: 'px-5',
						},
					}"
				>
					<span class="flex justify-center items-center cursor-pointer">
						<span
							class="ml-2 text-primary-yellow-light font-bold dark:text-primary-yellow-dark"
						>{{ selectedCurrency.label }}</span>
						<UIcon
							name="i-heroicons-chevron-down"
							class="w-5 h-5 text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
					</span>
				</UDropdown>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import TradingMarketsHeaderItems from './TradingMarketsHeaderItems.vue';

import { MarketType, SortMode } from '~/utils/enums/market.enum';
import { Language } from '~/utils/enums/language.enum';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';

interface EmitDefinition {
	(event: 'filter-change' | 'tag-change', value: number): void;
	(event: 'currency-change', selectedId: string): void;
}

const emit = defineEmits<EmitDefinition>();

const baseDataStore = useBaseDataStore();
const { getMatchedCurrencyItems } = baseDataStore;

await baseDataStore.fetchTagItems();
await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
await baseDataStore.fetchQuoteItems(MarketType.SPOT);

const updateTagFilter = async (value: number) => {
	emit('tag-change', value);
};

interface DropdownItem {
	id: number;
	label: string;
	click: () => void;
}

const currencyOptions = ref<DropdownItem[][]>([]);

const loadCurrencyOptions = async () => {
	const items = await getMatchedCurrencyItems();

	currencyOptions.value = [
		items.map((item) => ({
			id: item.id,
			label: item.cName,
			click: () => handleSelectCurrency(item),
		})),
	];
};

await loadCurrencyOptions();
const marketFilters = [
	[
		{
			label: useT('hottest'),
			value: SortMode.BY_RECENTLY_CHANGED,
			click: () => handleSelectMarketFilter(SortMode.BY_RECENTLY_CHANGED),
		},
		{
			label: useT('mostProfitable'),
			value: SortMode.BY_MOST_PROFIT,
			click: () => handleSelectMarketFilter(SortMode.BY_MOST_PROFIT),
		},
		{
			label: useT('newest'),
			value: SortMode.BY_NEWEST_COINS,
			click: () => handleSelectMarketFilter(SortMode.BY_NEWEST_COINS),
		},
		{
			label: useT('mostVoluminous'),
			value: SortMode.BY_TRADE_COUNT,
			click: () => handleSelectMarketFilter(SortMode.BY_TRADE_COUNT),
		},
		{
			label: useT('myFavorites'),
			value: SortMode.BY_FAVORITES,
			click: () => handleSelectMarketFilter(SortMode.BY_FAVORITES),
		},
	],
];

const selectedMarketFilter = ref({
	label: useT('hottest'),
	value: SortMode.BY_RECENTLY_CHANGED,
});

const handleSelectMarketFilter = (selectedValue: SortMode) => {
	const selectedFilter = marketFilters[0].find(
		(filter) => filter.value === selectedValue,
	);

	selectedMarketFilter.value = selectedFilter || {
		label: useT('defaultLabel'),
		value: SortMode.BY_RECENTLY_CHANGED,
	};

	emit('filter-change', selectedValue);
};

const selectedCurrency = ref({ label: useT('toman') });

const handleSelectCurrency = (selectedItem: CurrencyBriefItem) => {
	selectedCurrency.value = { label: selectedItem.cName };
	emit('currency-change', String(selectedItem.id));
};
</script>
