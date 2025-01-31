<template>
	<div>
		<div class="py-4 px-2">
			<div>
				<h3 class="text-base font-medium pb-3">
					{{ $t('tomanWithdrawalFee') }}
				</h3>
				<p class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">
					{{ $t('bitlandDoesNotCharge') }}
				</p>
				<div class="py-6">
					<h3 class="text-base font-medium pb-3">
						{{ $t('cryptocurrencyWithdrawalFee') }}
					</h3>
					<p class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">
						{{ $t('cryptocurrencyWithdrawalFeeSubtext') }}
					</p>
				</div>
			</div>
			<!-- Descriptions -->
			<div class="w-full md:w-96">
				<FormsFieldInput
					id="search"
					v-model="search"
					type="text"
					input-class="text-right"
					label="search"
					placeholder=""
					icon="heroicons:magnifying-glass"
				/>
			</div>
			<!-- Search Statement -->
		</div>
		<div>
			<div class="hidden md:block">
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
								{{ $t("withdrawalFee") }}
							</th>
							<th class="text-sm font-bold py-3">
								{{ $t("minimumWithdrawalAmount") }}
							</th>
							<th class="text-sm font-bold py-3">
								{{ $t("networkStatus") }}
							</th>
							<th class="text-sm font-bold py-3" />
						</tr>
					</thead>

					<tbody>
						<tr
							v-for="item in withdrawCoinFees"
							:key="item.cid"
							class="border-b border-primary-gray-light dark:border-primary-gray-dark text-right hover:bg-hover-light dark:hover:bg-hover-dark"
						>
							<td class="py-2">
								<div class="flex items-center">
									<img
										:src="`https://api-bitland.site/media/currency/${item?.currency?.cSymbol}.png`"
										alt="icon"
										class="w-8 h-8 ml-1"
									>
									<div class="text-right">
										<div
											class="border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
										>
											<span class="text-base font-medium">
												{{ item.currency?.cName }}
											</span>
										</div>
										<div>
											<span class="text-base font-medium">{{ item.currency?.cSymbol }}</span>
										</div>
									</div>
								</div>
							</td>

							<td class="py-2">
								<!-- <div
									v-for="(networkType, index) in props.networkTypes"
									:key="index"
								>
									{{ networkType }}
								</div> -->
							</td>

							<td class="py-2">
								<!-- <div
									v-for="(amount, index) in props.minimumDepositAmounts"
									:key="index"
								>
									{{ amount }}
								</div> -->
							</td>

							<td class="py-2">
								<!-- <div
									v-for="(status, index) in props.networkStatuses"
									:key="index"
								>
									<span :class="status === 'active' ? 'text-green-500' : 'text-red-500'">
										{{ status === "active" ? $t("active") : $t("inactive") }}
									</span>
								</div> -->
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { withdrawRepository } from '~/repositories/withdraw.repository';
import type { WithdrawCoinFee, WithdrawCoinFeesParams } from '~/types/definitions/withdraw.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const { $mobileDetect, $api } = useNuxtApp();
const withdrawRepos = withdrawRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();

const withdrawCoinListParams = ref<WithdrawCoinFeesParams>({
	pageNumber: '1',
	pageSize: '20',
	statement: '',
});
const withdrawCoinFeesLoading = ref<boolean>(false);
const withdrawCoinFees = ref<WithdrawCoinFee[]>([]);
const getDepositCoinFees = async () => {
	try {
		withdrawCoinFeesLoading.value = true;

		const { result } = await withdrawRepos.getWithdrawCoinFees(withdrawCoinListParams.value);
		withdrawCoinFees.value = await worker.addCurrencyToWithdrawCoinFee(
			useEnv('apiBaseUrl'),
			result.rows as WithdrawCoinFee[],
		);

		withdrawCoinFeesLoading.value = false;
	}
	catch (error) {
		withdrawCoinFeesLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getDepositCoinFees();
});

const search = ref('');
</script>
