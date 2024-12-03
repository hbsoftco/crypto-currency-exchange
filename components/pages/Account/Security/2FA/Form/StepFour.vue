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
			<!-- @completed="submit"
				@cleared="setClearCode" -->
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
				@resend="resendCode"
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
import type { Enable2faDto, Identification } from '~/types/definitions/security.types';
import { SendType } from '~/utils/enums/user.enum';
import { getValueByKey } from '~/utils/find-value-by-key';

const { $api } = useNuxtApp();

const securityRepo = securityRepository($api);

const authStore = useAuthStore();
const twoFaStore = use2FaStore();

const prevLoading = ref<boolean>(false);
const prevStep = async () => {
	prevLoading.value = true;
	twoFaStore.updateStepStatus(3);
	prevLoading.value = false;
};

const obfuscateEmail = (email: string) => {
	const [username, domain] = email.split('@');
	const obfuscatedUsername = username.slice(0, 2) + '****';
	return `${obfuscatedUsername}@${domain}`;
};

const clearCode = ref<boolean>(false);
const resendCode = async () => {
	await getIdentification();
};

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
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	if (enable2faLoading.value) return;
	enable2faLoading.value = true;
	try {
		const { result } = await securityRepo.enable2fa(enable2faDto.value);

		console.log(result);
	}
	catch (error) {
		console.log(error);
	}
	finally {
		enable2faLoading.value = false;
	}
};

const identificationId = ref<Identification>();
const identificationLoading = ref<boolean>(false);
const getIdentification = async () => {
	if (identificationLoading.value) return;
	identificationLoading.value = true;
	try {
		const { result } = await securityRepo.identificationSend({ sendType: String(SendType.Email) });

		identificationId.value = result as Identification;
		enable2faDto.value.verificationId = identificationId.value.verificationId;
	}
	catch (error) {
		console.log(error);
	}
	finally {
		identificationLoading.value = false;
	}
};

onMounted(async () => {
	// await getIdentification();
});
</script>
