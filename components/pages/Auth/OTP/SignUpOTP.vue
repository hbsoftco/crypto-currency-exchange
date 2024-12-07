<template>
	<div>
		<div>
			<p class="text-sm mb-6 mt-4">
				{{ `${$t(verificationCodeText)} ${typeData} ${$t('continueVerificationCode')}` }}
			</p>
		</div>
		<div class="my-8">
			<OtpFieldInput
				id="verificationCodeText"
				v-model="signupStore.checkCodeVerificationDto.verificationCode"
				type="text"
				input-class="text-left"
				:label="`verificationCodeSentTo${capitalizer(type)}`"
				placeholder=""
				icon=""
				dir="ltr"
				:clear="clearCode"
				:error-message="v$.verificationCode.$error? $t('fieldIsRequired') : ''"
				@resend="resendCode"
				@completed="submit"
				@cleared="setClearCode"
			/>
		</div>
		<div>
			<UButton
				size="lg"
				block
				:loading="signupStore.checkCodeVerificationLoading || localLoading"
				@click="submit"
			>
				{{ $t('activateAccount') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import { capitalizer } from '~/utils/helpers';
import { SendType } from '~/utils/enums/user.enum';

const signupStore = useSignupStore();

const route = useRoute();
const router = useRouter();

const typeData = ref<string>();
const type = ref<string>(route.query.type as string);
const verificationCodeText = ref<string>('');
const localLoading = ref<boolean>(false);
const clearCode = ref<boolean>(false);

const resendCode = async () => {
	let resendType = SendType.Email;
	if (type.value === 'mobile') {
		resendType = SendType.SMS;
	}

	await signupStore.verificationResend(resendType);
};

if (type.value === 'email') {
	verificationCodeText.value = 'verificationCode6charSentToEmail';
}
else {
	verificationCodeText.value = 'verificationCode6charSentToMobile';
}

const setClearCode = () => {
	clearCode.value = false;
};

const checkCodeVerificationDtoRules = {
	verificationId: { required: validations.required },
	verificationCode: { required: validations.required },
	userId: { required: validations.required },
};

const v$ = useVuelidate(checkCodeVerificationDtoRules, signupStore.checkCodeVerificationDto);

const submit = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		localLoading.value = true;
		await signupStore.checkCodeVerification();

		if (signupStore.checkCodeVerificationIsValid) {
			signupStore.resetAllData();
			router.push('/');
		}
		else {
			localLoading.value = false;
			signupStore.checkCodeVerificationLoading = false;

			localStorage.removeItem('password');
		}
	}
	catch (error) {
		localLoading.value = false;
		clearCode.value = true;
		console.error('Failed:', error);
	}
};

onMounted(() => {
	if (type.value === 'email') {
		typeData.value = signupStore.signupByEmailDto.email;
	}
	else {
		typeData.value = signupStore.signupByMobileDto.mobile;
	}
});
</script>
