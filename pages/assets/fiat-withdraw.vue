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
			:title="$t('withdrawToman')"
		/>

		<div
			v-else
			class="my-4"
		>
			<div class="flex justify-between">
				<div>
					<UiTitleWithBack
						:title="$t('withdrawToman')"
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
			<div class="w-full md:w-96 px-3 md:px-0">
				<div>
					<div
						v-if="accountItems.length"
						class="mb-8"
					>
						<div class="text-left mb-1">
							<ULink
								to="/assets/fiat-accounts"
								class="text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
							>
								{{ $t('addNewCard') }}
							</ULink>
						</div>
						<FormsDropDown
							id="network"
							v-model="dto.blockchainProtocolId"
							:options="accountItems"
							type="text"
							input-class="text-right"
							label="selectBankAccount"
							placeholder=""
							icon=""
							color-type="transparent"
						/>
					</div>
					<!-- select network -->

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
								class="mr-2 text-primary-yellow-light hover:bg-hover-light dark:hover:bg-secondary-gray-dark dark:text-primary-yellow-dark bg-hover-light dark:bg-secondary-gray-dark py-1 text-xs font-bold"
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
				</div>
			</div>
			<div class="my-8 px-3 md:px-0">
				<SideGuideBox
					fetch-type="Withdraw"
					currency-id="1"
					:type="DepositType.FIAT"
				/>
			</div>
		</div>
		<!-- Deposit -->

		<section class="py-8">
			<RecentWithdrawTransactionsTable :columns-type="DepositType.FIAT" />
		</section>
		<!-- List -->
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import RecentWithdrawTransactionsTable from '~/components/pages/Assets/Withdraw/RecentWithdrawTransactionsTable.vue';
import { saveToCache } from '~/utils/indexeddb';
import type { DepositCryptoRequestDto } from '~/types/definitions/deposit.types';
import { CACHE_KEY_WITHDRAW_FIAT_NETWORKS } from '~/utils/constants/common';
import { DepositType } from '~/utils/enums/deposit.enum';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { KeyValue } from '~/types/definitions/common.types';
import { withdrawRepository } from '~/repositories/withdraw.repository';
import type { WithdrawCurrency, WorkerWithdrawNetwork } from '~/types/definitions/withdraw.types';
import type { BankAccount, BankAccountListParams } from '~/types/definitions/user.types';
import { userRepository } from '~/repositories/user.repository';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const withdrawRepo = withdrawRepository($api);
const userRepo = userRepository($api);

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

const withdrawValue = ref('');

const showGuide = ref(true);

const selectedCurrency = ref<CurrencyBrief>();

const network = ref('');
const accountItems = ref<KeyValue[]>([]);

const params = ref<BankAccountListParams>({
	typeId: '',
	statement: '',
	pageNumber: '1',
	pageSize: '20',
});
const bankAccountListLoading = ref<boolean>(false);
const bankAccountList = ref<BankAccount[]>([]);
const getBankAccountList = async () => {
	try {
		bankAccountListLoading.value = true;
		const { result } = await userRepo.getBankAccountList(params.value);
		bankAccountList.value = result.rows as BankAccount[];

		accountItems.value = bankAccountList.value?.map((item) => ({ key: item.id.toString(), value: item.iban.toString() }));
		bankAccountListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		bankAccountListLoading.value = false;
	}
};

const netWorksLoading = ref<boolean>(true);
const networks = ref<WithdrawCurrency[]>([]);
const networksFullData = ref<WithdrawCurrency | null>();
const selectedNetworksFullData = ref<WorkerWithdrawNetwork | null>();
const getWithdrawNetworks = async () => {
	try {
		netWorksLoading.value = true;
		const { result } = await withdrawRepo.getWithdrawFiatNetworks();
		await saveToCache(CACHE_KEY_WITHDRAW_FIAT_NETWORKS, result.rows);
		networks.value = result.rows as WithdrawCurrency[];

		if (selectedCurrency.value?.id !== undefined) {
			const networks = await worker.findWithdrawCurrencyNetworksByCurrencyId(selectedCurrency.value.id);
			accountItems.value = networks?.networks ? networks.networks : [];

			console.log(accountItems.value);

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
	accountItems.value = [];
	network.value = '';
	if (newValue?.id !== undefined) {
		selectedNetworksFullData.value = null;
		const networks = await worker.findWithdrawCurrencyNetworksByCurrencyId(newValue.id);
		accountItems.value = networks?.networks ? networks.networks : [];
		networksFullData.value = networks?.fullData ? networks.fullData : null;

		dto.value.currencyId = newValue.id;
		dto.value.addressTypeId = newValue.typeId;

		networkSelected.value = null;
		// depositCryptoRequest.value = null;
	}
});

const networkSelected = ref<KeyValue | null>();
watch(() => dto.value.blockchainProtocolId, async (newValue) => {
	if (newValue) {
		selectedNetworksFullData.value = null;
		networkSelected.value = accountItems.value.find((item) => item.key === newValue);
		// selectedNetworksFullData.value = networksFullData.value?.networks?.find((item) => item.netId === Number(newValue));

		// depositCryptoRequest.value = null;
	}
}, { deep: true });

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
	await nextTick();

	await Promise.all([
		getWithdrawNetworks(),
		getBankAccountList(),
	]);
});

const guideSteps = [
	{ key: 'guide_1', step: '1', title: useT('chooseBankCard'), description: useT('chooseBankCardText') },
	{ key: 'guide_2', step: '2', title: useT('withdrawalConfirmation'), description: useT('tomanWithdrawalsetpTwo') },
	{ key: 'guide_3', step: '3', title: useT('harvestSuccessfully'), description: useT('tomanWithdrawalsetpThree') },
];
</script>
