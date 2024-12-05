<template>
	<div>
		<UContainer class="my-8">
			<div class="my-4">
				<UiTitleWithBack :title="$t('changePhone')" />
			</div>
			<section>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md mt-8 mb-10 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
					<div class="mt-10 w-full">
						<div class="mb-8">
							<FormsFieldInput
								id="mobile"
								v-model="changePhoneDto.mobileNew"
								type="text"
								:number="true"
								input-class="text-left"
								label="newPhoneNumber"
								placeholder="09120000000"
								icon="i-heroicons-phone"
								dir="ltr"
								color-type="transparent"
								mt-class="mt-0"
								:error-message="v$.mobileNew.$error? $t('fieldIsRequired') : ''"
							/>
						</div>
						<div class="my-6">
							<OtpFieldInput
								id="uvCodeMoblieNew"
								v-model="changePhoneDto.uvCodeMoblieNew"
								color-type="transparent"
								type="text"
								input-class="text-left"
								:countdown="sendCodeCountdown"
								send-type="send"
								label="sentVerificationCodeToNewMobile"
								placeholder=""
								icon=""
								dir="ltr"
								:error-message="v$.uvCodeMoblieNew.$error? $t('fieldIsRequired') : ''"
								@resend="resendCode()"
								@send-code="getNewIdentificationCode"
							/>
						</div>
						<div class="my-6">
							<OtpFieldInput
								id="uvCodeMoblieOld"
								v-model="changePhoneDto.uvCodeMoblieOld"
								color-type="transparent"
								type="text"
								input-class="text-left"
								send-type="resend"
								:label="mobileExist ? 'verificationCodeSentToOldMobile' : 'verificationCodeSentEmail'"
								placeholder=""
								icon=""
								dir="ltr"
								:error-message="v$.uvCodeMoblieOld.$error? $t('fieldIsRequired') : ''"
								@resend="resendCode()"
							/>
						</div>
						<div
							v-if="authStore.login2faStatus"
							class="my-6"
						>
							<OtpFieldInput
								id="verificationCodeSentEmail"
								v-model="changePhoneDto.v2FACode"
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
					<div class="my-8">
						<SideGuideBox
							v-if="!miniRoutineLoading"
							:tips="tips || []"
							:faqs="faqs || []"
							:helps="helps || []"
						/>
					</div>
				</div>
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { securityRepository } from '~/repositories/security.repository';
import { systemRepository } from '~/repositories/system.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { ChangePhoneDto } from '~/types/definitions/security.types';
import type { MiniRoutine } from '~/types/definitions/system.types';
import { TagType } from '~/utils/enums/help.enum';
import { SendType } from '~/utils/enums/user.enum';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api } = useNuxtApp();

const securityRepo = securityRepository($api);
const systemRepo = systemRepository($api);
const router = useRouter();

const authStore = useAuthStore();
const {	getCode,	getResendCode,	getNewCode } = useIdentification();

const changePhoneDto = ref<ChangePhoneDto>({
	uvIdMobileOld: null,
	uvCodeMoblieOld: '',
	uvIdMobileNew: null,
	uvCodeMoblieNew: '',
	mobileNew: '',
	v2FACode: 'null',
});

const changePhoneRules = {
	uvIdMobileOld: { required: validations.required },
	uvCodeMoblieOld: { required: validations.required },
	uvIdMobileNew: { required: validations.required },
	uvCodeMoblieNew: { required: validations.required },
	mobileNew: { required: validations.required },
	v2FACode: authStore.login2faStatus ? { } : { required: validations.required },
};

const v$ = useVuelidate(changePhoneRules, changePhoneDto);

const loading = ref<boolean>(false);
const submit = async () => {
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	if (loading.value) return;
	loading.value = true;
	try {
		await securityRepo.changePhone({
			...changePhoneDto.value,
			mobileNew: normalizeMobile(changePhoneDto.value.mobileNew),
		});

		await authStore.fetchCurrentUser(true);
		router.push('account/security');
	}
	catch (error) {
		console.log(error);
	}
	finally {
		loading.value = false;
	}
};

const mobileExist = ref<boolean>(false);
const checkMobileExist = () => {
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
		changePhoneDto.value.uvIdMobileOld = codeId;
	}
};

const sendCodeCountdown = ref<number>(0);
const getNewIdentificationCode = async () => {
	if (!changePhoneDto.value.mobileNew) {
		return;
	}

	sendCodeCountdown.value = 60;
	const newCodeId = await getNewCode(SendType.SMS, changePhoneDto.value.mobileNew);

	if (newCodeId) {
		changePhoneDto.value.uvIdMobileNew = newCodeId;
	}
	else {
		sendCodeCountdown.value = 0;
	}
};

const resendCode = async () => {
	const type = mobileExist.value ? SendType.SMS : SendType.Email;

	if (changePhoneDto.value.uvIdMobileOld) {
		const resendCodeId = await getResendCode(type, changePhoneDto.value.uvIdMobileOld);
		if (resendCodeId) {
			changePhoneDto.value.uvIdMobileOld = resendCodeId;
		}
	}
};

const tips = ref<KeyValue[]>();
const faqs = ref<KeyValue[]>();
const helps = ref<KeyValue[]>();
const miniRoutine = ref<MiniRoutine>();
const miniRoutineLoading = ref<boolean>(false);
const getSystemMiniRoutine = async () => {
	if (miniRoutineLoading.value) return;
	miniRoutineLoading.value = true;
	try {
		const { result } = await systemRepo.getSystemMiniRoutine({ tagType: TagType.MOBILE_CHANGE });

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
	await checkMobileExist();
	await getIdentificationCode();
	await getSystemMiniRoutine();
});
</script>
