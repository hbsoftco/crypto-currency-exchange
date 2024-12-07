<template>
	<div>
		<div>
			<span class="text-base font-medium">{{ $t('stepFour') }}</span>
		</div>
		<div class="my-12">
			<FormsFieldInput
				id="email_password"
				v-model="enable2faDto.loginPassword"
				type="password"
				input-class="text-left"
				label="password"
				placeholder=""
				icon="i-heroicons-eye"
				dir="ltr"
				color-type="transparent"
				:error-message="
					v$.loginPassword.$error
						? (v$.loginPassword.required.$response ? $t('passwordMustBeComplex') : $t('fieldIsRequired'))
						: ''
				"
			/>
		</div>
		<div class="flex justify-between">
			<div class="flex items-center">
				<span class="text-xs font-normal">{{ $t('emailAddress') }}:</span>
				<span class="text-sm font-normal mr-1">{{ obfuscateEmail(getValueByKey(authStore.getCurrentUser, 'EMAIL') || '') }}</span>
			</div>
		</div>
		<div class="my-12">
			<OtpFieldInput
				id="verificationCode"
				v-model="enable2faDto.verificationCode"
				type="text"
				input-class="text-left"
				label="emailVerificationCode"
				placeholder=""
				icon=""
				dir="ltr"
				label-dir="rtl"
				:clear="clearCode"
				color-type="transparent"
				:error-message="v$.verificationCode.$error? $t('fieldIsRequired') : ''"
				@resend="resendCode"
			/>
		</div>
		<div class="my-12">
			<OtpFieldInput
				id="v2FACode"
				v-model="enable2faDto.v2FACode"
				type="text"
				input-class="text-left"
				label="twoStep2FACode"
				placeholder=""
				icon=""
				dir="ltr"
				label-dir="rtl"
				:clear="clearCode"
				color-type="transparent"
				:error-message="v$.v2FACode.$error? $t('fieldIsRequired') : ''"
				:count-down-state="false"
			/>
		</div>
		<div class="mt-12 flex justify-center text-center gap-4">
			<div class="w-1/2">
				<UButton
					color="gray"
					size="lg"
					block
					:loading="prevLoading"
					@click="prevStep()"
				>
					{{ $t("back") }}
				</UButton>
			</div>
			<div class="w-1/2">
				<UButton
					size="lg"
					block
					:loading="enable2faLoading"
					@click="enable2fa()"
				>
					{{ $t("register") }}
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import { securityRepository } from '~/repositories/security.repository';
import type { Enable2faDto } from '~/types/definitions/security.types';
import { SendType } from '~/utils/enums/user.enum';
import { getValueByKey } from '~/utils/helpers';
import { obfuscateEmail } from '~/utils/obfuscate-email';

const { $api } = useNuxtApp();
const securityRepo = securityRepository($api);

const {	getCode, getResendCode } = useIdentification();

const authStore = useAuthStore();
const twoFaStore = use2FaStore();

const router = useRouter();
const toast = useToast();

const prevLoading = ref<boolean>(false);
const prevStep = async () => {
	prevLoading.value = true;
	twoFaStore.updateStepStatus(3);
	prevLoading.value = false;
};

const clearCode = ref<boolean>(false);

const enable2faDto = ref<Enable2faDto>({
	v2FAHash: '',
	v2FACode: '',
	verificationId: 0,
	verificationCode: '',
	v2fId: 0,
	loginPassword: '',
});

const enable2faDtoRules = {
	v2FAHash: { required: validations.required },
	v2FACode: { required: validations.required },
	verificationId: { required: validations.required },
	verificationCode: { required: validations.required },
	v2fId: { required: validations.required },
	loginPassword: { required: validations.required, complexPassword },
};

const v$ = useVuelidate(enable2faDtoRules, enable2faDto.value);

const enable2faLoading = ref<boolean>(false);
const enable2fa = async () => {
	const authData = authStore.getAuthCredentials();
	if (twoFaStore.generate2Fa && authData) {
		enable2faDto.value.v2fId = twoFaStore.generate2Fa.v2FId;
		enable2faDto.value.v2FAHash = md5WithUtf16LE(`${authData.password}${twoFaStore.generate2Fa.v2FSecret}`);
	}

	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	if (enable2faLoading.value) return;
	enable2faLoading.value = true;
	try {
		await securityRepo.enable2fa({
			...enable2faDto.value,
			loginPassword: btoa(enable2faDto.value.loginPassword),
		});

		await authStore.fetchCurrentUser(true);
		router.push('/account/security');
	}
	catch (error: any) {
		toast.add({
			title: useT('active2Fa'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
	finally {
		enable2faLoading.value = false;
	}
};

const resendCode = async () => {
	const resendCodeId = await getResendCode(SendType.Email, enable2faDto.value.verificationId);
	if (resendCodeId) {
		enable2faDto.value.verificationId = resendCodeId;
	}
};

const getIdentificationCode = async () => {
	const codeId = await getCode(SendType.Email);
	if (codeId) {
		enable2faDto.value.verificationId = codeId;
	}
};

onMounted(async () => {
	await getIdentificationCode();
});
</script>
