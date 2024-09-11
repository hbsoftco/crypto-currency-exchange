<template>
	<div>
		<div class="p-0 md:p-4 pt-2 md:pt-0 mt-8">
			<table
				class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light"
			>
				<thead>
					<tr
						class="border-b border-primary-gray-light dark:border-primary-gray-dark text-right"
					>
						<th class="text-sm font-bold py-3">
							{{ $t("cryptocurrency") }}
						</th>
						<th class="text-sm font-bold py-3">
							{{ $t("networkType") }}
						</th>
						<th class="text-sm font-bold py-3">
							{{ $t("minimumDepositAmount") }}
						</th>
						<th class="text-sm font-bold py-3">
							{{ $t("networkStatus") }}
						</th>
						<th class="text-sm font-bold py-3" />
					</tr>
				</thead>

				<tbody>
					<TableFeesRow
						v-for="(row, index) in tableData"
						:key="index"
						:cryptocurrency="row.cryptocurrency"
						:symbol="row.symbol"
						:icon-src="row.iconSrc"
						:network-types="row.networkTypes"
						:minimum-deposit-amounts="row.minimumDepositAmounts"
						:network-statuses="row.networkStatuses"
						:is-even="index % 2 === 0"
					/>
				</tbody>
			</table>
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
	</div>
</template>

<script setup lang="ts">
import TableFeesRow from '~/components/pages/Site/Account/Fees/TableFeesRow.vue';

// داده‌ها که از سمت سرور می‌آیند
const tableData = ref([
	{
		cryptocurrency: 'بیت کوین',
		symbol: 'BTC',
		iconSrc: '/images/delete/bitcoin.png',
		networkTypes: ['ERC20', 'BEP20', 'TRC20'],
		minimumDepositAmounts: ['0.0005 BTC', '0.0002 BTC', '0.0001 BTC'],
		networkStatuses: ['active', 'inactive', 'active'],
	},
	{
		cryptocurrency: 'اتریوم',
		symbol: 'ETH',
		iconSrc: '/images/delete/fish.png',
		networkTypes: ['ERC20', 'BEP20'],
		minimumDepositAmounts: ['0.05 ETH', '0.02 ETH'],
		networkStatuses: ['inactive', 'active'],
	},
	// داده‌های بیشتر...
]);

const currentPage = ref(1);

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
