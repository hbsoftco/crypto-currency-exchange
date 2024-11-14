<template>
	<div class="block md:flex items-center my-2 mx-4 md:mx-0">
		<div class="block md:hidden my-4">
			<div class="flex items-center">
				<IconArrowRight
					class="text-lg cursor-pointer"
					@click="closeModal(false)"
				/>
				<span class="text-base font-bold mr-1">{{ $t('orderDetails') }}</span>
			</div>
		</div>
		<div class="flex md:hidden justify-end items-center mt-8">
			<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('removeFilter') }}</span>
			<IconDelete
				class="text-base text-subtle-text-light dark:text-subtle-text-dark"
				@click="resetFilters"
			/>
		</div>
		<div class="ml-6 my-4 md:my-1 w-full md:w-44">
			<USelectMenu
				v-model="selected"
				:loading="searchLoading"
				:searchable-placeholder="`${$t('search')}...`"
				:searchable="search"
				by="mSymbol"
				:options="markets"
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
						<span class="pb-1">{{ option.mSymbol }}</span>
					</div>
				</template>

				<template #label>
					<div
						v-if="selected"
						class="flex justify-between items-start"
					>
						<div class="flex flex-col items-start min-w-20 h-5">
							<div>
								<span class="text-xs">{{ selected?.mSymbol }}</span>
							</div>
						</div>
					</div>
					<span
						v-else
						class="text-gray-400"
					>{{ $t('market') }}</span>
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

		<div class="ml-6 my-4 md:my-1 w-full md:w-44">
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

		<div class="ml-6 my-4 md:my-1 w-full md:w-44">
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

		<div class="ml-6 my-4 md:my-1 w-full md:w-44">
			<UInput
				id="fromDate"
				v-model="fromDate"
				color="white"
				variant="outline"
				:placeholder="$t('fromDate')"
				:readonly="isMobile"
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
				v-if="isMobile"
				v-model="fromDate"
				color="#FFC107"
				simple
				display-format="jYYYY/jMM/jDD"
				format="YYYY/MM/DD"
				element="fromDate"
			/>
		</div>

		<div class="ml-6 my-4 md:my-1 w-full md:w-44">
			<UInput
				id="toDate"
				v-model="toDate"
				color="white"
				variant="outline"
				:placeholder="$t('toDate')"
				:readonly="isMobile"
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
				v-if="isMobile"
				v-model="toDate"
				display-format="jYYYY/jMM/jDD"
				color="#FFC107"
				simple
				format="YYYY/MM/DD"
				element="toDate"
			/>
		</div>

		<UButton
			class="flex justify-center w-full md:w-auto px-8 text-sm font-normal text-black dark:text-white hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-gray-light dark:border-primary-gray-dark"
			@click="applyFilters"
		>
			{{ $t("search") }}
		</UButton>
	</div>
</template>

<script setup lang="ts">
import IconArrowRight from '~/assets/svg-icons/menu/arrow-right.svg';
import type { KeyValue } from '~/types/definitions/common.types';
import type { MarketBrief } from '~/types/definitions/market.types';
import type { OrderFiltersType } from '~/types/definitions/spot.types';
import { OrderType, OrderSide } from '~/utils/enums/order.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import IconDelete from '~/assets/svg-icons/profile/Delete.svg';

const { $mobileDetect } = useNuxtApp();

interface EmitDefinition {
	(event: 'filters', filters: OrderFiltersType): void;
	(event: 'close', value: boolean): void;

}
const emit = defineEmits<EmitDefinition>();

const worker = useBaseWorker();

const markets = ref<MarketBrief[]>([]);
const selected = ref<MarketBrief>();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const searchLoading = ref<boolean>(false);
const search = async (q: string) => {
	searchLoading.value = true;

	if (!q) {
		markets.value = await worker.searchMarkets(useEnv('apiBaseUrl'), '', 400);
	}
	else {
		markets.value = await worker.searchMarkets(useEnv('apiBaseUrl'), q.toLowerCase(), 400);
	}
	searchLoading.value = false;
	return markets.value;
};

const toDate = ref();
const fromDate = ref();

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
		symbol: selected.value?.mSymbol ? selected.value?.mSymbol : '',
		marketId: selected.value?.id ? String(selected.value?.id) : '',
	});
};

const resetFilters = () => {
	selected.value = undefined;
	orderTypeFilter.value = undefined;
	orderSideFilter.value = undefined;
	fromDate.value = undefined;
	toDate.value = undefined;
};

const closeModal = async (value: boolean) => {
	emit('close', value);
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
});
</script>
