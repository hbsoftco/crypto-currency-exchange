<template>
	<div>
		<div>
			<p class="text-sm mb-6 mt-4">
				{{ `${$t(`sentVerificationCodeTo${type}`)} ${typeData} ${$t('sent')}` }}
			</p>
		</div>
		<div class="my-8">
			<OtpFieldInput
				id="verificationCode"
				v-model="forgetPasswordStore.checkForgetPasswordDto.verificationCode"
				type="text"
				input-class="text-left"
				:label="`verificationCodeSentTo${type}`"
				placeholder=""
				icon=""
				dir="ltr"
				:error-message="v$.verificationCode.$error? $t('fieldIsRequired') : ''"
				@resend="forgetPasswordStore.verificationResend(SendType.Email)"
			/>
		</div>
		<div>
			<UButton
				size="lg"
				block
				:loading="forgetPasswordStore.checkForgetPasswordLoading"
				@click="submit"
			>
				{{ $t('confirm') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import { SendType } from '~/utils/enums/user.enum';

const router = useRouter();

const typeData = ref<string>();
const type = ref<'Email' | 'Mobile'>('Email');
const forgetPasswordStore = useForgetPasswordStore();

const checkForgetPasswordDtoRules = {
	verificationId: { required: validations.required },
	verificationCode: { required: validations.required },
	userId: { required: validations.required },
};

const v$ = useVuelidate(checkForgetPasswordDtoRules, forgetPasswordStore.checkForgetPasswordDto);

const submit = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		await forgetPasswordStore.checkForgetPassword();
		router.push('/auth/set-password');
	}
	catch (error) {
		console.error('Failed to submit ticket:', error);
	}
};

onMounted(() => {
	typeData.value = forgetPasswordStore.forgetPasswordDto.emailOrMobile;
	type.value = 'Email';
});
</script>
