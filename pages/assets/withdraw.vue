<template>
	<div v-if="netWorksLoading">
		<UiLogoLoading />
	</div>
	<div
		v-else
		class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8"
	>
		<BackHeader
			v-if="isMobile"
			:title="$t('withdraw')"
		/>

		<div
			v-else
			class="my-4"
		>
			<div class="flex justify-between">
				<div>
					<UiTitleWithBack
						:title="$t('withdraw')"
					/>
				</div>
				<div>
					<ULink
						to="/help"
						class="cursor-pointer text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark "
					>
						{{ $t('howWithdraw') }}
					</ULink>
				</div>
			</div>
		</div>

		<section
			v-if="showGuide"
			class="pb-6 pt-10 relative"
		>
			<IconClose
				class="text-3xl text-subtle-text-light dark:text-subtle-text-dark cursor-pointer absolute top-3 left-0"
				@click="showGuide=false"
			/>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<template
					v-for="item in guideSteps"
					:key="item.key"
				>
					<UiTransferGuideBox
						:show-numbers="true"
						:step="item.step"
						:title="item.title"
						:description="item.description"
					/>
				</template>
			</div>
		</section>
		<!-- Steps -->

		<div class="block md:flex justify-between rounded-none md:rounded-md mt-0 md:mt-8 mb-0 md:mb-4 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
			<div class="mt-0 md:mt-10 px-3 md:px-0">
				<UiProgressStepper :steps="steps" />
			</div>
			<div class="w-full md:w-96 px-3 md:px-0">
				<div>
					<div class="my-8 relative">
						<span class="text-sm font-semibold z-10 absolute px-2 -top-3 right-2 bg-primary-gray-light dark:bg-primary-gray-dark">
							{{ $t('currencyName2') }}
						</span>
						<USelectMenu
							v-slot="{ open }"
							v-model="selectedCurrency"
							:loading="searchLoading"
							:searchable-placeholder="$t('search')"
							:searchable="search"
							:options="filteredCurrencies"
							:search-attributes="['cName', 'cSymbol']"
							option-attribute="cSymbol"
							trailing
							size="lg"
							:ui="{
								background: '',
								color: {
									white: {
										outline: ' bg-hover-light dark:bg-hover-dark',
									},
								},
							}"
						>
							<UButton
								size="lg"
								color="transparency"
								class="flex-1 justify-between text-text-dark dark:text-text-light border border-secondary-gray-light dark:border-secondary-gray-dark"
							>
								<div class="flex items-center">
									<img
										:src="`https://api-bitland.site/media/currency/${selectedCurrency?.cSymbol}.png`"
										:alt="selectedCurrency?.cSymbol"
										class="w-6 h-6 rounded-full"
										@error="handleImageError"
									>
									<span class="mr-2 font-medium">{{ selectedCurrency?.cSymbol }} ({{ selectedCurrency?.cName }})</span>
								</div>

								<IconArrowDown
									class="text-xl text-subtle-text-light dark:text-subtle-text-50 transition-all duration-200"
									:class="[open && 'transform rotate-180']"
								/>
							</UButton>
						</USelectMenu>
					</div>
					<!-- select currency -->

					<UTabs
						:items="items"
						dir="rtl"
						class="text-right"
						:ui="{
							container: 'mt-0',
							list: {
								padding: 'pl-4 pt-0',
								tab: {
									size: 'text-sm font-bold',
									padding: 'px-2',
								},
							},
						}"
					>
						<template #default="{ item, selected }">
							<span
								class="truncate"
								:class="[selected && 'text-primary-500 dark:text-primary-400']"
							>{{ $t(item.label) }}</span>
						</template>
						<template #item="{ item }">
							<div class="relative -top-3.5 border-t border-t-secondary-gray-light dark:border-t-secondary-gray-dark py-5">
								<div v-if="item.key === 'address'">
									<div class="pt-0">
										<div class="text-left mb-1">
											<ULink
												to="/assets/crypto-addresses"
												class="text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
											>
												{{ $t('manageAddresses') }}
											</ULink>
										</div>
										<FormsTextareaFieldInput
											id="address"
											v-model="address"
											type="text"
											input-class="text-left"
											label="address"
											placeholder=""
											icon="i-heroicons-wallet"
											dir="ltr"
											rows="2"
											color-type="transparent"
										/>
										<!-- :error-message="v$.txCode.$error? $t('fieldIsRequired') : ''" -->
									</div>
									<!-- address -->
									<div
										v-if="networkItems.length"
										class="mb-8"
									>
										<FormsDropDown
											id="network"
											v-model="dto.blockchainProtocolId"
											:options="networkItems"
											type="text"
											input-class="text-right"
											label="networkSelected"
											placeholder=""
											icon=""
											color-type="transparent"
										/>
									</div>
									<!-- select network -->

									<div>
										<FormsFieldInput
											id="memo"
											v-model="memo"
											type="text"
											input-class="text-left"
											label="memoTag"
											placeholder=""
											icon=""
											dir="ltr"
											color-type="transparent"
										/>
										<!-- :error-message="v$.email.$error? $t('fieldIsRequired') : ''" -->
									</div>
									<!-- memo -->

									<div>
										<div class="flex justify-end items-center">
											<div>
												<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
													{{ $t('removable') }}:
												</span>
												<span class="mr-1 text-xs font-normal text-left">{{ 1000 }}</span>
												<span class="mr-1 text-xs font-normal text-left">{{ selectedCurrency?.cSymbol }}</span>
											</div>
											<UButton
												class="mr-2 text-primary-yellow-light hover:bg-hover-light dark:hover:bg-secondary-gray-dark dark:text-primary-yellow-dark bg-secondary-gray-light dark:bg-secondary-gray-dark py-1 text-xs font-bold"
												@click="selectAllBalance()"
											>
												{{ $t('selectAll') }}
											</UButton>
										</div>
										<FormsFieldInput
											id="withdrawValue"
											v-model="withdrawValue"
											mt-class="mt-1"
											type="text"
											input-class="text-left"
											label="withdrawValue"
											placeholder=""
											icon=""
											dir="ltr"
											color-type="transparent"
										/>
										<!-- :error-message="v$.email.$error? $t('fieldIsRequired') : ''" -->
									</div>
									<!-- withdrawValue -->

									<div class="mt-8 mb-3">
										<div class="flex justify-between items-center mb-1">
											<label for="final-price">{{ $t('finalReceipt') }}</label>
											<p
												id="final-price"
												dir="ltr"
											>
												{{ 0 }} {{ selectedCurrency?.cSymbol }}
											</p>
										</div>
										<div class="flex justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm">
											<label for="final-price">{{ $t('fee') }}</label>
											<p
												id="final-price"
												dir="ltr"
											>
												{{ 0 }} {{ selectedCurrency?.cSymbol }}
											</p>
										</div>
									</div>

									<div>
										<UButton
											size="lg"
											block
										>
											{{ $t("confirm") }}
										</UButton>
									<!-- :loading="loading"
									@click="submit()" -->
									</div>

									<div class="mt-8 mb-3 border border-secondary-gray-light dark:border-secondary-gray-dark bg-background-light dark:bg-background-50 p-4 rounded-md">
										<div class="flex justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm">
											<label for="final-price">{{ $t('minWithdraw') }}</label>
											<p
												id="final-price"
												dir="ltr"
											>
												{{ 0 }} {{ selectedCurrency?.cSymbol }}
											</p>
										</div>
										<div class="flex my-2 justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm">
											<label for="final-price">{{ $t('maxWithdraw') }}</label>
											<p
												id="final-price"
												dir="ltr"
											>
												{{ 0 }} {{ selectedCurrency?.cSymbol }}
											</p>
										</div>
										<div class="flex justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm">
											<label for="final-price">{{ $t('fee') }}</label>
											<p
												id="final-price"
												dir="ltr"
											>
												{{ 0 }} {{ selectedCurrency?.cSymbol }}
											</p>
										</div>
									</div>
								</div>
								<div v-else-if="item.key === 'bitlandUsers'">
									<div class="pt-0">
										<div class="text-left mb-1">
											<ULink
												to="/user/wbl"
												class="text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
											>
												{{ $t('contactManagement') }}
											</ULink>
										</div>
										<FormsFieldInput
											id="emailOrMobile"
											v-model="address"
											mt-class="mt-0"
											type="text"
											input-class="text-left"
											label="emailOrMobile"
											placeholder=""
											icon="i-heroicons-user"
											dir="ltr"
											rows="2"
											color-type="transparent"
										/>
										<!-- :error-message="v$.txCode.$error? $t('fieldIsRequired') : ''" -->
									</div>
									<!-- emailOrMobile -->

									<div>
										<div class="flex justify-end items-center">
											<div>
												<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
													{{ $t('changeable') }}:
												</span>
												<span class="mr-1 text-xs font-normal text-left">{{ 1000 }}</span>
												<span class="mr-1 text-xs font-normal text-left">{{ selectedCurrency?.cSymbol }}</span>
											</div>
											<UButton
												class="mr-2 text-primary-yellow-light hover:bg-hover-light dark:hover:bg-secondary-gray-dark dark:text-primary-yellow-dark bg-secondary-gray-light dark:bg-secondary-gray-dark py-1 text-xs font-bold"
												@click="selectAllBalance()"
											>
												{{ $t('selectAll') }}
											</UButton>
										</div>
										<FormsFieldInput
											id="withdrawValue"
											v-model="withdrawValue"
											mt-class="mt-1"
											type="text"
											input-class="text-left"
											label="changeValue"
											placeholder=""
											icon=""
											dir="ltr"
											color-type="transparent"
										/>
										<!-- :error-message="v$.email.$error? $t('fieldIsRequired') : ''" -->
									</div>

									<div class="mt-8 mb-3">
										<div class="flex justify-between items-center mb-1">
											<label for="final-price">{{ $t('change2') }}</label>
											<p
												id="final-price"
												dir="ltr"
											>
												{{ 0 }} {{ selectedCurrency?.cSymbol }}
											</p>
										</div>
										<div class="flex justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm">
											<label for="final-price">{{ $t('fee') }}</label>
											<p id="final-price">
												{{ $t('free') }}
											</p>
										</div>
									</div>

									<div>
										<UButton
											size="lg"
											block
										>
											{{ $t("confirm") }}
										</UButton>
									<!-- :loading="loading"
									@click="submit()" -->
									</div>
								</div>
							</div>
						</template>
					</UTabs>
				</div>
			</div>
			<div class="my-8 px-3 md:px-0">
				<SideGuideBox
					fetch-type="Withdraw"
					currency-id="1"
					:type="DepositType.CRYPTO"
				/>
			</div>
		</div>
		<!-- Deposit -->

		<section class="py-8">
			<RecentWithdrawTransactionsTable :columns-type="DepositType.ANY" />
		</section>
		<!-- List -->
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import IconArrowDown from '~/assets/svg-icons/arrow-down-red.svg';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import RecentWithdrawTransactionsTable from '~/components/pages/Assets/Withdraw/RecentWithdrawTransactionsTable.vue';
import { saveToCache } from '~/utils/indexeddb';
import type { DepositCryptoRequestDto } from '~/types/definitions/deposit.types';
import { CACHE_KEY_WITHDRAW_CRYPTO_NETWORKS } from '~/utils/constants/common';
import { DepositType } from '~/utils/enums/deposit.enum';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { handleImageError } from '~/utils/helpers';
import type { KeyValue } from '~/types/definitions/common.types';
import { systemRepository } from '~/repositories/system.repository';
import { withdrawRepository } from '~/repositories/withdraw.repository';
import type { WithdrawCurrency, WorkerWithdrawNetwork } from '~/types/definitions/withdraw.types';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const withdrawRepo = withdrawRepository($api);
const systemRepo = systemRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();
// const toast = useToast();
// const { copyText } = useClipboard();

const selectAllBalance = () => {
	// dto.value.value = selectedCurrency.value.value;
};

const dto = ref<DepositCryptoRequestDto>({
	addressTypeId: null,
	currencyId: null,
	blockchainProtocolId: '',
});

const address = ref('');
const withdrawValue = ref('');
const memo = ref('');

// const submitLoading = ref<boolean>(false);
// const depositCryptoRequest = ref<DepositCryptoRequest | null>();
// const submit = async () => {
// 	try {
// 		submitLoading.value = true;
// 		const { result } = await depositRepo.storeDepositCryptoRequest(dto.value);
// 		depositCryptoRequest.value = result as DepositCryptoRequest;

// 		toast.add({
// 			title: useT('deposit'),
// 			description: useT('cardPrintSuccessfully'),
// 			timeout: 5000,
// 			color: 'green',
// 		});

// 		updateStepStatus(3);
// 	}
// 	catch (error: any) {
// 		toast.add({
// 			title: useT('error'),
// 			description: error.response._data.message,
// 			timeout: 5000,
// 			color: 'red',
// 		});
// 	}
// 	finally {
// 		submitLoading.value = false;
// 	}
// };

const systemTime = ref<string>('');
const getSystemTime = async () => {
	try {
		const { result } = await systemRepo.getSystemTime();
		systemTime.value = result;
	}
	catch (error) {
		console.log(error);
	}
};

const showGuide = ref(true);

const filteredCurrencies = ref<CurrencyBrief[]>();
const selectedCurrency = ref<CurrencyBrief>();
const selectedSymbol = ref<string>('BTC');

const network = ref('');
const networkItems = ref<KeyValue[]>([]);

const netWorksLoading = ref<boolean>(true);
const networks = ref<WithdrawCurrency[]>([]);
const networksFullData = ref<WithdrawCurrency | null>();
const selectedNetworksFullData = ref<WorkerWithdrawNetwork | null>();
const getWithdrawNetworks = async () => {
	try {
		netWorksLoading.value = true;
		const { result } = await withdrawRepo.getWithdrawCryptoNetworks();
		await saveToCache(CACHE_KEY_WITHDRAW_CRYPTO_NETWORKS, result.rows);
		networks.value = result.rows as WithdrawCurrency[];

		if (selectedCurrency.value?.id !== undefined) {
			const networks = await worker.findWithdrawCurrencyNetworksByCurrencyId(selectedCurrency.value.id);
			networkItems.value = networks?.networks ? networks.networks : [];

			console.log(networkItems.value);

			networksFullData.value = networks?.fullData ? networks.fullData : null;
		}

		netWorksLoading.value = false;
	}
	catch (error) {
		console.log(error);
		netWorksLoading.value = false;
	}
};

watch(() => selectedCurrency.value, async (newValue) => {
	networkItems.value = [];
	network.value = '';
	if (newValue?.id !== undefined) {
		selectedNetworksFullData.value = null;
		const networks = await worker.findWithdrawCurrencyNetworksByCurrencyId(newValue.id);
		networkItems.value = networks?.networks ? networks.networks : [];
		networksFullData.value = networks?.fullData ? networks.fullData : null;

		dto.value.currencyId = newValue.id;
		dto.value.addressTypeId = newValue.typeId;

		networkSelected.value = null;
		// depositCryptoRequest.value = null;
	}
	updateStepStatus(1);
});

const networkSelected = ref<KeyValue | null>();
watch(() => dto.value.blockchainProtocolId, async (newValue) => {
	if (newValue) {
		selectedNetworksFullData.value = null;
		networkSelected.value = networkItems.value.find((item) => item.key === newValue);
		// selectedNetworksFullData.value = networksFullData.value?.networks?.find((item) => item.netId === Number(newValue));

		// depositCryptoRequest.value = null;
		updateStepStatus(2);
	}
}, { deep: true });

const currenciesLoading = ref<boolean>(true);
const initCurrencies = async () => {
	currenciesLoading.value = true;
	filteredCurrencies.value = await worker.searchDepositCryptoCurrencies('', 400, useEnv('apiBaseUrl'));
	currenciesLoading.value = false;
};

const searchLoading = ref<boolean>(false);
const search = async (q: string) => {
	searchLoading.value = true;

	let inputs: CurrencyBrief[] = [];
	if (!q) {
		inputs = await worker.searchWithdrawCryptoCurrencies('', 400, useEnv('apiBaseUrl'));
	}
	else {
		inputs = await worker.searchWithdrawCryptoCurrencies(q.toLowerCase(), 200, useEnv('apiBaseUrl'));
	}

	if (selectedSymbol.value) {
		const result = await worker.getReadyCurrencyWithIndex(useEnv('apiBaseUrl'), inputs, selectedSymbol.value);

		if (result) {
			filteredCurrencies.value = result.updatedCurrencies;
			selectedCurrency.value = filteredCurrencies.value[result.index];
		}
	}

	searchLoading.value = false;
	return filteredCurrencies.value || [];
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
	updateStepStatus(1);
	await nextTick();

	await Promise.all([
		getWithdrawNetworks(),
		getSystemTime(),
		initCurrencies(),
	]);
});

const updateStepStatus = (index: number) => {
	steps.value.forEach((step, i) => {
		step.completed = i < index;
		step.current = i === index;
	});
};

const items = [
	{
		key: 'address',
		label: 'address',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'bitlandUsers',
		label: 'bitlandUsers',
		content: 'And, this is the content for Tab2',
	},
];

const steps = ref([
	{ label: useT('chooseCurrency'), completed: true, current: false },
	{ label: useT('networkSelected'), completed: false, current: true },
	{ label: useT('withdrawPrice'), completed: false, current: false },
]);

const guideSteps = [
	{ key: 'guide_1', step: '1', title: useT('chooseCurrency'), description: useT('withdrawStepOne') },
	{ key: 'guide_2', step: '2', title: useT('withdrawalConfirmation'), description: useT('withdrawalConfirmationStepTwo') },
	{ key: 'guide_3', step: '3', title: useT('harvestSuccessfully'), description: useT('harvestSuccessfullyStepThree') },
];
</script>
