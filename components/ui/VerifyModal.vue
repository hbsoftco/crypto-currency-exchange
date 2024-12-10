<template>
	<UModal
		v-model="isOpen"
		fullscreen
	>
		<div
			class="h-full flex flex-col items-center justify-center overflow-y-scroll"
		>
			<div
				class=" w-full md:w-[30rem] flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-1 md:px-14 py-6 md:py-8"
			>
				<div class="block md:hidden w-full">
					<h3>{{ $t('verification') }}</h3>
				</div>
				<div class="w-full">
					<h3 class="hidden md:block text-xl font-bold">
						<h3>{{ $t('verification') }}</h3>
					</h3>
					<div class="flex justify-between items-center mt-6 px-4 py-3 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md">
						<div class="flex justify-start items-center">
							<span class="text-base font-semibold ml-2 text-subtle-text-light dark:text-subtle-text-dark">
								{{ title }}
							</span>

							<UIcon
								v-if="secretText"
								:name="!showSecretText ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
								class="w-4 h-4 ml-2 cursor-pointer text-subtle-text-light dark:text-subtle-text-50"
								@click="showSecretText = !showSecretText"
							/>
						</div>
						<div v-if="secretText">
							<span v-if="showSecretText">
								{{ secretText }}
							</span>
							<span v-else>******</span>
						</div>
					</div>
					<div v-if="loading">
						<div class="my-6">
							<USkeleton class="h-12 w-full bg-primary-gray-light dark:bg-primary-gray-dark" />
						</div>
						<div class="my-6">
							<USkeleton class="h-12 w-full bg-primary-gray-light dark:bg-primary-gray-dark" />
						</div>
					</div>
					<div v-else>
						<div
							v-if="type?.exist === 'email' || !activeMobile"
							class="my-6"
						>
							<OtpFieldInput
								id="emailCode"
								v-model="output.verificationCode"
								type="text"
								input-class="text-left"
								send-type="resend"
								label="sentVerificationCodeToEmail"
								placeholder=""
								icon=""
								dir="ltr"
								:error-message="verify$.verificationCode.$error? $t('fieldIsRequired') : ''"
								@resend="resendCode(SendType.Email)"
							/>
						</div>
						<div
							v-if="type && type.exist==='both' && !activeMobile"
							class="text-right mb-6"
						>
							<button @click="sendToMobile()">
								<span class="text-xs font-normal text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('sendCodePhone') }}</span>
							</button>
						</div>
						<div
							v-if="(type && type.exist === 'mobile') || activeMobile"
							class="my-6"
						>
							<OtpFieldInput
								id="mobileCode"
								v-model="output.verificationCode"
								type="text"
								input-class="text-left"
								send-type="resend"
								label="sentVerificationCodeToMobile"
								placeholder=""
								icon=""
								dir="ltr"
								:error-message="verify$.verificationCode.$error? $t('fieldIsRequired') : ''"
								@resend="resendCode(SendType.SMS)"
							/>
						</div>
						<div
							v-if="authStore.login2faStatus"
							class="my-6"
						>
							<OtpFieldInput
								id="v2FACode"
								v-model="output.v2FACode"
								type="text"
								input-class="text-left"
								send-type="send"
								label-dir="rtl"
								label="twoFactorCode"
								placeholder=""
								icon=""
								dir="ltr"
								:count-down-state="false"
								:error-message="verify$.v2FACode.$error? $t('fieldIsRequired') : ''"
							/>
						</div>
						<div class="flex justify-center">
							<UButton
								size="lg"
								block
								:loading="submitLoading"
								@click="confirm()"
							>
								{{ $t("confirm") }}
							</UButton>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6">
				<IconClose
					class="text-4xl hidden md:block cursor-pointer"
					@click="closeModal()"
				/>
			</div>
		</div>
	</UModal>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import IconClose from '~/assets/svg-icons/close.svg';
import { getValueByKey } from '~/utils/helpers';
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import type { DetermineOtpType, VerifyOutput } from '~/types/definitions/security.types';
import { SendType } from '~/utils/enums/user.enum';

interface EmitDefinition {
	(event: 'confirm', value: VerifyOutput): void;
	(event: 'update:modelValue', value: unknown): void;
}
const emit = defineEmits<EmitDefinition>();

interface PropsDefinition {
	modelValue: boolean;
	title: string;
	submitLoading: boolean;
	secretText?: string;
}
const props = defineProps<PropsDefinition>();

const showSecretText = ref<boolean>(false);

const isOpen = ref(props.modelValue);
watch(() => props.modelValue, (newValue) => {
	isOpen.value = newValue;
});

watch(isOpen, (newValue) => {
	emit('update:modelValue', newValue);
});

const {	getCode, getResendCode } = useIdentification();
const authStore = useAuthStore();

const closeModal = () => {
	isOpen.value = false;
};

const output = ref<VerifyOutput>({
	verificationId: null,
	verificationCode: null,
	v2FACode: null,
});

const outputRules = reactive({
	verificationId: { required: validations.required },
	verificationCode: { required: validations.required },
	v2FACode: {},
});

const verify$ = useVuelidate(outputRules, output);

const confirm = () => {
	verify$.value.$touch();
	if (verify$.value.$invalid) {
		return;
	}

	emit('confirm', output.value);
};

const activeMobile = ref<boolean>(false);
const type = ref<DetermineOtpType | null>();
const loading = ref(true);
const getReadyRequiredData = async () => {
	await authStore.fetchCurrentUser();

	const mobile = getValueByKey(authStore.getCurrentUser, 'MOBILE') ?? '';
	const email = getValueByKey(authStore.getCurrentUser, 'EMAIL') ?? '';

	type.value = determineOtp(email, mobile);
};

watch(
	() => authStore.login2faStatus,
	(newValue) => {
		outputRules.v2FACode = newValue ? { required: validations.required } : {};
		verify$.value.$reset();
	},
	{ immediate: true },
);

const resendCode = async (type: number) => {
	if (output.value.verificationId) {
		const resendCodeId = await getResendCode(type, output.value.verificationId);
		if (resendCodeId) {
			output.value.verificationId = resendCodeId;
		}
	}
};

const getCodeData = async () => {
	if (!type.value) {
		return;
	}

	const codeId = await getCode(type.value.type);
	if (codeId) {
		output.value.verificationId = codeId;
	}
};

const sendToMobile = async () => {
	activeMobile.value = true;
	const codeId = await getCode(SendType.SMS);
	if (codeId) {
		output.value.verificationId = codeId;
	}
};

onMounted(async () => {
	await nextTick();
	loading.value = true;
	await getReadyRequiredData();
	await getCodeData();
	loading.value = false;
});
</script>
