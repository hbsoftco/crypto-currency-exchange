<template>
	<div class="h-72 overflow-y-scroll">
		<ModalTransaction
			v-if="showModalTransaction"
			@close="closeModalTransaction"
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
						{{ $t('fee') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('detail') }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, index) in tradesList"
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
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.reqQot) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.dealPrice) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.filledQnt) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(formatDateToIranTime(item.regTime)) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.tid) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<div class="flex">
							<span class="ml-1 text-[0.7rem] text-secondary-gray-light dark:text-secondary-gray-dark line-through">{{ useNumber(item.feeRawQot) }}</span>
							<span>{{ useNumber(item.feeRawQot) }}</span>
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
</template>

<script setup lang="ts">
import { formatDateToIranTime } from '~/utils/persian-date';
import IconInfo from '~/assets/svg-icons/info.svg';
import { useNumber } from '~/composables/useNumber';
import ModalTransaction from '~/components/pages/Spot/List/ModalTransaction.vue';
import { useSpot } from '~/composables/spot/useSpot';
import type { Trade } from '~/types/response/spot.types';

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

const tradesList = ref<Trade[]>();

const fetchTradeList = async () => {
	try {
		const { result } = await getTradeList(params.value);
		totalCount.value = result.totalCount;
		tradesList.value = result.rows;
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};

onMounted(async () => {
	await fetchTradeList();
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
	await fetchTradeList();
};
</script>
