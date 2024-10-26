<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
			<div class="mt-10 w-full">
				<!-- <div class="my-8">
					<FormsFieldInput
						id="phoneOrEmail"
						v-model="phoneOrEmail"
						type="text"
						input-class="text-left"
						label="newPhoneNumber"
						placeholder=""
						icon="heroicons:phone"
						dir="ltr"
						color-type="transparent"
					/>
				</div>
				<div class="my-6">
					<OtpFieldInput
						id="phoneOrEmail"
						v-model="phoneOrEmail"
						type="text"
						input-class="text-left"
						label="confirmCodeMessageNewMobile"
						placeholder=""
						icon=""
						dir="ltr"
					/>
				</div>
				<div class="my-6">
					<OtpFieldInput
						id="phoneOrEmail"
						v-model="phoneOrEmail"
						type="text"
						input-class="text-left"
						label="confirmCodeMessagePreviousMobile"
						placeholder=""
						icon=""
						dir="ltr"
					/>
				</div> -->
				<div class="my-8">
					<FormsFieldInput
						id="emailAddressNew"
						v-model="dto.emailAddressNew"
						type="text"
						input-class="text-left"
						label="newEmail"
						placeholder="your@email.com"
						icon="i-heroicons-envelope"
						dir="ltr"
						color-type="transparent"
					/>
				</div>
				<div class="my-6">
					<OtpFieldInput
						id="uvIdEmailAddressNew"
						v-model="dto.uvIdEmailAddressNew"
						color-type="transparent"
						type="text"
						input-class="text-left"
						:countdown="sendCodeCountdown"
						send-type="send"
						label="confirmCodeNewEmail"
						placeholder=""
						icon=""
						dir="ltr"
						@resend="resendCode()"
						@send-code="sendCodeForNewEmail"
					/>
				</div>
				<div class="my-6">
					<OtpFieldInput
						id="uvIdEmailAddressOld"
						v-model="dto.uvIdEmailAddressOld"
						color-type="transparent"
						type="text"
						input-class="text-left"
						label="confirmCodePreviousEmail"
						:countdown="100"
						placeholder=""
						icon=""
						dir="ltr"
						@resend="resendCode()"
					/>
				</div>
				<!-- <div class="my-6">
					<OtpFieldInput
						id="phoneOrEmail"
						v-model="phoneOrEmail"
						color-type="transparent"
						type="text"
						input-class="text-left"
						label="confirmCode2FA"
						placeholder=""
						icon=""
						dir="ltr"
					/>
				</div> -->

				<div class="mt-12 flex justify-center text-center gap-2">
					<UButton
						size="lg"
						class="w-full flex justify-center border text-base border-primary-yellow-light dark:border-primary-yellow-dark font-medium px-6 py-2"
						to="/"
					>
						{{ $t("save") }}
					</UButton>
				</div>
			</div>
			<div class="my-8">
				<ImportantPoint />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import ImportantPoint from '~/components/pages/Account/Security/ChangeEmail/ImportantPoint.vue';
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import { SendType } from '~/utils/enums/user.enum';
import type { SetEmailDto } from '~/types/dto/user.dto';

const dto = ref<SetEmailDto>({
	uvIdEmailAddressOld: 0,
	uvCodeEmailAddressOld: '',
	uvIdEmailAddressNew: 0,
	uvCodeEmailAddressNew: '',
	v2FACode: null,
	emailAddressNew: '',
});

const sendCodeCountdown = ref<number>(0);

const {
	identificationCodeLoading,
	getIdentificationCode,
	identificationId,
	resendIdentificationCodeLoading,
	getResendIdentificationCode,
	resendIdentificationId,
	sendNewIdentificationCodeLoading,
	getSendNewIdentificationCode,
	sendNewIdentificationId,
} = useIdentification();

const fetchIdentificationCode = async () => {
	await getIdentificationCode(String(SendType.Email));

	if (identificationId.value) {
		dto.value.uvIdEmailAddressOld = identificationId.value;
	}
};

console.log(identificationCodeLoading.value);
console.log(resendIdentificationCodeLoading.value);
console.log(sendNewIdentificationCodeLoading.value);

const resendCode = async () => {
	await resendIdentificationCode(dto.value.uvIdEmailAddressOld);
};

const sendCodeForNewEmail = async () => {
	await sendNewIdentificationCode();
};

const resendIdentificationCode = async (lastVerificationId: number) => {
	await getResendIdentificationCode(String(SendType.Email), lastVerificationId);

	if (resendIdentificationId.value) {
		dto.value.uvIdEmailAddressOld = resendIdentificationId.value;
	}
};

const sendNewIdentificationCode = async () => {
	await getSendNewIdentificationCode(String(SendType.Email), dto.value.emailAddressNew);

	if (sendNewIdentificationId.value) {
		dto.value.uvIdEmailAddressNew = sendNewIdentificationId.value;
		sendCodeCountdown.value = 60;
	}
};

onMounted(async () => {
	await fetchIdentificationCode();
	// await resendIdentificationCode();
	console.log(dto.value);
});
</script>
