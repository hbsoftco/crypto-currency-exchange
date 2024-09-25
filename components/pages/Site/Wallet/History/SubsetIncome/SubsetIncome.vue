<template>
	<div>
		<FilterSearch />
		<div class="w-full overflow-y-scroll">
			<table class="min-w-full py-6 text-right">
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-5">
							{{ $t('subSet') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('userCode') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('tradingTime') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('feeTime') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('feePercentage') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('feeAmount') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="row in rows"
						:key="row.id"
						class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ $t('row.subSet') }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ $t('row.userCode') }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ useNumber(row.tradingTime) }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ useNumber(row.feeTime) }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ useNumber(row.feePercentage) }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ useNumber(row.feeAmount) }}
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
import { useNumber } from '~/composables/useNumber';
import FilterSearch from '~/components/pages/Site/Wallet/History/SubsetIncome/FilterSearch.vue';

const rows = ref([
	{ id: 1, subSet: 'حساب دوستان', userCode: 'UID ', tradingTime: 'زمان دعوت', feeTime: 'تومان', feePercentage: 'تومان', feeAmount: 'تومان' },
	{ id: 1, subSet: 'حساب دوستان', userCode: 'UID ', tradingTime: 'زمان دعوت', feeTime: 'تومان', feePercentage: 'تومان', feeAmount: 'تومان' },
	{ id: 1, subSet: 'حساب دوستان', userCode: 'UID ', tradingTime: 'زمان دعوت', feeTime: 'تومان', feePercentage: 'تومان', feeAmount: 'تومان' },

]);
const currentPage = ref(1);

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
