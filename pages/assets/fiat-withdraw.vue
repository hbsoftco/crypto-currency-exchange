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
							id="bankAccountDesId"
							v-model="dto.bankAccountDesId"
							:options="accountItems"
							type="text"
							input-class="text-right"
							label="selectBankAccount"
							:searchable="true"
							placeholder=""
							icon=""
							color-type="transparent"
							:error-message="v$.bankAccountDesId.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<!-- bankAccountDesId -->

					<div>
						<div class="flex justify-end items-center">
							<div>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('removable') }}:
								</span>
								<span class="mr-1 text-xs font-normal text-left">{{ withdrawable }}</span>
								<span class="mr-1 text-xs font-normal text-left">TMN</span>
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
							v-model="dto.value"
							mt-class="mt-1"
							type="text"
							input-class="text-left"
							label="withdrawValue"
							:number="true"
							placeholder=""
							icon=""
							dir="ltr"
							color-type="transparent"
							:error-message="v$.value.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<!-- withdrawValue -->

					<div class="mt-8 mb-3">
						<div class="flex justify-between items-center mb-1">
							<label for="final-price">{{ $t('finalReceipt') }}</label>
							<p
								id="final-price"
								dir="ltr"
							>
								{{ 0 }} TMN
							</p>
						</div>
						<div class="flex justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm">
							<label for="final-price">{{ $t('fee') }}</label>
							<p
								id="final-price"
								dir="ltr"
							>
								{{ 0 }} TMN
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

					<div class="mt-8 mb-3 border border-secondary-gray-light dark:border-secondary-gray-dark bg-background-light dark:bg-background-50 p-4 rounded-md">
						<div class="flex justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm">
							<label for="final-price">{{ $t('minWithdraw') }}</label>
							<p
								id="final-price"
								dir="ltr"
							>
								{{ priceFormat(bankOperator?.max ?? 0) }} TMN
							</p>
						</div>
						<div class="flex my-2 justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm">
							<label for="final-price">{{ $t('maxWithdraw') }}</label>
							<p
								id="final-price"
								dir="ltr"
							>
								{{ bankOperator?.min }} TMN
							</p>
						</div>
						<div class="flex justify-between items-center text-subtle-text-light dark:text-subtle-text-dark text-sm">
							<label for="final-price">{{ $t('fee') }}</label>
							<p
								id="final-price"
								dir="ltr"
							>
								<span v-if="(bankOperator?.fee ?? 0) > 0">
									{{ bankOperator?.fee }} TMN
								</span>
								<span v-else>{{ $t('free') }}</span>
							</p>
						</div>
					</div>
				</div>

				<UiVerifyModal
					v-if="isOpenVerifyModal"
					v-model="isOpenVerifyModal"
					:title="$t('withdraw')"
					:submit-loading="loading"
					:withdraw-status="true"
					@confirm="submit($event)"
				/>
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
import useVuelidate from '@vuelidate/core';

import { priceFormat } from '~/utils/helpers';
import IconClose from '~/assets/svg-icons/close.svg';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import RecentWithdrawTransactionsTable from '~/components/pages/Assets/Withdraw/RecentWithdrawTransactionsTable.vue';
import { DepositType } from '~/utils/enums/deposit.enum';
import type { KeyValue } from '~/types/definitions/common.types';
import { withdrawRepository } from '~/repositories/withdraw.repository';
import type { WithdrawCurrency, WithdrawFiatNetwork, WithdrawFiatRequestDto } from '~/types/definitions/withdraw.types';
import type { BankAccount, BankAccountListParams } from '~/types/definitions/user.types';
import { userRepository } from '~/repositories/user.repository';
import type { VerifyOutput } from '~/types/definitions/security.types';

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

// const toast = useToast();

const dto = ref<WithdrawFiatRequestDto>({
	verificationId: 0,
	verificationCode: '',
	v2FACode: null,
	currencyId: 1,
	bankAccountDesId: '',
	withdrawPinCode: null,
	value: '',
});
const dtoRules = {
	verificationId: { },
	verificationCode: { },
	v2FACode: { },
	currencyId: { required: validations.required },
	bankAccountDesId: { required: validations.required },
	withdrawPinCode: { },
	value: { required: validations.required },
};
const v$ = useVuelidate(dtoRules, dto.value);

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

	loading.value = true;
	try {
		// await securityRepo.storeWithdrawPinCode(dto.value);

		// router.push('/user/security');
		// await authStore.fetchCurrentUser(true);
	}
	catch (error) {
		console.log(error);
	}
	finally {
		loading.value = false;
	}
};

const isOpenVerifyModal = ref(false);
const showGuide = ref(true);

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

const networksLoading = ref<boolean>(true);
const networks = ref<WithdrawCurrency[]>([]);
const withdrawable = ref('');
const bankOperator = ref<WithdrawFiatNetwork>();
const getWithdrawNetworks = async () => {
	try {
		networksLoading.value = true;
		const { result } = await withdrawRepo.getWithdrawFiatNetworks();
		networks.value = result.rows as WithdrawCurrency[];

		if (networks.value.length) {
			bankOperator.value = networks.value[0].bankOperator as WithdrawFiatNetwork;
			withdrawable.value = networks.value[0].withdrawable;
		}

		networksLoading.value = false;
	}
	catch (error) {
		console.log(error);
		networksLoading.value = false;
	}
};

const selectAllBalance = () => {
	dto.value.value = withdrawable.value;
};

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
