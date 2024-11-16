<template>
	<div>
		<ModalOrderDetail
			v-if="showModalOrderDetail && orderItem"
			:order-item="orderItem"
			@close="closeModalOrderDetail"
		/>
		<FilterOptions
			class="hidden md:block"
			@filters="applyFilter"
		/>
		<div class="h-auto overflow-y-scroll hidden md:block">
			<table class="min-w-full p-6 text-right">
				<thead>
					<tr class="py-4 text-subtle-text-light dark:text-subtle-text-dark bg-primary-gray-light dark:bg-primary-gray-dark">
						<th class="p-1 text-xs font-normal">
							{{ $t('market') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('type') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('direction') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('status') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('value') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('price') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('amount') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('filled') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('remaining') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('date') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('action') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="orderListLoading">
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
						v-for="(order, index) in orderList"
						v-else
						:key="index"
						class="pb-1 odd:bg-hover2-light dark:odd:bg-hover2-dark even:bg-background-light dark:even:bg-background-dark"
					>
						<td class="text-xs font-normal py-1">
							<span>{{ order.mSymbol }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ $t(order.orderTypeName) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ $t(order.sideName) }}</span>
						</td>
						<td
							class="text-xs font-normal py-1"
							:class="{ 'text-primary-yellow-light dark:text-primary-yellow-dark': order.orderStateName === 'ReadyToFill' }"
						>
							<span>{{ $t(order.orderStateName) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span dir="ltr">{{ useNumber(order.reqQot) }} {{ findSymbol(order.mSymbol, 'quote') }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span dir="ltr">{{ useNumber(order.limitPrice) }} {{ findSymbol(order.mSymbol, 'quote') }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span dir="ltr">{{ useNumber(order.dealPrice) }} {{ findSymbol(order.mSymbol, 'quote') }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span dir="ltr">{{ useNumber(order.filledQnt) }} {{ findSymbol(order.mSymbol, 'currency') }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span dir="ltr">{{ useNumber(remainingQuantity(order.reqQnt, order.filledQnt)) }} {{ findSymbol(order.mSymbol, 'quote') }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(formatDateToIran(order.regTime)) }}</span>
						</td>
						<!-- <td class="text-xs font-normal py-1">
							<span>{{ useNumber(order.tid) }}</span>
						</td> -->
						<td class="flex text-xs font-normal py-1">
							<div class="flex items-center">
								<IconInfo
									class="text-base cursor-pointer"
									@click="openModalOrderDetail(order)"
								/>
								<IconDelete
									class="text-base text-accent-red dark:text-accent-red cursor-pointer"
									@click="openDeleteModal(Number(order.oid))"
								/>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<template v-if="!orderList.length && !orderListLoading">
				<UiNothingToShow />
			</template>
		</div>
		<div class="block md:hidden">
			<template v-if="orderListLoading">
				<div
					v-for="n in 10"
					:key="n"
					class="bg-hover-light dark:bg-hover-dark rounded-md py-1 my-2 px-2"
				>
					<div class="flex justify-between pt-1">
						<USkeleton
							class="h-6 w-20 mx-1 my-1.5"
							:ui="{ rounded: 'rounded-full' }"
						/>
						<USkeleton
							class="h-6 w-20 mx-1 my-1.5"
							:ui="{ rounded: 'rounded-full' }"
						/>
					</div>
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
				v-for="(order, index) in orderList"
				v-else
				:key="index"
				class="bg-hover-light dark:bg-hover-dark rounded-md py-1 my-2 px-2"
			>
				<div class="flex justify-between pt-1">
					<div class="flex items-center">
						<IconDelete
							class="text-xl text-accent-red dark:text-accent-red cursor-pointer"
							@click="openDeleteModal(Number(order.oid))"
						/>
						<span class="text-sm font-normal">{{ $t(order.orderStateName) }}</span>
					</div>
					<div
						class="flex items-center"
						dir="ltr"
					>
						<img
							:src="`https://api-bitland.site/media/currency/${findSymbol(order.mSymbol, 'currency')}.png`"
							alt="coin"
							class="w-4 h-4"
						>
						<span class="text-sm font-bold mx-1">{{ order.mSymbol }}</span>
					</div>
				</div>
				<div
					class="grid grid-cols-2 gap-1 my-2"
					@click="openModalOrderDetail(order)"
				>
					<div class="bg-hover2-light dark:bg-hover2-dark flex flex-col justify-center items-center py-2 px-1">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('type') }}
						</span>
						<span class="text-sm font-bold">
							{{ $t(order.orderTypeName) }}
						</span>
					</div>
					<div class="bg-hover2-light dark:bg-hover2-dark flex flex-col justify-center items-center py-2 px-1">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('direction') }}
						</span>
						<span
							v-if="order.sideName === 'Sell'"
							class="text-sm font-bold text-accent-red dark:text-accent-red"
						>
							{{ $t(order.sideName) }}
						</span>
						<span
							v-if="order.sideName === 'Buy'"
							class="text-sm font-bold text-accent-green dark:text-accent-green"
						>
							{{ $t(order.sideName) }}
						</span>
					</div>
					<div class="bg-hover2-light dark:bg-hover2-dark flex flex-col justify-center items-center py-2 px-1">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('amount') }}
						</span>
						<span
							class="text-sm font-bold"
							dir="ltr"
						>
							{{ useNumber(priceFormat(order.reqQnt)) }} {{ findSymbol(order.mSymbol, 'currency') }}
						</span>
					</div>
					<div class="bg-hover2-light dark:bg-hover2-dark flex flex-col justify-center items-center py-2 px-1">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('price') }}
						</span>
						<span class="text-sm font-bold">
							{{ useNumber(priceFormat(order.limitPrice)) }}
						</span>
					</div>
				</div>
			</div>
			<template v-if="!orderList.length && !orderListLoading">
				<UiNothingToShow />
			</template>
		</div>
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
</template>

<script setup lang="ts">
import { formatDateToIran } from '~/utils/persian-date';
import FilterOptions from '~/components/pages/Spot/List/FilterOptions.vue';
import IconInfo from '~/assets/svg-icons/info.svg';
import { useNumber } from '~/composables/useNumber';
import ModalOrderDetail from '~/components/pages/Spot/List/ModalOrderDetail.vue';
import { SearchMode } from '~/utils/enums/order.enum';
import { spotRepository } from '~/repositories/spot.repository';
import type { Order, OrderFiltersType, OrderListParams } from '~/types/definitions/spot.types';
import IconDelete from '~/assets/svg-icons/profile/Delete.svg';
import { priceFormat } from '~/utils/price-format';

type PropsDefinition = {
	filterParams?: OrderFiltersType;
};

const props = defineProps<PropsDefinition>();

const { $api, $swal } = useNuxtApp();
const spotRepo = spotRepository($api);

const toast = useToast();

const totalCount = ref(0);
const orderItem = ref<Order>();

const params = ref<OrderListParams>({
	marketId: '',
	symbol: '',
	orderSide: '',
	orderType: '',
	assetType: useEnv('assetType'),
	searchMode: SearchMode.OPEN,
	uniqueTag: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});
const orderList = ref<Order[]>([]);
const orderListLoading = ref<boolean>(false);
const getOrderList = async () => {
	try {
		orderListLoading.value = true;
		const { result } = await spotRepo.getOrderList(params.value);
		orderList.value = result.rows as Order[];

		orderListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		orderListLoading.value = false;
	}
};

const deleteOrderListLoading = ref<boolean>(false);
const openDeleteModal = async (id: number) => {
	const confirmation = await $swal.fire({
		title: useT('deleteOrder'),
		text: useT('deleteOrderDescription'),
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: useT('yesDoIt'),
		cancelButtonText: useT('cancel'),
	});

	if (confirmation.isConfirmed) {
		deleteOrderListLoading.value = true;

		try {
			await spotRepo.deleteOpenOrder({ id: id });

			toast.add({
				title: useT('deleteOrder'),
				description: useT('deleteOrderSuccessfully'),
				timeout: 5000,
				color: 'green',
			});

			await getOrderList();

			deleteOrderListLoading.value = false;
		}
		catch (error) {
			deleteOrderListLoading.value = false;
			console.error('Error deleting notification:', error);
		}
	}
};

const remainingQuantity = (reqQnt: string, filledQnt: string): number => {
	return parseFloat(reqQnt) - parseFloat(filledQnt);
};

const applyFilter = async (event: OrderFiltersType) => {
	params.value.from = event.from;
	params.value.to = event.to;
	params.value.orderType = event.orderType;
	params.value.orderSide = event.orderSide;
	params.value.symbol = event.symbol;
	params.value.marketId = event.marketId ? event.marketId : '';

	await getOrderList();
};

watch(() => props.filterParams, async (newFilters) => {
	if (!props.filterParams || !newFilters) return;

	params.value.from = newFilters.from;
	params.value.to = newFilters.to;
	params.value.orderType = newFilters.orderType;
	params.value.orderSide = newFilters.orderSide;
	params.value.symbol = newFilters.symbol;
	params.value.marketId = newFilters.marketId ? newFilters.marketId : '';

	await getOrderList();
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

const showModalOrderDetail = ref(false);
const openModalOrderDetail = (item: Order) => {
	orderItem.value = item;
	showModalOrderDetail.value = true;
};

const closeModalOrderDetail = () => {
	showModalOrderDetail.value = false;
};

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = String(newPage);
	await getOrderList();
};

onMounted(async () => {
	await getOrderList();
});
</script>
