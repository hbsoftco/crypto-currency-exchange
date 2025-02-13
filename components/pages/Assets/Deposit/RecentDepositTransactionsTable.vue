<template>
	<div class="w-full">
		<div v-if="depositTransactionsLoading">
			<UiLogoLoading />
		</div>

		<section v-else>
			<div class="py-2 flex justify-between border-b border-primary-gray-light dark:border-primary-gray-dark">
				<div>
					<h3 class="text-base font-bold">
						{{ $t('recentDeposits') }}
					</h3>
				</div>
				<div>
					<ULink
						to="/assets/history"
						class="text-sm font-normal cursor-pointer"
					>
						{{ $t('historyDeposits') }}
					</ULink>
				</div>
			</div>

			<table class="min-w-full pb-6 text-right">
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-4">
							{{ $t('date') }}
						</th>
						<!-- date -->
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-4">
							{{ $t('invoiceNumber') }}
						</th>
						<!-- invoiceNumber -->
						<th class="pl-10 text-nowrap text-left text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-4">
							{{ $t('amount') }}
						</th>
						<!-- amount -->
						<th class="text-nowrap pr-10 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-4">
							{{ $t('status') }}
						</th>
					<!-- status -->
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, index) in depositTransactions"
						:key="index"
						class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark odd:bg-hover2-light dark:odd:bg-hover2-dark even:bg-background-light dark:even:bg-background-dark"
					>
						<td class="text-nowrap text-sm font-normal py-2">
							<span dir="ltr">
								{{ toPersianDate(item.txTime, 'full-with-month') }}
							</span>
						</td>
						<!-- txTime -->
						<td class="text-nowrap text-sm font-normal py-2">
							<span dir="ltr">{{ item.factorNo }}</span>
						</td>
						<!-- factorNo -->
						<td class="text-nowrap text-sm font-normal py-2">
							<div
								class="flex items-center ml-10"
								dir="ltr"
							>
								<img
									:src="`https://api-bitland.site/media/currency/${item.currency?.cSymbol}.png`"
									:alt="item.currency?.cName"
									class="w-6 h-6 rounded-full"
								>
								<span
									dir="ltr"
									class="ml-2"
								>
									{{ priceFormat(item.txValue) }} {{ item.currency?.cSymbol }}
								</span>
							</div>
						</td>
						<!-- cSymbol -->
						<td class="text-nowrap text-sm font-normal py-2 pr-10">
							<span
								:class="{ 'text-accent-green': item?.stateId === DepositStatus.SUCCEEDED }"
							>
								{{ item?.stateName }}
							</span>
						</td>
					<!-- stateName -->
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>

<script setup lang="ts">
import { toPersianDate, priceFormat } from '~/utils/helpers';
import { depositRepository } from '~/repositories/deposit.repository';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { DepositTransaction, DepositTransactionsParams } from '~/types/definitions/deposit.types';
import { DepositStatus, DepositType } from '~/utils/enums/deposit.enum';

const { $mobileDetect, $api } = useNuxtApp();
const depositRepo = depositRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();

const params = ref<DepositTransactionsParams>({
	type: DepositType.ANY,
	currencyId: '',
	statement: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '5',
});
const depositTransactionsLoading = ref<boolean>(true);
const depositTransactions = ref<DepositTransaction[]>([]);
const getDepositTransactions = async () => {
	try {
		depositTransactionsLoading.value = true;

		const { result } = await depositRepo.getDepositTransactions(params.value);
		depositTransactions.value = await worker.addCurrencyToList(
			useEnv('apiBaseUrl'),
			result.rows as DepositTransaction[],
			'currencyId',
		);

		depositTransactionsLoading.value = false;
	}
	catch (error) {
		depositTransactionsLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getDepositTransactions();
});
</script>
