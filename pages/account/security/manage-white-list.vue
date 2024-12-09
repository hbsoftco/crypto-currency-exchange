<template>
	<div>
		<UContainer class="my-8">
			<div class="my-4">
				<UiTitleWithBack :title="$t('manageWhiteListIp')" />
			</div>
			<section>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md mt-8 mb-4 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
					<div class="mt-10 w-full">
						<div>
							<OtpFieldInput
								id="withdrawPinCode"
								v-model="withdrawPinCodeDto.withdrawPinCode"
								color-type="transparent"
								type="text"
								input-class="text-left"
								:count-down-state="false"
								send-type="send"
								label="settingPinCode"
								placeholder=""
								icon=""
								dir="ltr"
								:error-message="v$.withdrawPinCode.$error? $t('fieldIsRequired') : ''"
							/>
							<!-- <TextareaFieldInput
								id="content"
								v-model="phoneOrEmail"
								type="text"
								input-class="text-right"
								label="listAllowedIps"
								placeholder=""
								icon=""
								dir="rtl"
								color-type="transparent"
							/> -->
						</div>
						<p class="text-xs font-normal mb-8 leading-6">
							{{ $t('settingPinCodeAlert') }}
						</p>
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
							:title="$t('pinCodeWithdrawal')"
							:submit-loading="loading"
							:secret-text="withdrawPinCodeDto.withdrawPinCode"
							@confirm="submit($event)"
						/>
					</div>
					<div class="my-8">
						<SideGuideBox :tag-type="TagType.WITHDRAW_PIN_CODE" />
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
import type { VerifyOutput, WithdrawPinCodeDto } from '~/types/definitions/security.types';
import { TagType } from '~/utils/enums/help.enum';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api } = useNuxtApp();
const securityRepo = securityRepository($api);

const authStore = useAuthStore();

const router = useRouter();

const isOpenVerifyModal = ref(false);

const withdrawPinCodeDto = ref<WithdrawPinCodeDto>({
	verificationId: null,
	verificationCode: '',
	v2FACode: null,
	withdrawPinCode: '',
});

const withdrawPinCodeDtoRules = {
	verificationId: { },
	verificationCode: { },
	withdrawPinCode: { required: validations.required },
	v2FACode: { },
};

const v$ = useVuelidate(withdrawPinCodeDtoRules, withdrawPinCodeDto);

const loading = ref<boolean>(false);
const submit = async (event: VerifyOutput) => {
	if (event.verificationCode) {
		withdrawPinCodeDto.value.verificationCode = event.verificationCode;
	}
	if (event.verificationId) {
		withdrawPinCodeDto.value.verificationId = event.verificationId;
	}
	if (event.v2FACode) {
		withdrawPinCodeDto.value.v2FACode = event.v2FACode;
	}

	loading.value = true;
	try {
		await securityRepo.storeWithdrawPinCode(withdrawPinCodeDto.value);

		router.push('/account/security');
		await authStore.fetchCurrentUser(true);
	}
	catch (error) {
		console.log(error);
	}
	finally {
		loading.value = false;
	}
};

const openVerifyModal = () => {
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	isOpenVerifyModal.value = true;
};
</script>

<!--
<template>
	<div>
		<UContainer class="my-20">
			<div class="my-4">
				<UiTitleWithBack :title="$t('ManageWhiteListIp')" />
			</div>
			<section>
				<ManageWhiteList />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import ManageWhiteList from '~/components/pages/Site/Account/Security/ManageWhiteList/index.vue';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});
</script>

<style scoped></style> -->
