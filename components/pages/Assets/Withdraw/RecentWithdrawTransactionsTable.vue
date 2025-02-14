<template>
	<div class="w-full">
		<div v-if="withdrawTransactionsLoading">
			<UiLogoLoading />
		</div>

		<section v-else>
			<div class="py-2 flex justify-between border-b border-primary-gray-light dark:border-primary-gray-dark">
				<div>
					<h3 class="text-base font-bold">
						{{ $t('recentWithdraw') }}
					</h3>
				</div>
				<div>
					<ULink
						to="/assets/history"
						class="text-sm font-normal cursor-pointer"
					>
						{{ $t('historyWithdrawals') }}
					</ULink>
				</div>
			</div>

			<table
				class="min-w-full py-6 text-right"
			>
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-5">
							{{ $t('date') }}
						</th>
						<!-- date -->
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('invoiceNumber') }}
						</th>
						<!-- invoiceNumber -->
						<th class="pl-10 text-nowrap text-left text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('amount') }}
						</th>
						<!-- amount -->
						<th class="text-nowrap pr-10 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('status') }}
						</th>
						<!-- status -->
						<th
							v-if="columnsType === DepositType.FIAT"
							class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5"
						>
							{{ $t('shabaOrigin') }}
						</th>
						<!-- shabaOrigin FIAT -->
						<th
							v-if="columnsType === DepositType.CRYPTO"
							class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5"
						>
							{{ $t('network') }}
						</th>
						<!-- network CRYPTO -->
						<th
							v-if="columnsType === DepositType.CRYPTO"
							class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5"
						>
							TxHash
						</th>
						<!-- TxHash CRYPTO -->
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, index) in withdrawTransactions"
						:key="index"
						class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<td class="text-nowrap text-sm font-normal py-2">
							<span
								v-if="item.doneTime"
								dir="ltr"
							>
								{{ toPersianDate(item.doneTime, 'full-with-month') }}
							</span>
							<span
								v-else
								class="text-subtle-text-light dark:text-subtle-text-dark"
							>
								---
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
									{{ priceFormat(item.wValue) }} {{ item.currency?.cSymbol }}
								</span>
							</div>
						</td>
						<!-- cSymbol -->
						<td class="text-nowrap text-sm font-normal py-2 pr-10">
							{{ item.stateName }}
						</td>
						<!-- stateName -->
						<td
							v-if="columnsType === DepositType.FIAT"
							class="text-nowrap text-sm font-normal py-2"
						>
							<span
								dir="ltr"
								class="cursor-pointer"
								:title="item.bankIban"
								@click="copyText(item.bankIban)"
							>
								{{ formatContractId(item.bankIban) }}
							</span>
						</td>
						<!-- bankIban FIAT -->
						<td
							v-if="columnsType === DepositType.CRYPTO"
							class="text-nowrap text-sm font-normal py-2"
						>
							{{ item.blockchainName }}
						</td>
						<!-- blockchainName CRYPTO -->
						<td
							v-if="columnsType === DepositType.CRYPTO"
							class="text-nowrap text-sm font-normal py-2"
						>
							<template v-if="item.txCode">
								<a
									v-if="item.txExplorerUrl"
									:href="item.txExplorerUrl"
									dir="ltr"
									class="cursor-pointer"
									:title="item.txCode"
									target="_blank"
								>
									{{ formatContractId(item.txCode) }}
								</a>
								<span
									v-else
									dir="ltr"
								>
									{{ formatContractId(item.txCode) }}
								</span>
							</template>
							<span
								v-else
								class="text-subtle-text-light dark:text-subtle-text-dark"
							>
								---
							</span>
						</td>
						<!-- txCode CRYPTO -->
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>

<script setup lang="ts">
import { toPersianDate, priceFormat, formatContractId } from '~/utils/helpers';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { DepositTransactionsParams } from '~/types/definitions/deposit.types';
import { DepositType } from '~/utils/enums/deposit.enum';
import type { WithdrawTransaction } from '~/types/definitions/withdraw.types';
import { withdrawRepository } from '~/repositories/withdraw.repository';

interface PropsDefinition {
	columnsType: string;
}
const props = defineProps<PropsDefinition>();

const { $mobileDetect, $api } = useNuxtApp();
const withdrawRepo = withdrawRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const { copyText } = useClipboard();
const worker = useBaseWorker();

const params = ref<DepositTransactionsParams>({
	type: props.columnsType,
	currencyId: '',
	statement: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '5',
});
const withdrawTransactionsLoading = ref<boolean>(true);
const withdrawTransactions = ref<WithdrawTransaction[]>([]);
const getWithdrawTransactions = async () => {
	try {
		withdrawTransactionsLoading.value = true;

		const { result } = await withdrawRepo.getWithdrawTransactions(params.value);
		withdrawTransactions.value = await worker.addCurrencyToList(
			useEnv('apiBaseUrl'),
			result.rows as WithdrawTransaction[],
			'currencyId',
		);

		withdrawTransactionsLoading.value = false;
	}
	catch (error) {
		withdrawTransactionsLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getWithdrawTransactions();
});
</script>
