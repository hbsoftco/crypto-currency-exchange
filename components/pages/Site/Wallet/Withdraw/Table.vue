<template>
	<div>
		<PointModal
			v-if="showDetail"
			@close="closeDetail"
		/>
		<div class="py-2 flex justify-between border-b border-primary-gray-light dark:border-primary-gray-dark">
			<div>
				<h3 class="text-base font-bold">
					{{ $t('recentHarvest') }}
				</h3>
			</div>
			<div>
				<span class="text-sm font-normal cursor-pointer">
					{{ $t('historyWithdrawals') }}
				</span>
			</div>
		</div>
		<section>
			<div class="w-full overflow-y-scroll">
				<table class="min-w-full p-6 text-right ">
					<thead>
						<tr class="text-center pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark  text-subtle-text-light dark:text-subtle-text-dark">
							<th class="py-4 text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('date') }}
							</th>
							<th class="py-4 text-xs font-normal">
								{{ $t('invoiceNumber') }}
							</th>
							<th class="py-4 text-xs font-normal">
								{{ $t('currencyType') }}
							</th>
							<th class="py-4 text-xs font-normal">
								{{ $t('amount') }}
							</th>
							<th class="py-4 text-xs font-normal">
								{{ $t('status') }}
							</th>
							<th class="py-4 text-xs font-normal" />
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="row in rows"
							:key="row.id"
							:class="[row.id % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
							class="text-center py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
						>
							<td class="text-xs font-normal text-nowrap py-2">
								{{ row.date }}
							</td>
							<td class="text-xs font-normal text-nowrap py-2">
								{{ useNumber(row.invoiceNumber) }}
							</td>
							<td class="text-xs font-normal text-nowrap py-2">
								<div class=" flex justify-center items-center">
									<NuxtImg
										src="/images/delete/bitcoin.png"
										alt="Brand Logo"
										class="w-4 h-4 ml-1"
									/>
									{{ row.currencyType }}
								</div>
							</td>
							<td class="text-xs font-normal text-nowrap py-2">
								{{ row.amount }}
							</td>
							<td class="text-xs font-normal text-nowrap py-2">
								{{ useNumber(row.status) }}
							</td>
							<td class="text-xs font-normal text-nowrap py-2">
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
		</section>
	</div>
</template>

<script setup>
import { useNumber } from '~/composables/useNumber';
import PointModal from '~/components/pages/Site/Wallet/Deposit/PointModal.vue';

const rows = ref([
	{ id: 1, date: '۱۴۰۲/۰۲/۲۴ - ۲۱:۳۵', invoiceNumber: '22222222222222222222', currencyType: 'بیتکوین', amount: '115000', status: 'درحال انجام' },
	{ id: 2, date: '۱۴۰۲/۰۲/۲۴ - ۲۱:۳۵', invoiceNumber: '22222222222222222222', currencyType: 'بیتکوین', amount: '115000', status: 'درحال انجام' },
	{ id: 3, date: '۱۴۰۲/۰۲/۲۴ - ۲۱:۳۵', invoiceNumber: '22222222222222222222', currencyType: 'بیتکوین', amount: '115000', status: 'درحال انجام' },
]);

const showDetail = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
</script>
