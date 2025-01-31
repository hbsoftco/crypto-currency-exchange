<template>
	<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8">
		<BackHeader
			v-if="isMobile"
			:title="$t('addWhiteAddress')"
		/>

		<div class="flex justify-between">
			<div class="my-4">
				<UiTitleWithBack :title="$t('addWhiteAddress')" />
			</div>
			<ULink
				to="/help"
				class="text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
			>
				{{ $t('moreInfoAboutWhiteList') }}
			</ULink>
		</div>

		<div class="block md:flex justify-between rounded-none md:rounded-md mt-0 md:mt-8 mb-0 md:mb-4 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
			<div class="mt-0 md:mt-10 px-3 md:px-0">
				<UiProgressStepper :steps="steps" />
			</div>
			<div class="w-full md:w-80 px-3 md:px-0">
				<div>
					<div class="my-8">
						<FormsDropDown
							v-if="netBlockchainList.length"
							id="blockchainId"
							v-model="dto.blockchainId"
							:options="netBlockchainList"
							type="text"
							input-class="text-right"
							label="networkType"
							placeholder=""
							icon=""
							:searchable="true"
							color-type="transparent"
							:error-message="v$.blockchainId.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div class="my-8">
						<FormsFieldInput
							id="address"
							v-model="dto.address"
							type="text"
							input-class="text-left"
							label="withdrawalAddress"
							placeholder=""
							icon=""
							dir="ltr"
							color-type="transparent"
							:error-message="v$.address.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div class="my-8">
						<FormsFieldInput
							id="memo"
							v-model="dto.memo"
							type="text"
							input-class="text-left"
							label="memoPhrase"
							placeholder=""
							icon=""
							dir="ltr"
							color-type="transparent"
							:error-message="v$.memo.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div class="mb-8 text-right">
						<FormsTextareaFieldInput
							id="description"
							v-model="dto.description"
							type="text"
							input-class="text-right"
							label="description"
							placeholder=""
							icon=""
							dir="rtl"
							color-type="transparent"
							:error-message="v$.description.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div>
						<UButton
							size="lg"
							block
							:loading="loading"
							@click="openVerifyModal()"
						>
							{{ $t("save") }}
						</UButton>
					</div>

					<UiVerifyModal
						v-if="isOpenVerifyModal"
						v-model="isOpenVerifyModal"
						:title="$t('addWhiteAddress')"
						:submit-loading="loading"
						@confirm="submit($event)"
					/>
				</div>
			</div>
			<div class="my-0 md:my-8">
				<SideGuideBox :tag-type="TagType.WB_ADDRESS" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { currencyRepository } from '~/repositories/currency.repository';
import { securityRepository } from '~/repositories/security.repository';
import type { NetBlockchain } from '~/types/definitions/currency.types';
import type { AddressDto, VerifyOutput } from '~/types/definitions/security.types';
import { TagType } from '~/utils/enums/help.enum';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $mobileDetect, $api } = useNuxtApp();
const currencyRepo = currencyRepository($api);
const securityRepo = securityRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const toast = useToast();
const router = useRouter();

const isOpenVerifyModal = ref(false);

const openVerifyModal = () => {
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	isOpenVerifyModal.value = true;
};

const dto = ref<AddressDto>({
	verificationId: 0,
	verificationCode: '',
	blockchainId: 0,
	address: '',
	description: '',
	memo: '',
	coldWallet: false,
	v2FACode: null,
});

const dtoRules = {
	verificationId: { },
	verificationCode: { },
	blockchainId: { required: validations.required },
	address: { required: validations.required },
	description: { required: validations.required },
	memo: { required: validations.required },
	coldWallet: { required: validations.required },
	v2FACode: { },
};

const v$ = useVuelidate(dtoRules, dto);

const loading = ref<boolean>(false);
const submit = async (event: VerifyOutput) => {
	try {
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

		await securityRepo.storeAddress(dto.value);

		toast.add({
			title: useT('saveAddress'),
			description: useT('newAddressSuccess'),
			timeout: 5000,
			color: 'green',
		});

		loading.value = false;
		router.push('/user/white-list');
	}
	catch (error) {
		loading.value = false;
		console.log(error);
	}
};

const netBlockchainListLoading = ref<boolean>(false);
const netBlockchainList = ref<NetBlockchain[]>([]);
const getNetBlockchainList = async () => {
	try {
		netBlockchainListLoading.value = true;

		const { result } = await currencyRepo.getNetBlockchainList();

		netBlockchainList.value = result as NetBlockchain[];
		netBlockchainListLoading.value = true;
	}
	catch (error) {
		netBlockchainListLoading.value = true;
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getNetBlockchainList();
});

const steps = ref([
	{ label: useT('addressDetails'), completed: false, current: true },
	{ label: useT('securityConfirmation'), completed: false, current: false },
]);
</script>
