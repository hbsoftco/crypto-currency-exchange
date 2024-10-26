<template>
	<div>
		<div>
			<p class="text-sm mb-6 mt-4">
				{{ $t('enterPhoneOrEmail') }}
			</p>
		</div>
		<div class="my-8">
			<FormsFieldInput
				id="phoneOrEmail"
				v-model="forgetPasswordStore.forgetPasswordDto.emailOrMobile"
				type="text"
				input-class="text-left"
				label="phoneOrEmail"
				placeholder=""
				icon=""
				dir="ltr"
				:error-message="v$.emailOrMobile.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<div>
			<UButton
				size="lg"
				block
				:loading="captchaStore.generateCaptchaLoading"
				@click="submit"
			>
				{{ $t('sendCode') }}
			</UButton>
		</div>
		<div>
			<SlideCaptcha
				v-if="captchaStore.openCaptcha"
				:has-error="captchaHasError"
				:data="captchaStore.captchaResponse"
				@close="captchaStore.openCaptcha=false"
				@slider-value="handleCaptchaValidation"
				@refresh="getNewCaptcha"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import SlideCaptcha from '~/components/ui/SlideCaptcha.vue';

const forgetPasswordStore = useForgetPasswordStore();
const captchaStore = useCaptchaStore();

captchaStore.captchaInput.action = 'signup';

const forgetPasswordDtoRules = {
	captchaKey: { },
	emailOrMobile: { required: validations.required },
};

const v$ = useVuelidate(forgetPasswordDtoRules, forgetPasswordStore.forgetPasswordDto);

const submit = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		await getNewCaptcha();

		if (captchaStore.stateId === 11) {
			forgetPasswordStore.stepState = 'setCode';
		}
	}
	catch (error) {
		console.error('Failed to submit ticket:', error);
	}
};

const getNewCaptcha = async () => {
	captchaStore.captchaInput.username = forgetPasswordStore.forgetPasswordDto.emailOrMobile;
	await captchaStore.generateCaptcha();
};

const handleCaptchaValidation = async (sliderValue: number) => {
	captchaStore.sliderValue = sliderValue;

	await captchaStore.validateCaptcha();

	if (!captchaStore.validCaptcha) {
		captchaHasError.value = true;
		await getNewCaptcha();
		captchaHasError.value = false;
	}
	else {
		await forgetPasswordStore.initForgetPassword();
		forgetPasswordStore.stepState = 'setCode';
	}
};

const captchaHasError = ref(false);
</script>
