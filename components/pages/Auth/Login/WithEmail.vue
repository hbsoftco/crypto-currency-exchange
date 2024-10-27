<template>
	<div>
		<div class="my-8">
			<FormsFieldInput
				id="email"
				v-model="loginStore.loginByEmailDto.email"
				type="text"
				input-class="text-left"
				label="emailAddress"
				placeholder="your@email.com"
				icon="i-heroicons-envelope"
				dir="ltr"
				:error-message="v$.email.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<div>
			<FormsFieldInput
				id="email_password"
				v-model="loginStore.loginByEmailDto.password"
				type="password"
				input-class="text-left"
				label="password"
				placeholder=""
				icon="i-heroicons-eye"
				dir="ltr"
				:error-message="v$.password.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<div>
			<UButton
				size="lg"
				block
				:loading="captchaStore.generateCaptchaLoading || loginStore.loginByEmailLoading || localLoading"
				@click="submit"
			>
				{{ $t('login') }}
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

const loginStore = useLoginStore();
const captchaStore = useCaptchaStore();

const router = useRouter();

captchaStore.captchaInput.action = 'login';

const captchaHasError = ref(false);
const localLoading = ref(false);

const loginByEmailRules = {
	captchaKey: { },
	ignore2FA: { },
	password: { required: validations.required },
	email: { required: validations.required },
};

const v$ = useVuelidate(loginByEmailRules, loginStore.loginByEmailDto);

const getNewCaptcha = async () => {
	captchaStore.captchaInput.username = loginStore.loginByEmailDto.email;
	await captchaStore.generateCaptcha();
};

const submit = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		localLoading.value = true;
		await getNewCaptcha();

		if (captchaStore.stateId === 11) {
			await loginStore.loginByEmail();

			if (loginStore.loginByEmailIsValid) {
				router.push({
					path: '/auth/otp',
					query: { action: 'login', type: 'email' },
				});
			}
			localLoading.value = false;
		}
	}
	catch (error) {
		localLoading.value = false;
		console.error('Failed:', error);
	}
};

const handleCaptchaValidation = async (sliderValue: number) => {
	captchaStore.sliderValue = sliderValue;
	localLoading.value = true;
	await captchaStore.validateCaptcha();

	if (!captchaStore.validCaptcha) {
		captchaHasError.value = true;
		await getNewCaptcha();
		captchaHasError.value = false;
	}
	else {
		captchaStore.openCaptcha = false;
		await loginStore.loginByEmail();

		if (loginStore.loginByEmailIsValid) {
			router.push({
				path: '/auth/otp',
				query: { action: 'login', type: 'email' },
			});
		}
	}

	localLoading.value = false;
};
</script>
