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
				v-model="orderSideFilter"
				:options="OrderSideItem"
				:placeholder="$t('direction')"
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
		<div class="ml-6 my-1 w-44">
			<UInput
				id="fromDate"
				v-model="fromDate"
				color="white"
				variant="outline"
				:placeholder="$t('fromDate')"
				readonly
				class="cursor-pointer"
				:ui="{
					background: '',
					color: {
						white: {
							outline: ' bg-hover-light dark:bg-hover-dark',
						},
					},
				}"
			/>

			<DatePicker
				v-model="fromDate"
				color="#FFC107"
				simple
				display-format="jYYYY/jMM/jDD"
				format="YYYY/MM/DD"
				element="fromDate"
			/>
		</div>
		<div class="ml-6 my-1 w-44">
			<UInput
				id="toDate"
				v-model="toDate"
				color="white"
				variant="outline"
				:placeholder="$t('toDate')"
				readonly
				class="cursor-pointer"
				:ui="{
					background: '',
					color: {
						white: {
							outline: ' bg-hover-light dark:bg-hover-dark',
						},
					},
				}"
			/>

			<DatePicker
				v-model="toDate"
				display-format="jYYYY/jMM/jDD"
				color="#FFC107"
				simple
				format="YYYY/MM/DD"
				element="toDate"
			/>
		</div>
		<UButton
			class="flex justify-center px-8 text-sm font-normal text-black dark:text-white hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-gray-light dark:border-primary-gray-dark"
			@click="applyFilters"
		>
			{{ $t("search") }}
		</UButton>
	</div>
</template>

<script setup lang="ts">
import type { KeyValue } from '~/types/base.types';
import type { MarketBriefItem } from '~/types/response/brief-list.types';
import type { OrderFiltersType } from '~/types/response/spot.types';
import { OrderType, OrderSide } from '~/utils/enums/order.enum';

interface EmitDefinition {
	(event: 'filters', filters: OrderFiltersType): void;
}

const emit = defineEmits<EmitDefinition>();

const filteredMarkets = ref<MarketBriefItem[]>();
const toDate = ref();
const fromDate = ref();
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

const OrderSideItem = ref<KeyValue[]>([
	{
		key: OrderSide.BUY,
		value: useT(OrderSide.BUY),
	},
	{
		key: OrderSide.SELL,
		value: useT(OrderSide.SELL),
	},
]);
const orderTypeFilter = ref<KeyValue>();
const orderSideFilter = ref<KeyValue>();

const applyFilters = () => {
	emit('filters', {
		from: toDate.value,
		to: toDate.value,
		orderSide: orderSideFilter.value ? orderSideFilter.value.key : '',
		orderType: orderTypeFilter.value ? orderTypeFilter.value.key : '',
		symbol: 'BTCUSDT',
	});
};
</script>
