<template>
	<div class="h-72 overflow-y-scroll">
		<ModalOrder
			v-if="showModalOrder"
			@close="closeModalOrder"
		/>
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
					<!-- <th class="p-1 text-xs font-normal">
						{{ $t('average') }}
					</th> -->
					<th class="p-1 text-xs font-normal">
						{{ $t('amountFilled') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('filledValue') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('amount') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('remaining') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('price') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('date') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('orderNumber') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('detail') }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, index) in ordersList"
					:key="index"
					:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
					class="pb-1"
				>
					<td class="text-xs font-normal py-1">
						<span>{{ item.mSymbol }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ $t(item.orderTypeName) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ $t(item.sideName) }}</span>
					</td>
					<td
						class="text-xs font-normal py-1"
						:class="{ 'text-primary-yellow-light dark:text-primary-yellow-dark': item.orderStateName === 'ReadyToFill' }"
					>
						<span>{{ $t(item.orderStateName) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.reqQot) }}</span>
					</td>
					<!-- <td class="text-xs font-normal py-1">
							<span>{{ useNumber(item.average) }}</span>
						</td> -->
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.filledQnt) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.filledQot) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.reqQnt) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(remainingQuantity(item.reqQnt, item.filledQnt)) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.dealPrice) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(formatDateToIran(item.regTime)) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.oid) }}</span>
					</td>
					<td class="flex text-xs font-normal py-1">
						<IconInfo
							class="text-base cursor-pointer"
							@click.prevent="openModalOrder"
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { formatDateToIran } from '~/utils/persian-date';
import IconInfo from '~/assets/svg-icons/info.svg';
import { useNumber } from '~/composables/useNumber';
import ModalOrder from '~/components/pages/Spot/List/ModalDetailOrder.vue';
import { useSpot } from '~/composables/spot/useSpot';
import { SearchMode } from '~/utils/enums/order.enum';
import type { Order } from '~/types/response/spot.types';

const remainingQuantity = (reqQnt: string, filledQnt: string): number => {
	return parseFloat(reqQnt) - parseFloat(filledQnt);
};
const { getOrderList } = useSpot();

const totalCount = ref(0);

const params = ref({
	marketId: '',
	symbol: 'FETUSDT',
	orderSide: '',
	orderType: '',
	assetType: useEnv('assetType'),
	searchMode: SearchMode.ANY,
	uniqueTag: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});

const ordersList = ref<Order[]>();

const fetchOrderList = async () => {
	try {
		const { result } = await getOrderList(params.value);
		totalCount.value = result.totalCount;
		ordersList.value = result.rows;
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};

onMounted(async () => {
	await fetchOrderList();
});

const showModalOrder = ref(false);

const openModalOrder = () => {
	showModalOrder.value = true;
};

const closeModalOrder = () => {
	showModalOrder.value = false;
};
</script>
