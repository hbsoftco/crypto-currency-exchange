<template>
	<div class="block md:flex items-center my-2">
		<div class="ml-6 my-1 w-44">
			<USelectMenu
				v-model="selected"
				:loading="loading"
				:searchable-placeholder="`${$t('search')}...`"
				:searchable="search"
				by="mSymbol"
				:options="filteredMarkets"
				:placeholder="$t('market')"
				trailing
				:ui="{
					background: '',
					color: {
						white: {
							outline: ' bg-hover-light dark:bg-hover-dark',
						},
					},
				}"
			>
				<template #option="{ option }">
					<div class="flex flex-col justify-start items-start">
						<span class="font-semibold pb-1">{{ option.mSymbol }}</span>
						<!-- <span class="text-xs text-gray-500">{{ option.mSymbol }}</span> -->
					</div>
				</template>

				<template #label>
					<div class="flex justify-between items-start">
						<div class="flex flex-col items-start min-w-20 h-5">
							<div>
								<span class="font-bold text-xs">{{ selected?.mSymbol }}</span>
							</div>
						</div>
					</div>
				</template>

				<template #option-empty="{ query }">
					<q>{{ query }}</q> {{ $t('notFound') }}
				</template>

				<template #empty>
					{{ $t('searching') }}
				</template>
			</USelectMenu>
		</div>
		<!-- Market -->

		<div class="ml-6 my-1 w-44">
			<USelectMenu
				v-model="orderTypeFilter"
				:options="orderTypeItems"
				:placeholder="$t('orderType')"
				option-attribute="value"
				:ui="{
					background: '',
					color: {
						white: {
							outline: ' bg-hover-light dark:bg-hover-dark',
						},
					},
				}"
			/>
		</div>
		<!-- Order Type -->

		<div class="ml-6 my-1 w-44">
			<USelectMenu
				v-model="selectedMarket3"
				:options="market3"
				:placeholder="$t('direction')"
				:ui="{
					background: '',
					color: {
						white: {
							outline: ' bg-hover-light dark:bg-hover-dark',
						},
					},
				}"
			/>
		</div>
		<div class="ml-6 my-1 w-44">
			<USelectMenu
				v-model="selectedMarket4"
				:options="market4"
				:placeholder="$t('fromHistory')"
				:ui="{
					background: '',
					color: {
						white: {
							outline: ' bg-hover-light dark:bg-hover-dark',
						},
					},
				}"
			/>
		</div>
		<div class="ml-6 my-1 w-44">
			<USelectMenu
				v-model="selectedMarket5"
				:options="market5"
				:placeholder="$t('toDate')"
				class="bg-hover-light dark:bg-hover-dark "
				:ui="{
					background: '',
					color: {
						white: {
							outline: ' bg-hover-light dark:bg-hover-dark',
						},
					},
				}"
			/>
		</div>
		<UButton
			class="flex justify-center px-8 text-sm font-normal text-black dark:text-white hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-gray-light dark:border-primary-gray-dark"
		>
			{{ $t("search") }}
		</UButton>
	</div>
</template>

<script setup lang="ts">
import type { KeyValue } from '~/types/base.types';
import type { MarketBriefItem } from '~/types/response/brief-list.types';
import { OrderType } from '~/utils/enums/order.enum';

const filteredMarkets = ref<MarketBriefItem[]>();
const selected = ref<MarketBriefItem>();

const loading = ref(false);

const baseDataStore = useBaseDataStore();

const marketMap = new Map<number, MarketBriefItem>();

const search = (q: string) => {
	loading.value = true;

	if (!q) {
		filteredMarkets.value = Array.from(marketMap.values()).slice(0, 200);
	}
	else {
		const results = Array.from(marketMap.values()).filter((market) =>
			market.mSymbol.toLowerCase().includes(q.toLowerCase()),
		);

		filteredMarkets.value = results;
	}
	loading.value = false;
	return filteredMarkets.value;
};

onMounted(async () => {
	await baseDataStore.fetchMarketBriefItems();

	baseDataStore.marketBriefItems.forEach((market) => {
		marketMap.set(market.id, market);
	});

	filteredMarkets.value = baseDataStore.marketBriefItems.slice(0, 200);
});

const orderTypeItems = ref<KeyValue[]>([
	{
		key: OrderType.MARKET,
		value: useT(OrderType.MARKET),
	},
	{
		key: OrderType.INSTANT,
		value: useT(OrderType.INSTANT),
	},
	{
		key: OrderType.STOP_MARKET,
		value: useT(OrderType.STOP_MARKET),
	},
	{
		key: OrderType.STOP_INSTANT,
		value: useT(OrderType.STOP_INSTANT),
	},
	{
		key: OrderType.LIMIT,
		value: useT(OrderType.LIMIT),
	},
	{
		key: OrderType.STOP_LIMIT,
		value: useT(OrderType.STOP_LIMIT),
	},
]);
const orderTypeFilter = ref<string>();

// fake data
// const market = ['Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];
// const selectedMarket = ref();

// const market2 = ['gggg', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];
// const selectedMarket2 = ref();

const market3 = ['ffff', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];
const selectedMarket3 = ref();

const market4 = ['mmmmmmmm', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];
const selectedMarket4 = ref();

const market5 = ['ddd'];
const selectedMarket5 = ref();
</script>
