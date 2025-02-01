<template>
	<div>
		<div class="py-4 px-2">
			<div>
				<h3 class="text-base font-medium pb-3">
					{{ $t('tomansDepositFee') }}
				</h3>
				<p class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">
					{{ $t('bitlandDoesNotCharge') }}
				</p>
				<div class="py-6">
					<h3 class="text-base font-medium pb-3">
						{{ $t('cryptoCurrencyDepositFee') }}
					</h3>
					<p class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">
						{{ $t('cryptoCurrencyDepositFeeSubtext') }}
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
			<div v-if="!isMobile">
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
						</tr>
					</thead>

					<tbody>
						<tr
							v-for="item in depositCoinFees"
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

			<div v-else>
				<div
					v-for="(item, index) in depositCoinFees"
					:key="index"
					class="bg-hover2-light dark:bg-hover2-dark rounded-none md:rounded-md py-1 my-2 px-2"
				>
					<div class="my-2">
						<div class="flex items-center mb-2">
							<img
								:src="`https://api-bitland.site/media/currency/${item?.currency?.cSymbol}.png`"
								alt="icon"
								class="w-8 h-8 ml-1"
							>
							<div class="text-right mr-2">
								<div
									class="border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
								>
									<span class="text-sm font-medium">
										{{ item.currency?.cName }}
									</span>
								</div>
								<div>
									<span class="text-sm font-medium">{{ item.currency?.cSymbol }}</span>
								</div>
							</div>
						</div>
						<div
							class="grid grid-cols-2 gap-1"
							dir="ltr"
						>
							<div
								v-for="deposit in item.deposit"
								:key="`${deposit.chainId}_id`"
								class="col-span-1"
							>
								<div class="w-full flex items-center">
									<IconCheckOn
										v-if="deposit.enabled"
										class="text-xl text-subtle-text-light dark:text-subtle-text-dark"
									/>
									<IconCheckOff
										v-else
										class="text-xl text-subtle-text-light dark:text-subtle-text-dark"
									/>
									<span class="pl-1 text-xs text-nowrap text-ellipsis overflow-hidden truncate w-full max-w-full">{{ deposit.netName }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconCheckOff from '~/assets/svg-icons/ic_check_off.svg';
import IconCheckOn from '~/assets/svg-icons/ic_check_on.svg';
import { depositRepository } from '~/repositories/deposit.repository';
import type { DepositCoinFee, DepositCoinFeesParams } from '~/types/definitions/deposit.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const { $mobileDetect, $api } = useNuxtApp();
const depositRepo = depositRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();

const depositCoinListParams = ref<DepositCoinFeesParams>({
	pageNumber: '1',
	pageSize: '20',
	statement: '',
});
const depositCoinFeesLoading = ref<boolean>(false);
const depositCoinFees = ref<DepositCoinFee[]>([]);
const getDepositCoinFees = async () => {
	try {
		depositCoinFeesLoading.value = true;

		const { result } = await depositRepo.getDepositCoinFees(depositCoinListParams.value);
		depositCoinFees.value = await worker.addCurrencyToDepositFee(
			useEnv('apiBaseUrl'),
			result.rows as DepositCoinFee[],
		);
		console.log(depositCoinFees.value);

		depositCoinFeesLoading.value = false;
	}
	catch (error) {
		depositCoinFeesLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getDepositCoinFees();
});

const search = ref('');
</script>
