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
			:title="$t('depositRial')"
		/>

		<div
			v-else
			class="my-4"
		>
			<div class="flex justify-between">
				<div>
					<UiTitleWithBack
						:title="$t('depositRial')"
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
						:show-numbers="false"
						:step="item.step"
						:title="item.title"
						:description="item.description"
					/>
				</template>
			</div>
		</section>
		<!-- Steps -->

		<div class="block md:flex justify-between rounded-none md:rounded-md mt-0 md:mt-8 mb-0 md:mb-4 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
			<div class="w-full md:w-96 px-3 md:px-0">
				<div>
					<UTabs
						:items="items"
						dir="rtl"
						class="text-right"
						:ui="{
							container: 'mt-0',
							list: {
								padding: 'pl-4 pt-4',
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
							<div class="relative -top-1 border-t border-t-secondary-gray-light dark:border-t-secondary-gray-dark">
								<div v-if="item.key === 'depositBankCard'">
									<div class="p-7 text-center">
										<UIcon
											name="i-heroicons-building-library-16-solid"
											class="w-24 h-24 text-subtle-text-light dark:text-subtle-text-dark"
										/>
										<h5 class="mt-2">
											{{ $t('bankDepositComingSoon') }}
										</h5>
									</div>
								</div>
								<div v-else-if="item.key === 'depositID'">
									<DepositById />
								</div>
								<div v-else-if="item.key === 'offline'">
									<!--  -->
								</div>
							</div>
						</template>
					</UTabs>
				</div>
			</div>
			<div class="my-8 px-3 md:px-0">
				<SideGuideBox
					fetch-type="Deposit"
					currency-id="1"
					:type="DepositType.FIAT"
				/>
			</div>
		</div>
		<!-- Deposit -->

		<section class="py-8">
			<RecentDepositTransactionsTable :columns-type="DepositType.FIAT" />
		</section>
		<!-- List -->
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import RecentDepositTransactionsTable from '~/components/pages/Assets/Deposit/RecentDepositTransactionsTable.vue';
import { depositRepository } from '~/repositories/deposit.repository';
import { loadFromCache, saveToCache } from '~/utils/indexeddb';
import type { DepositCryptoNetwork, DepositCryptoRequestDto, DepositCurrency } from '~/types/definitions/deposit.types';
import { CACHE_KEY_DEPOSIT_CRYPTO_NETWORKS } from '~/utils/constants/common';
import { DepositType } from '~/utils/enums/deposit.enum';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { KeyValue } from '~/types/definitions/common.types';
import DepositById from '~/components/pages/Assets/Deposit/DepositById.vue';

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
// const toast = useToast();
// const { copyText } = useClipboard();

const dto = ref<DepositCryptoRequestDto>({
	addressTypeId: null,
	currencyId: null,
	blockchainProtocolId: '',
});

const showGuide = ref(true);

const filteredCurrencies = ref<CurrencyBrief[]>();
const selectedCurrency = ref<CurrencyBrief>();

const network = ref('');
const networkItems = ref<KeyValue[]>([]);

const networksLoading = ref<boolean>(true);
const networks = ref<DepositCurrency[]>([]);
const networksFullData = ref<DepositCurrency | null>();
const selectedNetworksFullData = ref<DepositCryptoNetwork | null>();
const getDepositNetworks = async () => {
	try {
		networksLoading.value = true;
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
		selectedNetworksFullData.value = null;
		const networks = await worker.findDepositCurrencyNetworksByCurrencyId(newValue.id);
		networkItems.value = networks?.networks ? networks.networks : [];
		networksFullData.value = networks?.fullData ? networks.fullData : null;

		dto.value.currencyId = newValue.id;
		dto.value.addressTypeId = newValue.typeId;

		networkSelected.value = null;
	}
});

const networkSelected = ref<KeyValue | null>();

const currenciesLoading = ref<boolean>(true);
const initCurrencies = async () => {
	currenciesLoading.value = true;
	filteredCurrencies.value = await worker.searchDepositCryptoCurrencies('', 400, useEnv('apiBaseUrl'));
	currenciesLoading.value = false;
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
	await nextTick();

	await getDepositNetworks();
	await initCurrencies();
});

const items = [
	{
		key: 'depositBankCard',
		label: 'depositBankCard',
	},
	{
		key: 'depositID',
		label: 'depositID',
	},
	{
		key: 'offline',
		label: 'offline',
	},
];

const guideSteps = [
	{ key: 'guide_1', step: '1', title: useT('depositMethod'), description: useT('selectDepositMethod') },
	{ key: 'guide_2', step: '2', title: useT('cardDeposit'), description: useT('cardDepositDescription') },
	{ key: 'guide_3', step: '3', title: useT('referenceDeposit'), description: useT('referenceDepositDescription') },
	{ key: 'guide_4', step: '4', title: useT('offline'), description: useT('offline') },
];
</script>
