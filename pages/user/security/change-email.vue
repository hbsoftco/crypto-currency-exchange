<template>
	<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8">
		<BackHeader
			v-if="isMobile"
			:title="$t('changeEmail')"
		/>

		<div
			v-else
			class="my-4"
		>
			<UiTitleWithBack :title="$t('changeEmail')" />
		</div>
		<section class="pb-0.5">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-none md:rounded-md mt-0 md:mt-8 mb-0 md:mb-4 py-6 md:py-10 px-4 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-6 md:mt-10 w-full">
					<div class="mb-8">
						<FormsFieldInput
							id="emailAddressNew"
							v-model="changeEmailDto.emailAddressNew"
							type="text"
							input-class="text-left"
							label="newEmailAddress"
							placeholder="your@email.com"
							icon="i-heroicons-envelope"
							dir="ltr"
							color-type="transparent"
							mt-class="mt-0"
							:error-message="v$.emailAddressNew.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div class="my-6">
						<OtpFieldInput
							id="uvCodeEmailAddressNew"
							v-model="changeEmailDto.uvCodeEmailAddressNew"
							color-type="transparent"
							type="text"
							input-class="text-left"
							:countdown="sendCodeCountdown"
							send-type="send"
							label="sentVerificationCodeToNewEmail"
							placeholder=""
							icon=""
							dir="ltr"
							:error-message="v$.uvCodeEmailAddressNew.$error? $t('fieldIsRequired') : ''"
							@resend="resendCode()"
							@send-code="getNewIdentificationCode"
						/>
					</div>
					<div class="my-6">
						<OtpFieldInput
							id="uvCodeEmailAddressOld"
							v-model="changeEmailDto.uvCodeEmailAddressOld"
							color-type="transparent"
							type="text"
							input-class="text-left"
							send-type="resend"
							:label="mobileExist ? 'verificationCodeSentToMobile' : 'verificationCodeSentToOldEmail'"
							placeholder=""
							icon=""
							dir="ltr"
							:error-message="v$.uvCodeEmailAddressOld.$error? $t('fieldIsRequired') : ''"
							@resend="resendCode()"
						/>
					</div>
					<div
						v-if="authStore.login2faStatus"
						class="my-6"
					>
						<OtpFieldInput
							id="v2FACode"
							v-model="changeEmailDto.v2FACode"
							color-type="transparent"
							type="text"
							input-class="text-left"
							send-type="send"
							label-dir="rtl"
							label="twoFactorCode"
							placeholder=""
							icon=""
							:error-message="v$.v2FACode.$error? $t('fieldIsRequired') : ''"
							dir="ltr"
							:count-down-state="false"
						/>
					</div>

					<div class="mt-12 flex justify-center text-center gap-2">
						<UButton
							size="lg"
							block
							:loading="loading"
							@click="submit()"
						>
							{{ $t("save") }}
						</UButton>
					</div>
				</div>
				<div class="my-0 md:my-8">
					<SideGuideBox :tag-type="TagType.EMAIL_CHANGE" />
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { securityRepository } from '~/repositories/security.repository';
import type { ChangeEmailDto } from '~/types/definitions/security.types';
import { TagType } from '~/utils/enums/help.enum';
import { SendType } from '~/utils/enums/user.enum';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $mobileDetect, $api } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const securityRepo = securityRepository($api);
const router = useRouter();

const authStore = useAuthStore();
const {	getCode, getResendCode, getNewCode } = useIdentification();

const changeEmailDto = ref<ChangeEmailDto>({
	uvIdEmailAddressOld: null,
	uvCodeEmailAddressOld: '',
	uvIdEmailAddressNew: null,
	uvCodeEmailAddressNew: '',
	emailAddressNew: '',
	v2FACode: null,
});

const changeEmailRules = {
	uvIdEmailAddressOld: { required: validations.required },
	uvCodeEmailAddressOld: { required: validations.required },
	uvIdEmailAddressNew: { required: validations.required },
	uvCodeEmailAddressNew: { required: validations.required },
	emailAddressNew: { required: validations.required },
	v2FACode: { },
};

const v$ = useVuelidate(changeEmailRules, changeEmailDto);

const loading = ref<boolean>(false);
const submit = async () => {
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	if (loading.value) return;
	loading.value = true;
	try {
		await securityRepo.changeEmail(changeEmailDto.value);

		await authStore.fetchCurrentUser(true);
		router.push('/user/security');
	}
	catch (error) {
		console.log(error);
	}
	finally {
		loading.value = false;
	}
};

const mobileExist = ref<boolean>(false);
const checkMobileExist = async () => {
	await authStore.fetchCurrentUser();

	changeEmailRules.v2FACode = authStore.login2faStatus ? { } : { required: validations.required };

	const state = getValueByKey(authStore.getCurrentUser, 'MOBILE');
	if (state) {
		mobileExist.value = true;
	}
	else {
		mobileExist.value = false;
	}
};

const getIdentificationCode = async () => {
	const type = mobileExist.value ? SendType.SMS : SendType.Email;

	const codeId = await getCode(type);
	if (codeId) {
		changeEmailDto.value.uvIdEmailAddressOld = codeId;
	}
};

const sendCodeCountdown = ref<number>(0);
const getNewIdentificationCode = async () => {
	if (!changeEmailDto.value.emailAddressNew) {
		return;
	}

	sendCodeCountdown.value = 60;
	const newCodeId = await getNewCode(SendType.Email, changeEmailDto.value.emailAddressNew);

	if (newCodeId) {
		changeEmailDto.value.uvIdEmailAddressNew = newCodeId;
	}
	else {
		sendCodeCountdown.value = 0;
	}
};

const resendCode = async () => {
	const type = mobileExist.value ? SendType.SMS : SendType.Email;

	if (changeEmailDto.value.uvIdEmailAddressOld) {
		const resendCodeId = await getResendCode(type, changeEmailDto.value.uvIdEmailAddressOld);
		if (resendCodeId) {
			changeEmailDto.value.uvIdEmailAddressOld = resendCodeId;
		}
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await checkMobileExist();
	await Promise.all([
		getIdentificationCode(),
	]);
});
</script>
