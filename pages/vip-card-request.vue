<template>
	<div
		v-if="loading"
		class="p-4"
	>
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8"
	>
		<BackHeader
			v-if="isMobile"
			:title="$t('requestCardVisitPrint')"
		/>
		<div
			v-else
			class="my-4"
		>
			<UiTitleWithBack :title="$t('requestCardVisitPrint')" />
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-20 bg-primary-gray-light dark:bg-primary-gray-dark rounded-none md:rounded-md shadow-md  py-6 md:py-10 px-1 md:px-20 my-0 md:my-8">
			<div>
				<div class="relative mb-8 px-3">
					<img
						src="/images/card.webp"
						class="max-h-64 relative z-10 mx-auto"
					>
					<div class="absolute top-28 md:top-32 right-9 md:right-20 z-20">
						<div class="flex items-center mb-3">
							<img
								:src="holderBrief?.level.logoUrl"
								class="w-6 h-6"
							>
							<span class="mr-1 md:mr-2 text-sm font-normal md:font-bold text-primary-yellow-light dark:text-primary-yellow-dark">
								{{ getValueByKey(authStore.getCurrentUser, 'NAME') ?? '...' }}
								{{ getValueByKey(authStore.getCurrentUser, 'FAMILY') ?? '...' }}
							</span>
						</div>
						<div>
							<h5 class="text-sm font-light md:font-semibold text-subtle-text-light dark:text-subtle-text-dark">
								<span>{{ $t('participant') }}</span>
								<span class="text-sm px-1 font-normal md:font-bold text-primary-yellow-light dark:text-primary-yellow-dark">
									{{ holderBrief?.level.name }}
								</span>
								<span>{{ $t('bitlandExchange') }}</span>
							</h5>
						</div>
					</div>
				</div>
				<!-- end of visit card -->

				<div class="px-4 md:px-0">
					<div class="my-4">
						<TextareaFieldInput
							id="content"
							v-model="cardPrintDto.address"
							type="text"
							input-class="text-right"
							label="addressResidence"
							placeholder=""
							icon=""
							dir="rtl"
							color-type="transparent"
							:error-message="v$.address.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div class="my-4">
						<FormsFieldInput
							id="email_password"
							v-model="cardPrintDto.postalCode"
							type="text"
							input-class="text-left"
							label="zipCode"
							placeholder=""
							icon="heroicons:envelope-solid"
							dir="ltr"
							color-type="transparent"
							:error-message="v$.postalCode.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div class="my-4">
						<FormsFieldInput
							id="email_password"
							v-model="cardPrintDto.emergencyTelno"
							type="text"
							input-class="text-left"
							label="landLineNumber"
							placeholder=""
							icon="heroicons:phone"
							dir="ltr"
							color-type="transparent"
							:error-message="v$.emergencyTelno.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div class="my-4">
						<UCheckbox
							v-model="cardPrintDto.printingMobileAllowed"
							:label="$t('printPhoneNumberusinessCard')"
						/>
					</div>
					<div class="flex justify-center">
						<UButton
							size="lg"
							class="w-full flex justify-center px-2 md:px-9"
							:loading="submitCardPrintLoading"
							@click="submitCardPrint"
						>
							{{ $t("confirm") }}
						</UButton>
					</div>
				</div>
			</div>
			<div>
				<SideGuideBox
					:tag-type="TagType.CREATE_CARD"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import { userRepository } from '~/repositories/user.repository';
import { getValueByKey } from '~/utils/helpers';
import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import { TagType } from '~/utils/enums/help.enum';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import type { AssetTypeParams, HolderBrief, SetCardPrintDto } from '~/types/definitions/user.types';
import { AssetType } from '~/utils/enums/asset.enum';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const authStore = useAuthStore();
const router = useRouter();

const { $mobileDetect, $api } = useNuxtApp();
const userRepo = userRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const loading = ref<boolean>(false);
const holderBrief = ref<HolderBrief>();
const params = ref<AssetTypeParams>({
	id: '3',
	assetType: AssetType.Testnet,
});
const getHolderBrief = async () => {
	try {
		loading.value = true;
		const { result } = await userRepo.getHolderBrief(params.value);
		holderBrief.value = result as HolderBrief;

		console.log(holderBrief.value);

		loading.value = false;
	}
	catch (error) {
		loading.value = false;
		console.log(error);
	}
};

const toast = useToast();

const cardPrintDto = ref<SetCardPrintDto>({
	address: '',
	postalCode: '',
	emergencyTelno: '',
	printingMobileAllowed: true,
});

const cardPrintDtoRules = {
	address: { required: validations.required },
	postalCode: { required: validations.required },
	emergencyTelno: { required: validations.required },
	printingMobileAllowed: { required: validations.required },
};

const v$ = useVuelidate(cardPrintDtoRules, cardPrintDto);

const submitCardPrintLoading = ref<boolean>(false);
const submitCardPrint = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		submitCardPrintLoading.value = true;

		await userRepo.storeCardPrint(cardPrintDto.value);
		toast.add({
			title: useT('registerCardPrint'),
			description: useT('cardPrintSuccessfully'),
			timeout: 5000,
			color: 'green',
		});
		router.push('/user');
	}
	catch (error: any) {
		console.error('Failed:', error);
		toast.add({
			title: useT('registerCardPrint'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
	finally {
		submitCardPrintLoading.value = false;
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getHolderBrief(),
	]);
});
</script>
