<template>
	<Auth :title="$t('securityConfirmation')">
		<div>
			<p class="text-sm mb-6 mt-4">
				{{ $t('enterGoogle2FACode') }}
			</p>
		</div>
		<div class="my-8">
			<OtpFieldInput
				id="google2FA"
				v-model="loginStore.login2faDto.v2fCode"
				type="text"
				input-class="text-left"
				:label="$t('google2FA')"
				placeholder=""
				icon=""
				dir="ltr"
				label-dir="rtl"
				:clear="clearCode"
				:error-message="v$.v2fCode.$error? $t('fieldIsRequired') : ''"
				:count-down-state="false"
				@completed="submit"
				@cleared="setClearCode"
			/>
		</div>
		<div>
			<UButton
				size="lg"
				block
				:loading="loginStore.check2faCodeVerificationLoading || localLoading"
				@click="submit"
			>
				{{ $t('login') }}
			</UButton>
		</div>
	</Auth>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import Auth from '~/components/pages/Auth/Auth.vue';
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';

definePageMeta({
	layout: 'auth',
	middleware: 'no-auth',
});

const loginStore = useLoginStore();

const router = useRouter();

const localLoading = ref<boolean>(false);
const clearCode = ref<boolean>(false);

const setClearCode = () => {
	clearCode.value = false;
};

const checkCodeVerificationDtoRules = {
	v2fHash: { required: validations.required },
	v2fId: { required: validations.required },
	v2fCode: { required: validations.required },
	userId: { required: validations.required },
};

const v$ = useVuelidate(checkCodeVerificationDtoRules, loginStore.login2faDto);

const submit = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		localLoading.value = true;
		await loginStore.check2faCodeVerification();

		if (loginStore.check2faCodeVerificationIsValid) {
			loginStore.resetAllData();
			router.push('/');
		}
		else {
			localLoading.value = false;
			clearCode.value = true;
			loginStore.check2faCodeVerificationLoading = false;

			loginStore.check2faCodeVerificationIsValid = true;
		}
	}
	catch (error) {
		localLoading.value = false;
		console.error('Failed:', error);
	}
};
</script>
