<template>
	<div>
		<ModalTransactionDetail
			v-if="showModalTransactionDetail && tradeItem"
			:trade-item="tradeItem"
			@close="closeModalTransactionDetail"
		/>
		<FilterOptions
			class="hidden md:block"
			@filters="applyFilter"
		/>
		<div class="h-auto overflow-y-scroll">
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
							{{ $t('value') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('price') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('amountFilled') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('date') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('transactionNumber') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('orderNumber') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('fee') }}
						</th>
						<th class="p-1 text-xs font-normal">
							{{ $t('action') }}
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
						:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
						class="pb-1"
					>
						<td class="text-xs font-normal py-1">
							<span>{{ trade.mSymbol }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ $t(trade.orderTypeName) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ $t(trade.sideName) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(trade.reqQot) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(trade.dealPrice) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(trade.filledQnt) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(formatDateToIran(trade.regTime)) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(trade.tid) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(trade.oid) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<div class="flex">
								<span class="ml-1 text-[0.7rem] text-secondary-gray-light dark:text-secondary-gray-dark line-through">{{ useNumber(trade.feeRawQot) }}</span>
								<span>{{ useNumber(trade.feeRawQot) }}</span>
							</div>
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
		</div>
		<div class="flex justify-center py-4">
			<UPagination
				:model-value="Number(params.pageNumber)"
				:page-count="20"
				:total="totalCount"
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
import { formatDateToIran } from '~/utils/persian-date';
import FilterOptions from '~/components/pages/Spot/List/FilterOptions.vue';
import IconInfo from '~/assets/svg-icons/info.svg';
import { useNumber } from '~/composables/useNumber';
import ModalTransactionDetail from '~/components/pages/Spot/List/ModalTransactionDetail.vue';
import { spotRepository } from '~/repositories/spot.repository';
import type { OrderFiltersType, Trade, TradeListParams } from '~/types/definitions/spot.types';

const { $api } = useNuxtApp();
const spotRepo = spotRepository($api);

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

const tradesList = ref<Trade[]>();
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

const applyFilter = async (event: OrderFiltersType) => {
	params.value.symbol = event.symbol;
	params.value.from = event.from;
	params.value.to = event.to;
	params.value.orderType = event.orderType;
	params.value.orderSide = event.orderSide;

	await getTradeList();
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
