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

		<div v-if="withdrawCoinFeesLoading">
			<UiLogoLoading />
		</div>

		<div v-else>
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
								ContractId
							</th>
							<th class="text-sm font-bold py-3">
								{{ $t("minimumWithdrawalAmount") }}
							</th>
							<th class="text-sm font-bold py-3">
								{{ $t("minimumWithdrawalAmount") }}
							</th>
							<th class="text-sm font-bold py-3">
								{{ $t("fee") }}
							</th>
							<th class="text-sm font-bold py-3">
								{{ $t("networkStatus") }}
							</th>
							<th class="text-sm text-center font-bold py-3">
								{{ $t("moreDetail") }}
							</th>
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
										class="w-8 h-8 ml-2"
										@error="handleImageError"
									>
									<div class="text-right">
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
							</td>
							<!-- logo -->

							<td class="py-1">
								<div
									v-for="(row, index) in item.withdraw.slice(0, 3)"
									:key="index"
									class="text-sm"
									dir="ltr"
								>
									{{ row.netName }}
								</div>
							</td>
							<!-- netName -->

							<td class="py-1">
								<div
									v-for="(row, index) in item.withdraw.slice(0, 3)"
									:key="index"
									class="text-sm cursor-pointer"
									dir="ltr"
									@click="copyText(row.contractId)"
								>
									<span :title="row.contractId">
										{{ formatContractId(row.contractId) }}
									</span>
								</div>
							</td>
							<!-- contractId -->

							<td class="py-1">
								<div
									v-for="(row, index) in item.withdraw.slice(0, 3)"
									:key="index"
									class="text-sm"
									dir="ltr"
								>
									{{ row.min }}
								</div>
							</td>
							<!-- min -->

							<td class="py-1">
								<div
									v-for="(row, index) in item.withdraw.slice(0, 3)"
									:key="index"
									class="text-sm"
									dir="ltr"
								>
									{{ priceFormat(row.max) }}
								</div>
							</td>
							<!-- max -->

							<td class="py-1">
								<div
									v-for="(row, index) in item.withdraw.slice(0, 3)"
									:key="index"
									class="text-sm"
									dir="ltr"
								>
									{{ row.fee }}
								</div>
							</td>
							<!-- fee -->

							<td class="py-1">
								<div
									v-for="(row, index) in item.withdraw.slice(0, 3)"
									:key="index"
									dir="ltr"
								>
									<span
										class="text-sm"
										:class="row.enabled ? 'text-green-500' : 'text-red-500'"
									>
										{{ row.enabled ? $t("active") : $t("inactive") }}
									</span>
								</div>
							</td>
							<!-- enabled -->

							<td class="py-2 text-center">
								<div class="flex items-center h-full justify-center">
									<IconInfo
										class="text-2xl cursor-pointer text-primary-yellow-light dark:text-primary-yellow-dark"
									/>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- Desktop -->

			<div v-else>
				<div
					v-for="(item, index) in withdrawCoinFees"
					:key="index"
					class="bg-hover2-light dark:bg-hover2-dark rounded-none md:rounded-md py-1 my-2 px-2"
					@click="openSlideover(item)"
				>
					<div class="my-2">
						<div class="flex items-center mb-2">
							<img
								:src="`https://api-bitland.site/media/currency/${item?.currency?.cSymbol}.png`"
								alt="icon"
								class="w-8 h-8 ml-1"
								@error="handleImageError"
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
								v-for="deposit in item.withdraw"
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
									<span class="pl-1 text-xs text-nowrap text-ellipsis overflow-hidden truncate w-full max-w-full">
										{{ deposit.netName }}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<USlideover
					v-model="openSlide"
					prevent-close
					side="bottom"
					:ui="{
						height: 'h-screen max-h-[31.5rem]',
					}"
				>
					<UCard
						class="flex flex-col flex-1"
						:ui="{ body: {
								base: 'flex-1',
								padding: 'p-0',
							},
							ring: '' }"
					>
						<template #header>
							<div class="flex items-center justify-between">
								<h3 class="text-base font-normal leading-6 text-gray-900 dark:text-white flex">
									<img
										v-if="openSlideData?.currency?.cName"
										:src="`https://api-bitland.site/media/currency/${openSlideData?.currency.cSymbol}.png`"
										:alt="openSlideData?.currency.cName"
										class="w-6 h-6 rounded-full ml-1"
										format="webp"
										densities="x1"
										@error="handleImageError"
									>
									<span class="mr-1">{{ openSlideData?.currency?.cName }} (USDT)</span>
								</h3>
								<UButton
									color="gray"
									variant="ghost"
									icon="i-heroicons-x-mark-20-solid"
									class="-my-1 outline-none"
									@click="openSlide=false"
								/>
							</div>
						</template>
						<!-- header -->

						<div class="pt-2 max-h-[28rem] min-h-72 overflow-y-scroll pr-4 pl-1">
							<div class="p-1">
								<div
									v-for="(item, index) in openSlideData?.withdraw"
									:key="`${item.contractId}_${index}`"
									class="flex justify-between mb-4 border-b border-primary-gray-light dark:border-primary-gray-700 pb-4"
								>
									<div class="space-y-2">
										<div class="text-nowrap text-xs">
											{{ $t('networkType') }}
										</div>
										<div class="text-nowrap text-xs">
											{{ $t('contractId') }}
										</div>
										<div class="text-nowrap text-xs">
											{{ $t('fee') }}
										</div>
										<div class="text-nowrap text-xs">
											{{ $t('minimumWithdrawalAmount') }}
										</div>
										<div class="text-nowrap text-xs">
											{{ $t('maximumWithdrawalAmount') }}
										</div>
									</div>
									<div
										class="pl-1 space-y-2"
										dir="ltr"
									>
										<div class="w-full flex justify-start items-center">
											<IconCheckOn
												v-if="item.enabled"
												class="text-xl text-subtle-text-light dark:text-subtle-text-dark"
											/>
											<IconCheckOff
												v-else
												class="text-xl text-subtle-text-light dark:text-subtle-text-dark"
											/>
											<span class="pl-1 text-xs text-nowrap text-ellipsis overflow-hidden truncate w-full max-w-full">
												{{ item.netName }}
											</span>
										</div>
										<!-- netName -->
										<div
											class="text-xs"
											@click="copyText(item.contractId)"
										>
											{{ formatContractId(item.contractId) }}
										</div>
										<!-- contractId -->
										<div class="text-xs">
											{{ item.fee }}
										</div>
										<!-- fee -->
										<div class="text-xs">
											{{ item.min }}
										</div>
										<!-- min -->
										<div class="text-xs">
											{{ priceFormat(item.max) }}
										</div>
										<!-- max -->
									</div>
								</div>
								<!-- end item -->
							</div>
						</div>
					</UCard>
				</USlideover>
			</div>
			<!-- Mobile -->

			<div class="flex justify-center py-4">
				<UPagination
					v-if="totalCount > 20"
					:model-value="Number(withdrawCoinListParams.pageNumber)"
					:page-count="Number(withdrawCoinListParams.pageSize)"
					:total="totalCount"
					:max="6"
					size="sm"
					@update:model-value="onPageChange"
				/>
			</div>
			<!-- pagination -->
		</div>
	</div>
</template>

<script setup lang="ts">
import IconInfo from '~/assets/svg-icons/info.svg';
import IconCheckOff from '~/assets/svg-icons/ic_check_off.svg';
import IconCheckOn from '~/assets/svg-icons/ic_check_on.svg';
import { withdrawRepository } from '~/repositories/withdraw.repository';
import type { WithdrawCoinFee, WithdrawCoinFeesParams } from '~/types/definitions/withdraw.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { formatContractId, priceFormat, handleImageError } from '~/utils/helpers';

const { $mobileDetect, $api } = useNuxtApp();
const withdrawRepos = withdrawRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const totalCount = ref(0);

const openSlide = ref<boolean>(false);
const openSlideData = ref<WithdrawCoinFee | null>(null);
const openSlideover = (deposit: WithdrawCoinFee) => {
	openSlideData.value = deposit;

	openSlide.value = true;
};

const { copyText } = useClipboard();
const worker = useBaseWorker();

const withdrawCoinListParams = ref<WithdrawCoinFeesParams>({
	pageNumber: '1',
	pageSize: '20',
	statement: '',
});
const withdrawCoinFeesLoading = ref<boolean>(true);
const withdrawCoinFees = ref<WithdrawCoinFee[]>([]);
const getWithdrawCoinFees = async () => {
	try {
		withdrawCoinFeesLoading.value = true;

		const { result } = await withdrawRepos.getWithdrawCoinFees(withdrawCoinListParams.value);
		withdrawCoinFees.value = await worker.addCurrencyToWithdrawCoinFee(
			useEnv('apiBaseUrl'),
			result.rows as WithdrawCoinFee[],
		);

		withdrawCoinFees.value = withdrawCoinFees.value.map((fee) => ({
			...fee,
			withdraw: fee.withdraw.sort((a, b) => {
				if (a.enabled === b.enabled) return 0;
				return a.enabled ? -1 : 1;
			}),
		}));

		totalCount.value = result.totalCount;

		withdrawCoinFeesLoading.value = false;
	}
	catch (error) {
		withdrawCoinFeesLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getWithdrawCoinFees();
});

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
const search = ref('');
watch(search, (newValue) => {
	if (searchTimeout) {
		clearTimeout(searchTimeout);
	}

	searchTimeout = setTimeout(async () => {
		withdrawCoinListParams.value.statement = newValue;

		await getWithdrawCoinFees();
	}, 2000);
});

const onPageChange = async (newPage: number) => {
	withdrawCoinListParams.value.pageNumber = String(newPage);
	await getWithdrawCoinFees();
};
</script>
