<template>
	<div>
		<UContainer class="my-8">
			<div class="my-4">
				<UiTitleWithBack :title="$t('disableTwoStepLogin')" />
			</div>

			<section>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md my-10 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
					<div class="mt-10 w-full">
						<section>
							<div class="my-12">
								<FormsFieldInput
									id="email_password"
									v-model="disable2faDto.loginPassword"
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
									<span class="text-sm font-normal mr-1">
										{{ obfuscateEmail(getValueByKey(authStore.getCurrentUser, 'EMAIL') || '') }}
									</span>
								</div>
							</div>
							<div class="my-12">
								<OtpFieldInput
									id="verificationCode"
									v-model="disable2faDto.verificationCode"
									type="text"
									input-class="text-left"
									label="emailVerificationCode"
									placeholder=""
									icon=""
									dir="ltr"
									label-dir="rtl"
									color-type="transparent"
									:error-message="v$.verificationCode.$error? $t('fieldIsRequired') : ''"
									@resend="resendCode"
								/>
							</div>
							<div class="mt-12">
								<UButton
									size="lg"
									block
									:loading="loading"
									@click="submit()"
								>
									{{ $t("disableGoogle2FA") }}
								</UButton>
							</div>
						</section>
					</div>
					<div class="my-8">
						<SideGuideBox
							v-if="!miniRoutineLoading"
							:tips="tips || []"
							:faqs="faqs || []"
							:helps="helps || []"
							image="/images/svg/profile/google-authenticator.svg"
						/>
					</div>
				</div>
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import type { KeyValue } from '~/types/definitions/common.types';
import { systemRepository } from '~/repositories/system.repository';
import { TagType } from '~/utils/enums/help.enum';
import type { MiniRoutine } from '~/types/definitions/system.types';
import type { Disable2faDto } from '~/types/definitions/security.types';
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import { SendType } from '~/utils/enums/user.enum';
import { getValueByKey } from '~/utils/find-value-by-key';
import { obfuscateEmail } from '~/utils/obfuscate-email';
import { securityRepository } from '~/repositories/security.repository';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api } = useNuxtApp();
const systemRepo = systemRepository($api);
const securityRepo = securityRepository($api);

const router = useRouter();

const {	getCode, getResendCode } = useIdentification();

const twoFaStore = use2FaStore();
const authStore = useAuthStore();

const disable2faDto = ref<Disable2faDto>({
	verificationId: 0,
	verificationCode: '',
	loginPassword: '',
});

const disable2faDtoRules = {
	verificationId: { required: validations.required },
	verificationCode: { required: validations.required },
	loginPassword: { required: validations.required, complexPassword },
};

const v$ = useVuelidate(disable2faDtoRules, disable2faDto.value);

const loading = ref<boolean>(false);
const submit = async () => {
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	if (loading.value) return;
	loading.value = true;
	try {
		await securityRepo.disable2fa({
			...disable2faDto.value,
			loginPassword: btoa(disable2faDto.value.loginPassword),
		});

		await authStore.fetchCurrentUser(true);
		router.push('/account/security');
	}
	catch (error) {
		console.log(error);
	}
	finally {
		loading.value = false;
	}
};

const getIdentificationCode = async () => {
	const codeId = await getCode(SendType.Email);
	if (codeId) {
		disable2faDto.value.verificationId = codeId;
	}
};

const resendCode = async () => {
	const resendCodeId = await getResendCode(SendType.Email, disable2faDto.value.verificationId);
	if (resendCodeId) {
		disable2faDto.value.verificationId = resendCodeId;
	}
};

const tips = ref<KeyValue[]>();
const faqs = ref<KeyValue[]>();
const helps = ref<KeyValue[]>();
const miniRoutine = ref<MiniRoutine>();
const miniRoutineLoading = ref<boolean>(true);
const getSystemMiniRoutine = async () => {
	miniRoutineLoading.value = true;
	try {
		const { result } = await systemRepo.getSystemMiniRoutine({ tagType: TagType.V2FA });

		miniRoutine.value = result as MiniRoutine;
		tips.value = miniRoutine.value.tips;
		faqs.value = miniRoutine.value.faqs;
		helps.value = miniRoutine.value.helps;
	}
	catch (error) {
		console.log(error);
	}
	finally {
		miniRoutineLoading.value = false;
	}
};

onMounted(async () => {
	await twoFaStore.resetData();
	await Promise.all([
		getIdentificationCode(),
		getSystemMiniRoutine(),
	]);
});
</script>
