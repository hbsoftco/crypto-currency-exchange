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
		<div class="ml-6 my-4 md:my-1 w-full md:w-44 relative">
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
						class="flex justify-between items-start w-full"
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
			<span
				v-if="selected"
				class="cursor-pointer absolute left-6 top-2"
				@click="clearMarket()"
			>
				<UIcon
					name="i-heroicons-x-mark-solid"
					class="w-4 h-4 ml-2 dark:text-subtle-text-50"
				/>
			</span>
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
			<input
				v-model="fromDate"
				dir="ltr"
				type="text"
				class="rtl-placeholder w-full text-left relative block disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 bg-hover-light dark:bg-hover-dark"
				:placeholder="$t('fromDate')"
				maxlength="10"
				@input="handleDateInput('fromDate')"
				@blur="validateDate('fromDate')"
			>

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
			<input
				v-model="toDate"
				dir="ltr"
				type="text"
				class="rtl-placeholder w-full text-left relative block disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 bg-hover-light dark:bg-hover-dark"
				:placeholder="$t('toDate')"
				maxlength="10"
				@input="handleDateInput('toDate')"
				@blur="validateDate('toDate')"
			>

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
import { convertPersianToEnglishNumber } from '~/utils/helpers';

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
const internalToDate = ref();
const fromDate = ref();
const internalFromDate = ref();

const clearMarket = () => {
	selected.value = undefined;
};

const handleDateInput = (field: string) => {
	try {
		const value = field === 'fromDate' ? fromDate.value : toDate.value;

		let sanitized = value.replace(/[^0-9۰-۹/]/g, '');
		const normalized = sanitized.replace(/[۰-۹]/g, (c: string) => String.fromCharCode(c.charCodeAt(0) - 1728));

		const isPersian = /[\u0600-\u06FF]/.test(sanitized);

		if (sanitized.length >= 5 && sanitized[4] !== '/') {
			sanitized = sanitized.slice(0, 4) + '/' + sanitized.slice(4);
		}
		if (sanitized.length >= 8) {
			const firstSlashIndex = sanitized.indexOf('/');
			const secondSlashIndex = sanitized.indexOf('/', firstSlashIndex + 1);

			if (firstSlashIndex !== -1 && secondSlashIndex !== -1) {
				const date = sanitized.split('/');

				if (date[1].length === 1) {
					date[1] = (isPersian ? '۰' : '0') + date[1];
				}
				else {
					let checker = date[1];

					if (isPersian) {
						checker = convertPersianToEnglishNumber(checker);

						if (checker > 12) {
							date[1] = '۱۲';
						}
					}
					else {
						if (checker > 12) {
							date[1] = '12';
						}
					}
				}

				sanitized = `${date[0]}/${date[1]}/${date[2]}`;
			}
			else if (sanitized[7] !== '/') {
				sanitized = sanitized.slice(0, 7) + '/' + sanitized.slice(7);
			}
		}

		if (field === 'fromDate') {
			fromDate.value = sanitized;
			internalFromDate.value = normalized;
		}
		else {
			toDate.value = sanitized;
			internalToDate.value = normalized;
		}
	}
	catch (error) {
		console.log(error);
	}
};

const validateDate = (field: string) => {
	const value = field === 'fromDate' ? fromDate.value : toDate.value;

	if (!value) return;

	let sanitized = value.replace(/[^0-9۰-۹/]/g, '');
	sanitized = sanitized.replace(/[۰-۹]/g, (c: string) => String.fromCharCode(c.charCodeAt(0) - 1728));

	const parts = sanitized.split('/');
	if (parts.length === 3) {
		const year = parts[0];
		const month = parts[1];
		const day = parts[2];

		const dateRegex = /^(?<year>\d{4})\/(?<month>\d{1,2})\/(?<day>\d{1,2})$/;
		const normalized = `${year}/${month}/${day}`;

		if (dateRegex.test(normalized)) {
			if (field === 'fromDate') {
				internalFromDate.value = normalized;
			}
			else {
				internalToDate.value = normalized;
			}
			return;
		}
	}

	if (field === 'fromDate') {
		fromDate.value = '';
		internalFromDate.value = '';
	}
	else {
		toDate.value = '';
		internalToDate.value = '';
	}
};

const orderTypeItems = ref<KeyValue[]>([
	{
		key: '',
		value: useT('all'),
	},
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
		key: '',
		value: useT('all'),
	},
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
		from: internalFromDate.value,
		to: internalToDate.value,
		orderSide: orderSideFilter.value ? orderSideFilter.value.key : '',
		orderType: orderTypeFilter.value ? orderTypeFilter.value.key : '',
		symbol: selected.value?.mSymbol ? selected.value?.mSymbol : '',
		marketId: selected.value?.id ? String(selected.value?.id) : '',
	});
	emit('close', false);
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
