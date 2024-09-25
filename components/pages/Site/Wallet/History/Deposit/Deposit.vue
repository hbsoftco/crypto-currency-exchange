<template>
	<div>
		<!-- <DepositDetails
			v-if="showDetail"
			@close="closeDetail"
		/> -->
		<DepositDetailToman
			v-if="showDetail"
			@close="closeDetail"
		/>
		<FilterSearch />
		<div class="w-full overflow-y-scroll">
			<table class="min-w-full py-6 text-right">
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-5">
							{{ $t('date') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('invoiceNumber') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('currencyType') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('amount') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('status') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5" />
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="row in rows"
						:key="row.id"
						class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ useNumber(row.date) }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ useNumber(row.invoiceNumber) }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							<div class="flex">
								<NuxtImg
									src="/images/delete/bitcoin.png"
									alt="Brand Logo"
									class="w-4 h-4"
								/>
								<span class="mr-1">
									{{ useNumber(row.currencyType) }}

								</span>
							</div>
						</td>

						<td class="text-nowrap text-xs font-normal py-2">
							{{ useNumber(row.amount) }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ $t(row.status) }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							<UButton
								size="lg"
								class="text-base font-medium px-4 py-2 text-center bg-transparent-light dark:bg-transparency-dark text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark hover:text-text-light hover:dark:text-text-light "
								to=""
								@click="openDetail"
							>
								{{ $t("moreDetail") }}
							</UButton>
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
import FilterSearch from '~/components/pages/Site/Wallet/History/Deposit/FilterSearch.vue';
// import DepositDetails from '~/components/pages/Site/Wallet/History/Deposit/DepositDetails.vue';
import DepositDetailToman from '~/components/pages/Site/Wallet/History/Deposit/DepositDetailToman.vue';

const rows = ref([
	{ id: 1, date: '۱۴۰۲/۰۲/۲۴ - ۲۱:۳۵', invoiceNumber: '22222222222222222222', currencyType: ' بیتکوین ', amount: '115000', status: 'درحال انجام' },
	{ id: 1, date: '۱۴۰۲/۰۲/۲۴ - ۲۱:۳۵', invoiceNumber: '22222222222222222222', currencyType: ' بیتکوین ', amount: '115000', status: 'درحال انجام' },
	{ id: 1, date: '۱۴۰۲/۰۲/۲۴ - ۲۱:۳۵', invoiceNumber: '22222222222222222222', currencyType: ' بیتکوین ', amount: '115000', status: 'درحال انجام' },

]);
const showDetail = ref(false);
const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
const currentPage = ref(1);

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
