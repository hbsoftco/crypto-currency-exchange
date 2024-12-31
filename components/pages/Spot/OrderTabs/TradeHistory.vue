<template>
	<div>
		<ModalTransactionDetail
			v-if="showModalTransactionDetail && tradeItem"
			:trade-item="tradeItem"
			@close="closeModalTransactionDetail"
		/>
		<div class="h-auto overflow-y-scroll hidden md:block">
			<table class="min-w-full p-6 text-right">
				<thead>
					<tr class="py-4 text-subtle-text-light dark:text-subtle-text-dark bg-primary-gray-light dark:bg-primary-gray-dark">
						<th class="p-1 text-xs font-normal">
							{{ $t('orderNumber') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('market') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('type') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('direction') }}
						</th>
						<th class="p-1 text-xs font-normal text-left">
							{{ $t('amountFilled') }}
						</th>
						<th class="p-1 text-xs font-normal text-left">
							{{ $t('filledValue') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('transactionNumber') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('fee') }}
						</th>
						<th class="p-1 text-xs font-normal text-left">
							{{ $t('tradePrice') }}
						</th>
						<th class="p-1 text-xs font-normal pr-4">
							{{ $t('date') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('detail') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="tradesListLoading">
						<tr
							v-for="n in 10"
							:key="n"
						>
							<td class="py-1">
								<USkeleton
									class="h-3 w-10 mx-1 my-1.5"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</td>
							<td class="py-1">
								<USkeleton
									class="h-3 w-10 mx-1 my-1.5"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</td>
							<td class="py-1">
								<USkeleton
									class="h-3 w-10 mx-1 my-1.5"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</td>
							<td class="py-1">
								<USkeleton
									class="h-3 w-10 mx-1 my-1.5"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</td>
							<td class="py-1">
								<USkeleton
									class="h-3 w-10 mx-1 my-1.5"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</td>
							<td class="py-1">
								<USkeleton
									class="h-3 w-10 mx-1 my-1.5"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</td>
							<td class="py-1">
								<USkeleton
									class="h-3 w-10 mx-1 my-1.5"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</td>
							<td class="py-1">
								<USkeleton
									class="h-3 w-10 mx-1 my-1.5"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</td>
							<td class="py-1">
								<USkeleton
									class="h-3 w-10 mx-1 my-1.5"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</td>
							<td class="py-1">
								<USkeleton
									class="h-3 w-10 mx-1 my-1.5"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</td>
							<td class="py-1">
								<USkeleton
									class="h-3 w-10 mx-1 my-1.5"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</td>
						</tr>
					</template>
					<tr
						v-for="(trade, index) in tradesList"
						v-else
						:key="index"
						class="pb-1 odd:bg-hover2-light dark:odd:bg-hover2-dark even:bg-background-light dark:even:bg-background-dark hover:bg-hover-light dark:hover:bg-hover-dark"
					>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(trade.oid) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ trade.mSymbol }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ trade.orderTypeName }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ trade.sideName }}</span>
						</td>
						<td class="text-xs font-normal py-1 text-left">
							<span
								dir="ltr"
								class="text-left"
							>{{ useNumber(priceFormat(trade.filledQnt)) }} {{ findSymbol(trade.mSymbol, 'currency') }}</span>
						</td>
						<td class="text-xs font-normal py-1 text-left">
							<span
								dir="ltr"
								class="text-left"
							>{{ useNumber(priceFormat(trade.reqQot)) }} {{ findSymbol(trade.mSymbol, 'quote') }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(trade.tid) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<div class="flex">
								<span
									dir="ltr"
									class="ml-1 text-[0.7rem] text-secondary-gray-light dark:text-secondary-gray-dark line-through"
								>{{ useNumber(trade.feeRawQot) }}  {{ findSymbol(trade.mSymbol, 'quote') }}</span>
								<span dir="ltr">{{ useNumber(trade.feeRawQot) }}  {{ findSymbol(trade.mSymbol, 'quote') }}</span>
							</div>
						</td>
						<td class="text-xs font-normal py-1 text-left">
							<span
								dir="ltr"
								class="text-left"
							>{{ useNumber(priceFormat(trade.dealPrice)) }} {{ findSymbol(trade.mSymbol, 'quote') }}</span>
						</td>
						<td class="text-xs font-normal py-1 pr-4">
							<span dir="ltr">{{ useNumber(formatDateToIranTime(trade.regTime)) }}</span>
						</td>
						<td class="flex text-xs font-normal py-1">
							<IconInfo
								class="text-base cursor-pointer"
								@click="openModalTransactionDetail(trade)"
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<template v-if="!tradesList.length && !tradesListLoading">
				<UiNothingToShow />
			</template>
		</div>
		<div class="block md:hidden">
			<template v-if="tradesListLoading">
				<div
					v-for="n in 10"
					:key="n"
					class="bg-hover-light dark:bg-hover-dark rounded-md py-1 my-2 px-2"
				>
					<div class="grid grid-cols-2 gap-2">
						<div class="flex justify-center">
							<USkeleton
								class="h-6 w-full mx-1 my-1.5"
								:ui="{ rounded: 'rounded-full' }"
							/>
						</div>
						<div class="flex justify-center">
							<USkeleton
								class="h-6 w-full mx-1 my-1.5"
								:ui="{ rounded: 'rounded-full' }"
							/>
						</div>
						<div class="flex justify-center">
							<USkeleton
								class="h-6 w-full mx-1 my-1.5"
								:ui="{ rounded: 'rounded-full' }"
							/>
						</div>
						<div class="flex justify-center">
							<USkeleton
								class="h-6 w-full mx-1 my-1.5"
								:ui="{ rounded: 'rounded-full' }"
							/>
						</div>
					</div>
				</div>
			</template>
			<div
				v-for="(trade, index) in tradesList"
				v-else
				:key="index"
				class="bg-hover-light dark:bg-hover-dark rounded-md py-1 my-2 px-2"
				@click="openModalTransactionDetail(trade)"
			>
				<div class="flex justify-between my-2">
					<div class="flex items-center px-1">
						<span class="text-xs font-bold text-subtle-text-light dark:text-subtle-text-dark ml-1">
							{{ $t('direction') }}:
						</span>
						<span
							v-if="trade.sideName === 'Sell'"
							class="text-sm font-bold text-accent-red dark:text-accent-red"
						>
							{{ trade.sideName }}
						</span>
						<span
							v-if="trade.sideName === 'Buy'"
							class="text-sm font-bold text-accent-green dark:text-accent-green"
						>
							{{ trade.sideName }}
						</span>
					</div>
					<div class="flex justify-end items-center px-1">
						<span class="text-sm font-bold text-black dark:text-white">
							{{ trade.mSymbol }}
						</span>
					</div>
				</div>
				<div class="flex justify-between mb-2">
					<div class="flex items-center px-1">
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark ml-1">
							{{ $t('amount') }}:
						</span>
						<span
							class="text-xs font-bold"
							dir="ltr"
						>
							{{ useNumber(priceFormat(trade.reqQot)) }} {{ findSymbol(trade.mSymbol, 'quote') }}
						</span>
					</div>
					<div class="flex items-center px-1">
						<div
							class="flex"
							dir="ltr"
						>
							<span class="text-xs font-bold">{{ useNumber(priceFormat(trade.feeRawQot)) }} {{ findSymbol(trade.mSymbol, 'quote') }} </span>
						</div>
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark mr-1">
							{{ $t('fee') }}
						</span>
					</div>
				</div>
			</div>
			<template v-if="!tradesList.length && !tradesListLoading">
				<UiNothingToShow />
			</template>
		</div>
		<div class="flex justify-center py-4">
			<UPagination
				v-if="totalCount > itemsPerPage"
				:model-value="Number(params.pageNumber)"
				:page-count="20"
				:total="totalCount"
				:to="(page: number) => ({
					query: { page },
				})"
				:max="6"
				size="xl"
				ul-class="flex space-x-2 bg-blue-500 border-none"
				li-class="flex trades-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 px-3"
				button-class-base="flex trades-center justify-center w-full h-full transition-colors duration-200"
				button-class-inactive="bg-green-700 hover:bg-gray-600"
				button-class-active="bg-blue-500"
				class="my-14"
				@update:model-value="onPageChange"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { formatDateToIranTime } from '~/utils/date-time';
import IconInfo from '~/assets/svg-icons/info.svg';
import { useNumber } from '~/composables/useNumber';
import ModalTransactionDetail from '~/components/pages/Spot/List/ModalTransactionDetail.vue';
import { spotRepository } from '~/repositories/spot.repository';
import type { OrderFiltersType, Trade, TradeListParams } from '~/types/definitions/spot.types';
import { priceFormat } from '~/utils/helpers';

type PropsDefinition = {
	filterParams?: OrderFiltersType;
};

const props = defineProps<PropsDefinition>();

const { $api } = useNuxtApp();
const spotRepo = spotRepository($api);

const itemsPerPage = 20;
const totalCount = ref(0);
const tradeItem = ref<Trade>();

const params = ref<TradeListParams>({
	marketId: '',
	symbol: '',
	orderSide: '',
	orderType: '',
	assetType: useEnv('assetType'),
	uniqueTag: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});

const tradesList = ref<Trade[]>([]);
const tradesListLoading = ref<boolean>(false);
const getTradeList = async () => {
	try {
		tradesListLoading.value = true;
		const { result } = await spotRepo.getTradeList(params.value);
		tradesList.value = result.rows as Trade[];
		totalCount.value = result.totalCount;

		tradesListLoading.value = false;
	}
	catch (error) {
		console.error('Error fetching trades:', error);
		tradesListLoading.value = false;
	}
};

watch(() => props.filterParams, async (newFilters) => {
	if (!props.filterParams || !newFilters) return;

	params.value.from = newFilters.from;
	params.value.to = newFilters.to;
	params.value.orderType = newFilters.orderType;
	params.value.orderSide = newFilters.orderSide;
	params.value.symbol = newFilters.symbol;
	params.value.marketId = newFilters.marketId ? newFilters.marketId : '';

	await getTradeList();
}, { deep: true });

const findSymbol = (mSymbol: string, type: 'quote' | 'currency') => {
	const market = splitMarket(mSymbol);
	if (market) {
		const [currency, quote] = market.split('_');

		if (type === 'quote') {
			return quote;
		}
		else {
			return currency;
		}
	}
	return null;
};

const showModalTransactionDetail = ref(false);
const openModalTransactionDetail = (item: Trade) => {
	tradeItem.value = item;
	showModalTransactionDetail.value = true;
};

const closeModalTransactionDetail = () => {
	showModalTransactionDetail.value = false;
};

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = String(newPage);
	await getTradeList();
};

onMounted(async () => {
	await getTradeList();
});
</script>
