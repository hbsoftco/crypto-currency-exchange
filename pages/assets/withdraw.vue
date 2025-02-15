<template>
	<div v-if="networksLoading">
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
						@change="onChange"
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
											:error-message="v$.blockchainProtocolId.$error? $t('fieldIsRequired') : ''"
										/>
									</div>
									<!-- blockchainProtocolId -->

									<div v-if="memoStatus">
										<FormsFieldInput
											id="memo"
											v-model="dto.memoDes"
											type="text"
											input-class="text-left"
											label="memoTag"
											placeholder=""
											icon=""
											dir="ltr"
											color-type="transparent"
											:error-message="v$.memoDes.$error? $t('fieldIsRequired') : ''"
										/>
									</div>
									<!-- memo -->

									<div class="pt-0">
										<div class="text-left mb-1">
											<ULink
												to="/user/wbl"
												class="text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
											>
												{{ $t('manageAddresses') }}
											</ULink>
										</div>
										<FormsTextareaFieldInput
											id="address"
											v-model="dto.addressDes"
											type="text"
											:clickable="true"
											input-class="text-left"
											label="address"
											placeholder=""
											icon="i-heroicons-wallet"
											dir="ltr"
											rows="2"
											color-type="transparent"
											:error-message="v$.addressDes.$error? $t('fieldIsRequired') : ''"
											@icon-clicked="openAddresses()"
										/>
									</div>
									<!-- address -->

									<Addresses
										v-model="openAddressesModal"
										:srch-blockchain-id="selectedNetwork ? String(selectedNetwork?.chainId) : ''"
										@selected-item="getAddress($event)"
									/>

									<div>
										<div class="flex justify-end items-center">
											<div>
												<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
													{{ $t('removable') }}:
												</span>
												<span class="mr-1 text-xs font-normal text-left">{{ withdrawable }}</span>
												<span class="mr-1 text-xs font-normal text-left">{{ selectedCurrency?.cSymbol }}</span>
											</div>
											<UButton
												class="mr-2 text-primary-yellow-light hover:bg-hover-light dark:hover:bg-secondary-gray-dark dark:text-primary-yellow-dark bg-hover-light dark:bg-secondary-gray-dark py-1 text-xs font-bold"
												@click="selectAllBalance()"
											>
												{{ $t('selectAll') }}
											</UButton>
										</div>
										<FormsFieldInput
											id="value"
											v-model="dto.value"
											mt-class="mt-1"
											type="text"
											input-class="text-left"
											label="withdrawValue"
											placeholder=""
											icon=""
											dir="ltr"
											color-type="transparent"
											:error-message="v$.value.$error? $t('fieldIsRequired') : ''"
										/>
									</div>
									<!-- value -->

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
											:loading="loading"
											@click="openVerifyModal()"
										>
											{{ $t("confirm") }}
										</UButton>
									</div>

									<div
										v-if="selectedNetwork"
										class="mt-8 mb-3 border border-secondary-gray-light dark:border-secondary-gray-dark bg-background-light dark:bg-background-50 p-4 rounded-md"
									>
										<div class="flex justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm">
											<label for="min">{{ $t('minWithdraw') }}</label>
											<p
												id="min"
												dir="ltr"
											>
												{{ selectedNetwork?.min }} {{ selectedCurrency?.cSymbol }}
											</p>
										</div>
										<!-- min -->
										<div class="flex mt-3 justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm">
											<label for="max">{{ $t('maxWithdraw') }}</label>
											<p
												id="max"
												dir="ltr"
											>
												{{ selectedNetwork?.max }} {{ selectedCurrency?.cSymbol }}
											</p>
										</div>
										<!-- max -->
										<div class="flex mt-3 justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm">
											<label for="fee">{{ $t('fee') }}</label>
											<p
												id="fee"
												dir="ltr"
											>
												{{ selectedNetwork?.fee }} {{ selectedCurrency?.cSymbol }}
											</p>
										</div>
										<!-- fee -->
										<div
											v-if="selectedNetwork?.contractId"
											class="flex mt-3 justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm"
										>
											<label for="fee">{{ $t('contractId') }}</label>
											<p
												id="contractId"
												dir="ltr"
											>
												<span
													class="cursor-pointer"
													@click="copyText(selectedNetwork?.contractId)"
												>
													{{ formatContractId(selectedNetwork.contractId) }}
												</span>
											</p>
										</div>
										<!-- contractId -->
									</div>
									<!-- selected network data -->
								</div>
								<!-- First tab -->
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
											id="userMobileOrEmail"
											v-model="internalDto.userMobileOrEmail"
											mt-class="mt-0"
											type="text"
											input-class="text-left"
											label="emailOrMobile"
											placeholder=""
											icon="i-heroicons-user"
											:clickable="true"
											dir="ltr"
											rows="2"
											color-type="transparent"
											:error-message="internalV$.userMobileOrEmail.$error? $t('fieldIsRequired') : ''"
											@icon-clicked="openUsers()"
										/>
									</div>
									<!-- emailOrMobile -->

									<div>
										<div class="flex justify-end items-center">
											<div>
												<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
													{{ $t('changeable') }}:
												</span>
												<span class="mr-1 text-xs font-normal text-left">{{ withdrawable }}</span>
												<span class="mr-1 text-xs font-normal text-left">{{ selectedCurrency?.cSymbol }}</span>
											</div>
											<UButton
												class="mr-2 text-primary-yellow-light hover:bg-hover-light dark:hover:bg-secondary-gray-dark dark:text-primary-yellow-dark bg-hover-light dark:bg-secondary-gray-dark py-1 text-xs font-bold"
												@click="selectAllBalance‌BitlandUsers()"
											>
												{{ $t('selectAll') }}
											</UButton>
										</div>
										<FormsFieldInput
											id="value"
											v-model="internalDto.value"
											mt-class="mt-1"
											type="text"
											input-class="text-left"
											label="changeValue"
											placeholder=""
											icon=""
											dir="ltr"
											color-type="transparent"
											:error-message="internalV$.value.$error? $t('fieldIsRequired') : ''"
										/>
									</div>
									<!-- Contacts -->

									<Contacts
										v-model="openUsersModal"
										:srch-blockchain-id="selectedNetwork ? String(selectedNetwork?.chainId) : ''"
										@selected-item="getContact($event)"
									/>

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
											:loading="internalLoading"
											@click="openInternalVerifyModal()"
										>
											{{ $t("confirm") }}
										</UButton>
									</div>
								</div>
								<!-- bitlandUsers -->
							</div>
						</template>
					</UTabs>
				</div>

				<UiVerifyModal
					v-if="isOpenVerifyModal"
					v-model="isOpenVerifyModal"
					:title="$t('withdraw')"
					:submit-loading="loading"
					:withdraw-status="true"
					@confirm="submit($event)"
				/>

				<UiVerifyModal
					v-if="isOpenInternalVerifyModal"
					v-model="isOpenInternalVerifyModal"
					:title="$t('withdraw')"
					:submit-loading="internalLoading"
					:withdraw-status="true"
					@confirm="internalSubmit($event)"
				/>
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
import useVuelidate from '@vuelidate/core';

import IconClose from '~/assets/svg-icons/close.svg';
import IconArrowDown from '~/assets/svg-icons/arrow-down-red.svg';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import RecentWithdrawTransactionsTable from '~/components/pages/Assets/Withdraw/RecentWithdrawTransactionsTable.vue';
import { saveToCache } from '~/utils/indexeddb';
import { CACHE_KEY_WITHDRAW_CRYPTO_NETWORKS } from '~/utils/constants/common';
import { DepositType } from '~/utils/enums/deposit.enum';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { handleImageError, formatContractId } from '~/utils/helpers';
import type { KeyValue } from '~/types/definitions/common.types';
import { withdrawRepository } from '~/repositories/withdraw.repository';
import type { WithdrawCryptoInternalRequestDto, WithdrawCryptoNetwork, WithdrawCryptoRequestDto, WithdrawCurrency } from '~/types/definitions/withdraw.types';
import type { Address, Contact, VerifyOutput } from '~/types/definitions/security.types';
import Addresses from '~/components/pages/Assets/Withdraw/Addresses.vue';
import Contacts from '~/components/pages/Assets/Withdraw/Contacts.vue';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const withdrawRepo = withdrawRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();
const toast = useToast();
const { copyText } = useClipboard();

const selectAllBalance = () => {
	dto.value.value = withdrawable.value;
};

const selectAllBalance‌BitlandUsers = () => {
	internalDto.value.value = withdrawable.value;
};

const withdrawable = ref('0.0');
const memoStatus = ref(false);

const openAddressesModal = ref(false);
const openAddresses = () => {
	openAddressesModal.value = true;
};

const openUsersModal = ref(false);
const openUsers = () => {
	openUsersModal.value = true;
};

const internalDto = ref<WithdrawCryptoInternalRequestDto>({
	verificationId: 0,
	verificationCode: '',
	v2FACode: null,
	currencyId: 1,
	withdrawPinCode: null,
	value: '',
	userMobileOrEmail: '',
});
const internalDtoRules = {
	verificationId: { },
	verificationCode: { },
	v2FACode: { },
	currencyId: { required: validations.required },
	withdrawPinCode: { },
	value: { required: validations.required },
	userMobileOrEmail: { required: validations.required },
};
const internalV$ = useVuelidate(internalDtoRules, internalDto);

const isOpenInternalVerifyModal = ref(false);
const openInternalVerifyModal = () => {
	internalV$.value.$touch();
	if (internalV$.value.$invalid) {
		return;
	}

	isOpenInternalVerifyModal.value = true;
};

const internalLoading = ref<boolean>(false);
const internalSubmit = async (event: VerifyOutput) => {
	if (event.verificationCode) {
		internalDto.value.verificationCode = event.verificationCode;
	}
	if (event.verificationId) {
		internalDto.value.verificationId = event.verificationId;
	}
	if (event.v2FACode) {
		internalDto.value.v2FACode = event.v2FACode;
	}
	if (event.withdrawPinCode) {
		internalDto.value.withdrawPinCode = event.withdrawPinCode;
	}

	internalLoading.value = true;
	try {
		await withdrawRepo.storeWithdrawInternalRequest(internalDto.value);

		toast.add({
			title: useT('deposit'),
			description: useT('cardPrintSuccessfully'),
			timeout: 5000,
			color: 'green',
		});
	}
	catch (error: any) {
		toast.add({
			title: useT('error'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
	finally {
		internalLoading.value = false;
	}
};

const dto = ref<WithdrawCryptoRequestDto>({
	verificationId: 0,
	verificationCode: '',
	v2FACode: null,
	currencyId: 1,
	withdrawPinCode: null,
	value: '',
	blockchainProtocolId: '',
	addressDes: '',
	memoDes: '',
});
const dtoRules = {
	verificationId: { },
	verificationCode: { },
	v2FACode: { },
	currencyId: { required: validations.required },
	withdrawPinCode: { },
	value: { required: validations.required },
	blockchainProtocolId: { required: validations.required },
	addressDes: { required: validations.required },
	memoDes: { },
};
const v$ = useVuelidate(dtoRules, dto);

const isOpenVerifyModal = ref(false);
const openVerifyModal = () => {
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	isOpenVerifyModal.value = true;
};

const loading = ref<boolean>(false);
const submit = async (event: VerifyOutput) => {
	if (event.verificationCode) {
		dto.value.verificationCode = event.verificationCode;
	}
	if (event.verificationId) {
		dto.value.verificationId = event.verificationId;
	}
	if (event.v2FACode) {
		dto.value.v2FACode = event.v2FACode;
	}
	if (event.withdrawPinCode) {
		dto.value.withdrawPinCode = event.withdrawPinCode;
	}

	loading.value = true;
	try {
		await withdrawRepo.storeWithdrawCryptoRequest(dto.value);

		toast.add({
			title: useT('deposit'),
			description: useT('cardPrintSuccessfully'),
			timeout: 5000,
			color: 'green',
		});
	}
	catch (error: any) {
		toast.add({
			title: useT('error'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
	finally {
		loading.value = false;
	}
};

const showGuide = ref(true);

const filteredCurrencies = ref<CurrencyBrief[]>();
const selectedCurrency = ref<CurrencyBrief>();
const selectedSymbol = ref<string>('BTC');

const network = ref('');
const networkItems = ref<KeyValue[]>([]);

const networksLoading = ref<boolean>(true);
const networks = ref<WithdrawCurrency[]>([]);
const networksFullData = ref<WithdrawCurrency | null>();
const selectedNetwork = ref<WithdrawCryptoNetwork | null>();
const getWithdrawNetworks = async () => {
	try {
		networksLoading.value = true;
		const { result } = await withdrawRepo.getWithdrawCryptoNetworks();
		await saveToCache(CACHE_KEY_WITHDRAW_CRYPTO_NETWORKS, result.rows);
		networks.value = result.rows as WithdrawCurrency[];

		if (selectedCurrency.value?.id !== undefined) {
			const networks = await worker.findWithdrawCurrencyNetworksByCurrencyId(selectedCurrency.value.id);
			networkItems.value = networks?.networks ? networks.networks : [];

			networksFullData.value = networks?.fullData ? networks?.fullData : null;
		}

		networksLoading.value = false;
	}
	catch (error) {
		console.log(error);
		networksLoading.value = false;
	}
};

watch(() => selectedCurrency.value, async (newValue) => {
	networkItems.value = [];
	network.value = '';
	if (newValue?.id !== undefined) {
		selectedNetwork.value = null;
		const networks = await worker.findWithdrawCurrencyNetworksByCurrencyId(newValue.id);
		networkItems.value = networks?.networks ? networks.networks : [];
		networksFullData.value = networks?.fullData ? networks.fullData : null;

		dto.value.currencyId = newValue.id;
	}
	updateStepStatus(1);
});

watch(() => dto.value.blockchainProtocolId, async (newValue) => {
	if (newValue) {
		console.log(networksFullData.value);

		selectedNetwork.value = null;
		selectedNetwork.value = networksFullData.value?.networks?.find((item) => item.netId === Number(newValue));

		withdrawable.value = networksFullData.value?.withdrawable || '';

		memoStatus.value = selectedNetwork.value?.memoable ?? false;
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
		initCurrencies(),
	]);
});

const updateStepStatus = (index: number) => {
	steps.value.forEach((step, i) => {
		step.completed = i < index;
		step.current = i === index;
	});
};

const getAddress = (event: Address) => {
	dto.value.addressDes = event.address;
	dto.value.memoDes = event.memo;
};

const getContact = (event: Contact) => {
	internalDto.value.userMobileOrEmail = String(event.contactUID);

	updateStepStatus(2);
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

const selectedTab = ref('address');

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

const onChange = (index: number) => {
	selectedTab.value = items[index].label;

	if (items[index].label === 'address') {
		steps.value[1].label = useT('networkSelected');
	}
	else {
		steps.value[1].label = useT('userSelect');
	}
};
</script>
