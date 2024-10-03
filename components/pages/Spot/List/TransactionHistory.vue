<template>
	<div>
		<ModalTransaction
			v-if="showModalTransaction"
			@close="closeModalTransaction"
		/>
		<FilterSearch @filters="applyFilter" />
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
					<tr
						v-for="(item, index) in TransactionList"
						:key="index"
						:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
						class="pb-1"
					>
						<td class="text-xs font-normal py-1">
							<span>{{ item.mSymbol }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ item.type }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ item.direction }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(item.value) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(item.price) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(item.amountFilled) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(item.date) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(item.transactionNumber) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<span>{{ useNumber(item.orderNumber) }}</span>
						</td>
						<td class="text-xs font-normal py-1">
							<div class="flex">
								<span class="ml-1 text-[0.7rem] text-secondary-gray-light dark:text-secondary-gray-dark line-through">{{ useNumber(item.fee) }}</span>
								<span>{{ useNumber(item.fee) }}</span>
							</div>
						</td>
						<td class="flex text-xs font-normal py-1">
							<IconInfo
								class="text-base cursor-pointer"
								@click.prevent="openModalTransaction"
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
import FilterSearch from '~/components/pages/Spot/List/FilterSearch.vue';
import IconInfo from '~/assets/svg-icons/info.svg';
import { useNumber } from '~/composables/useNumber';
import ModalTransaction from '~/components/pages/Spot/List/ModalTransaction.vue';
import { useSpot } from '~/composables/spot/useSpot';
import type { OrderFiltersType, Trade } from '~/types/response/spot.types';

const { loading, getTradeList } = useSpot();
console.log(loading);

const totalCount = ref(0);

const params = ref({
	marketId: '',
	symbol: 'FETUSDT',
	orderSide: '',
	orderType: '',
	assetType: useEnv('assetType'),
	uniqueTag: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});

const TransactionList = ref<Trade[]>();

const fetchTransactionList = async () => {
	try {
		const { result } = await getTradeList(params.value);
		totalCount.value = result.totalCount;
		TransactionList.value = result.rows;
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};

const applyFilter = async (event: OrderFiltersType) => {
	params.value.from = event.from;
	params.value.to = event.to;
	params.value.orderType = event.orderType;
	params.value.orderSide = event.orderSide;
	params.value.symbol = event.symbol;

	await fetchTransactionList();
};

onMounted(async () => {
	await fetchTransactionList();
});
const showModalTransaction = ref(false);

const openModalTransaction = () => {
	showModalTransaction.value = true;
};

const closeModalTransaction = () => {
	showModalTransaction.value = false;
};

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = String(newPage);
};
</script>
