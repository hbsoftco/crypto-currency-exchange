<template>
	<div>
		<ModalOrder
			v-if="showModalOrder"
			@close="closeModalOrder"
		/>
		<FilterSearch />
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
						v-for="(item, index) in items"
						:key="index"
						:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
						class="pb-1"
					>
						<td class="text-xs font-normal py-1">
							<span>{{ item.market }}</span>
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
								@click.prevent="openModalOrder"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="flex justify-center py-4">
			<UPagination
				:model-value="currentPage"
				:page-count="10"
				:total="100"
				:max="4"
				ul-class="flex space-x-2 bg-blue-500 border-none"
				li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500"
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
import ModalOrder from '~/components/pages/Spot/List/ModalDetailOrder.vue';
import { useSpot } from '~/composables/spot/useSpot';

const { loading, getOrderList } = useSpot();
console.log(loading);

const params = ref({
	marketId: '',
	symbol: '',
	orderSide: '',
	orderType: '',
	assetType: '',
	searchMode: '',
	uniqueTag: '',
	from: '',
	to: '',
	pageNumber: '',
	pageSize: '',
});

const fetchOrderList = async () => {
	try {
		const { result } = await getOrderList(params.value);
		console.log(result);
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};

onMounted(async () => {
	await fetchOrderList();
});

const items = [
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		orderNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		orderNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		orderNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		orderNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		orderNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',

	},

];

const showModalOrder = ref(false);

const openModalOrder = () => {
	showModalOrder.value = true;
};

const closeModalOrder = () => {
	showModalOrder.value = false;
};
const currentPage = ref(1);

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
