<template>
	<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8">
		<BackHeader
			v-if="isMobile"
			:title="$t('deposit')"
		/>

		<div
			v-else
			class="my-4"
		>
			<div class="flex justify-between">
				<div>
					<UiTitleWithBack
						:title="$t('deposit')"
					/>
				</div>
				<div>
					<ULink
						to="/help"
						class="cursor-pointer text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark "
					>
						{{ $t('howDeposit') }}
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
			<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
				<template
					v-for="item in guideSteps"
					:key="item.key"
				>
					<UiTransferGuideBox
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
									<span class="mr-2 font-medium">{{ selectedCurrency?.cName }}</span>
								</div>

								<IconArrowDown
									class="text-xl text-subtle-text-light dark:text-subtle-text-50 transition-all duration-200"
									:class="[open && 'transform rotate-180']"
								/>
							</UButton>
						</USelectMenu>
					</div>
					<!-- select currency -->

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

					<div class="my-8">
						<div
							v-if="depositCryptoRequest"
							class="text-center mb-4"
						>
							<UButton
								:padded="false"
								:loading="sendDepositAddressToEmailLoading"
								variant="link"
								class="font-medium hover:no-underline"
								@click="sendDepositAddressToEmail"
							>
								{{ $t('depositNeedSecurityVerification') }}
							</UButton>
						</div>
						<div class="flex-1 justify-between text-text-dark dark:text-text-light border border-secondary-gray-light overflow-hidden dark:border-secondary-gray-dark rounded-md text-sm">
							<div class="text-center p-4 py-6">
								<div v-if="!depositCryptoRequest">
									<UButton
										:disabled="!dto.blockchainProtocolId"
										:loading="submitLoading"
										variant="link"
										class="font-medium hover:no-underline"
										@click="submit"
									>
										{{ $t('createNewDepositAddress') }}
									</UButton>
									<p class="mt-1">
										{{ $t('or') }}
									</p>
									<UButton
										variant="link"
										class="font-medium hover:no-underline"
										to="/assets/crypto-addresses"
									>
										{{ $t('manageOldDepositAddress') }}
									</UButton>
								</div>

								<div v-else>
									<div
										class="flex flex-col items-start pt-2 justify-center"
									>
										<div
											v-if="depositCryptoRequest?.memo"
											class="w-full border-b mb-6 border-secondary-gray-light dark:border-secondary-gray-dark"
										>
											<div>
												<vue-qrcode
													class="m-auto"
													:value="depositCryptoRequest?.memo"
													:size="100"
													:level="'H'"
													:background="'#ffffff'"
													:foreground="'#000000'"
												/>
											</div>
											<div>
												<p class="text-subtle-text-light dark:text-subtle-text-dark mt-4">
													<span>{{ $t('address') }}: </span>
												</p>
												<p class="w-full break-all my-5 font-semibold">
													Memo/tag
												</p>
												<p
													dir="ltr"
													class="w-full flex justify-center items-start break-all my-5 text-base font-semibold"
												>
													<IconCopy
														class="cursor-pointer text-2xl m-auto"
														@click="copyText(depositCryptoRequest?.memo)"
													/>
													<span class="ml-1">{{ depositCryptoRequest?.memo }}</span>
												</p>
											</div>
										</div>
										<!-- memo -->

										<div
											v-if="depositCryptoRequest?.publicAddress"
											class="w-full"
										>
											<div>
												<vue-qrcode
													class="m-auto"
													:value="depositCryptoRequest?.publicAddress"
													:size="100"
													:level="'H'"
													:background="'#ffffff'"
													:foreground="'#000000'"
												/>
											</div>
											<div class="text-center">
												<p class="text-subtle-text-light dark:text-subtle-text-dark mt-4">
													<span>{{ $t('address') }}: </span>
													<span>{{ networkSelected?.value }}</span>
												</p>
												<p
													dir="ltr"
													class="w-full flex justify-center items-start break-all my-5 text-base font-semibold"
												>
													<IconCopy
														class="cursor-pointer text-2xl m-auto"
														@click="copyText(depositCryptoRequest?.publicAddress)"
													/>
													<span class="ml-1">{{ depositCryptoRequest?.publicAddress }}</span>
												</p>
											</div>
										</div>
										<!-- public address -->
									</div>

									<div class="flex justify-center mt-5">
										<span>این آدرس بعد از</span>
										<span class="mx-2">
											<UiTimerCounter
												color="text-primary-yellow-light dark:text-primary-yellow-dark"
												:expire-after="depositCryptoRequest.expirationTime"
											/>
										</span>
										<span>منقضی می‌شود.</span>
									</div>

									<p class="text-accent-red dark:text-accent-red mt-6 text-right">
										{{ $t('noticeMessageDeposit') }}
									</p>
								</div>
							</div>
							<div class="bg-background-light dark:bg-background-50 p-4">
								<div class="flex justify-between">
									<div>
										<span class="text-subtle-text-light dark:text-subtle-text-dark">
											{{ $t('atLeastDepositPrice') }}
										</span>
									</div>
									<div dir="ltr">
										5 USDT
									</div>
								</div>
								<!-- atLeastDepositPrice -->

								<div
									v-if="(selectedNetworksFullData?.confirmationCo ?? 0) > 0"
									class="flex justify-between mt-2"
								>
									<div>
										<span class="text-subtle-text-light dark:text-subtle-text-dark">
											{{ $t('atLeastConfirmNetwork') }}
										</span>
									</div>
									<div>
										<span>{{ selectedNetworksFullData?.confirmationCo }} </span>
										<span>{{ $t('confirmNetwork') }}</span>
									</div>
								</div>
								<!-- atLeastConfirmNetwork -->

								<div
									v-if="selectedNetworksFullData"
									class="flex justify-between mt-2"
								>
									<div>
										<span class="text-subtle-text-light dark:text-subtle-text-dark">
											{{ $t('contractId') }}
										</span>
									</div>
									<div>
										<span @click="copyText(selectedNetworksFullData?.contractId)">
											{{ formatContractId(selectedNetworksFullData?.contractId) }}
										</span>
									</div>
								</div>
								<!-- contractId -->

								<div
									v-if="selectedNetworksFullData"
									class="flex justify-between mt-2"
								>
									<div>
										<span class="text-subtle-text-light dark:text-subtle-text-dark">
											{{ $t('fixedNetworkFee') }}
										</span>
									</div>
									<div>
										<span>
											{{ selectedNetworksFullData?.fee }}
										</span>
									</div>
								</div>
								<!-- fixedNetworkFee -->

								<div
									v-if="selectedNetworksFullData"
									class="flex justify-between mt-2"
								>
									<div>
										<span class="text-subtle-text-light dark:text-subtle-text-dark">
											{{ $t('networkPercentageFee') }}
										</span>
									</div>
									<div>
										<span>
											{{ selectedNetworksFullData?.percentage }}%
										</span>
									</div>
								</div>
								<!-- networkPercentageFee -->

								<div
									v-if="selectedNetworksFullData"
									class="flex justify-between mt-2"
								>
									<div>
										<span class="text-subtle-text-light dark:text-subtle-text-dark">
											{{ $t('importantPoints') }}
										</span>
									</div>
									<div>
										<span>
											{{ selectedNetworksFullData?.note }}
										</span>
									</div>
								</div>
								<!-- note -->
							</div>
						</div>
					</div>
					<!-- Qr Code and address -->
				</div>
			</div>
			<div class="my-8 px-3 md:px-0">
				<SideGuideBox
					fetch-type="Deposit"
					currency-id="1"
					:type="DepositType.CRYPTO"
				/>
			</div>
		</div>
		<!-- Deposit -->

		<section class="py-8">
			<RecentDepositTransactionsTable />
		</section>
		<!-- List -->
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import IconArrowDown from '~/assets/svg-icons/arrow-down-red.svg';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import RecentDepositTransactionsTable from '~/components/pages/Assets/Deposit/RecentDepositTransactionsTable.vue';
import { depositRepository } from '~/repositories/deposit.repository';
import { loadFromCache, saveToCache } from '~/utils/indexeddb';
import type { DepositCryptoNetwork, DepositCryptoRequest, DepositCryptoRequestDto, DepositCurrency } from '~/types/definitions/deposit.types';
import { CACHE_KEY_DEPOSIT_CRYPTO_NETWORKS } from '~/utils/constants/common';
import { DepositType } from '~/utils/enums/deposit.enum';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { handleImageError, formatContractId } from '~/utils/helpers';
import type { KeyValue } from '~/types/definitions/common.types';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const depositRepo = depositRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();
const toast = useToast();
const { copyText } = useClipboard();

const dto = ref<DepositCryptoRequestDto>({
	addressTypeId: null,
	currencyId: null,
	blockchainProtocolId: '',
});

const submitLoading = ref<boolean>(false);
const depositCryptoRequest = ref<DepositCryptoRequest | null>();
const submit = async () => {
	try {
		submitLoading.value = true;
		const { result } = await depositRepo.storeDepositCryptoRequest(dto.value);
		depositCryptoRequest.value = result as DepositCryptoRequest;

		toast.add({
			title: useT('deposit'),
			description: useT('cardPrintSuccessfully'),
			timeout: 5000,
			color: 'green',
		});

		updateStepStatus(2);
	}
	catch (error: any) {
		toast.add({
			title: useT('deposit'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
	finally {
		submitLoading.value = false;
	}
};

const sendDepositAddressToEmailLoading = ref<boolean>(false);
const sendDepositAddressToEmail = async () => {
	try {
		if (!depositCryptoRequest.value?.reqId) return;
		sendDepositAddressToEmailLoading.value = true;
		await depositRepo.sendDepositAddressToEmail({ id: String(depositCryptoRequest.value?.reqId) });

		toast.add({
			title: useT('deposit'),
			description: useT('sentToYourEmailCheckIt'),
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
		sendDepositAddressToEmailLoading.value = false;
	}
};

const showGuide = ref(true);

const filteredCurrencies = ref<CurrencyBrief[]>();
const selectedCurrency = ref<CurrencyBrief>();
const selectedSymbol = ref<string>('BTC');

const network = ref('');
const networkItems = ref<KeyValue[]>([]);

const netWorksLoading = ref<boolean>(true);
const networks = ref<DepositCurrency[]>([]);
const networksFullData = ref<DepositCurrency | null>();
const selectedNetworksFullData = ref<DepositCryptoNetwork | null>();
const getDepositNetworks = async () => {
	try {
		netWorksLoading.value = true;
		const cachedItems = await loadFromCache<DepositCurrency[]>(CACHE_KEY_DEPOSIT_CRYPTO_NETWORKS);
		if (cachedItems && cachedItems.length > 0) {
			networks.value = cachedItems;
		}
		else {
			const { result } = await depositRepo.getDepositCryptoNetworks();
			await saveToCache(CACHE_KEY_DEPOSIT_CRYPTO_NETWORKS, result.rows);
			networks.value = result.rows as DepositCurrency[];
		}

		if (selectedCurrency.value?.id !== undefined) {
			const networks = await worker.findDepositCurrencyNetworksByCurrencyId(selectedCurrency.value.id);
			networkItems.value = networks?.networks ? networks.networks : [];
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
		const networks = await worker.findDepositCurrencyNetworksByCurrencyId(newValue.id);
		networkItems.value = networks?.networks ? networks.networks : [];
		networksFullData.value = networks?.fullData ? networks.fullData : null;

		dto.value.currencyId = newValue.id;
		dto.value.addressTypeId = newValue.typeId;

		networkSelected.value = null;
		depositCryptoRequest.value = null;
	}
	updateStepStatus(1);
});

const networkSelected = ref<KeyValue | null>();
watch(() => dto.value.blockchainProtocolId, async (newValue) => {
	if (newValue) {
		networkSelected.value = networkItems.value.find((item) => item.key === newValue);
		selectedNetworksFullData.value = networksFullData.value?.networks?.find((item) => item.netId === newValue);

		depositCryptoRequest.value = null;
		updateStepStatus(2);
	}

	console.log(dto.value);
}, { deep: true });

const currenciesLoading = ref<boolean>(true);
const initCurrencies = async () => {
	currenciesLoading.value = true;
	filteredCurrencies.value = await worker.searchCurrencies('', 400, useEnv('apiBaseUrl'), 'TMN');
	currenciesLoading.value = false;
};

const searchLoading = ref<boolean>(false);
const search = async (q: string) => {
	searchLoading.value = true;

	let inputs: CurrencyBrief[] = [];
	if (!q) {
		inputs = await worker.searchCurrencies('', 400, useEnv('apiBaseUrl'), 'TMN');
	}
	else {
		inputs = await worker.searchCurrencies(q.toLowerCase(), 200, useEnv('apiBaseUrl'), 'TMN');
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

	await getDepositNetworks();
	await initCurrencies();
});

const updateStepStatus = (index: number) => {
	steps.value.forEach((step, i) => {
		step.completed = i < index;
		step.current = i === index;
	});
};

const steps = ref([
	{ label: useT('chooseCurrency'), completed: true, current: false },
	{ label: useT('networkSelected'), completed: false, current: true },
	{ label: useT('generateAddress'), completed: false, current: false },
]);

const guideSteps = [
	{ key: 'guide_1', step: '1', title: useT('chooseCurrency'), description: useT('chooseCurrencyStepOne') },
	{ key: 'guide_2', step: '2', title: useT('depositAddressExchange'), description: useT('depositAddressExchangeStepTwo') },
	{ key: 'guide_3', step: '3', title: useT('transferConfirmation'), description: useT('transferConfirmationStepThree') },
	{ key: 'guide_4', step: '4', title: useT('depositSuccessfully'), description: useT('depositSuccessfullyStepFour') },
];
</script>
