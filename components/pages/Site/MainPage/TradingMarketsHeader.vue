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
				<TradingMarketsHeaderItems class="" />
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

import { Language } from '~/utils/enums/language.enum';

const baseDataStore = useBaseDataStore();
const { currencyBriefItems, isCurrencyBriefLoading } = baseDataStore;

await baseDataStore.fetchTagItems();

await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);

console.log('currencyBriefItems', currencyBriefItems);
console.log('isCurrencyBriefLoading', isCurrencyBriefLoading);

const currencyOptions = [
	[
		{
			label: useT('toman'),
			click: () => handleSelectCurrency('toman'),
		},
		{
			label: useT('tether'),
			click: () => handleSelectCurrency('tether'),
		},
	],
];

const marketFilters = [
	[
		{
			label: useT('hottest'),
			click: () => handleSelectMarketFilter('hottest'),
		},
		{
			label: useT('mostProfitable'),
			click: () => handleSelectMarketFilter('mostProfitable'),
		},
		{
			label: useT('newest'),
			click: () => handleSelectMarketFilter('newest'),
		},
		{
			label: useT('mostVoluminous'),
			click: () => handleSelectMarketFilter('mostVoluminous'),
		},
		{
			label: useT('myFavorites'),
			click: () => handleSelectMarketFilter('myFavorites'),
		},
	],
];

const selectedCurrency = ref({ label: useT('toman') });
const selectedMarketFilter = ref({ label: useT('hottest') });

const handleSelectCurrency = (selectedLabel: string) => {
	selectedCurrency.value = { label: useT(selectedLabel) };
};

const handleSelectMarketFilter = (selectedLabel: string) => {
	selectedMarketFilter.value = { label: useT(selectedLabel) };
};
</script>
