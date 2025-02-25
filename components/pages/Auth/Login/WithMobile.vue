<template>
	<div>
		<div class="my-8">
			<FormsFieldInput
				id="mobile"
				v-model="loginStore.loginByMobileDto.mobile"
				type="text"
				:number="true"
				input-class="text-left"
				label="phoneNumber"
				placeholder="09120000000"
				icon="i-heroicons-phone"
				dir="ltr"
				:error-message="v$.mobile.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<div>
			<FormsFieldInput
				id="password"
				v-model="loginStore.loginByMobileDto.password"
				type="password"
				input-class="text-left"
				label="password"
				placeholder=""
				icon="i-heroicons-eye"
				dir="ltr"
				:error-message="
					v$.password.$error
						? (v$.password.required.$response ? $t('passwordMustBeComplex') : $t('fieldIsRequired'))
						: ''
				"
			/>
		</div>
		<div>
			<UButton
				size="lg"
				block
				:loading="captchaStore.generateCaptchaLoading || loginStore.loginByMobileLoading || localLoading"
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
				@close="closeCaptcha"
				@slider-value="handleCaptchaValidation"
				@refresh="getNewCaptcha"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import { normalizeMobile } from '~/utils/helpers';
import SlideCaptcha from '~/components/ui/SlideCaptcha.vue';
import { complexPassword } from '~/utils/validation-rules';

const loginStore = useLoginStore();
const captchaStore = useCaptchaStore();

const router = useRouter();

captchaStore.captchaInput.action = 'login';

const captchaHasError = ref(false);
const localLoading = ref(false);

const loginByMobileRules = {
	captchaKey: { },
	ignore2FA: { },
	password: { required: validations.required, complexPassword },
	mobile: { required: validations.required },
};

const v$ = useVuelidate(loginByMobileRules, loginStore.loginByMobileDto);

const getNewCaptcha = async () => {
	captchaStore.captchaInput.username = normalizeMobile(loginStore.loginByMobileDto.mobile);
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
			await loginStore.loginByMobile();

			if (loginStore.loginByMobileIsValid) {
				if (loginStore.login2fa) {
					router.push('/auth/otp-2fa');
				}
				else {
					router.push({
						path: '/auth/otp',
						query: { action: 'login', type: 'mobile' },
					});
				}
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
		await loginStore.loginByMobile();

		if (loginStore.loginByMobileIsValid) {
			if (loginStore.login2fa) {
				router.push('/auth/otp-2fa');
			}
			else {
				router.push({
					path: '/auth/otp',
					query: { action: 'login', type: 'mobile' },
				});
			}
		}
	}

	localLoading.value = false;
};

const closeCaptcha = () => {
	captchaStore.openCaptcha = false;
	captchaStore.generateCaptchaLoading = false;
	localLoading.value = false;
	loginStore.loginByEmailLoading = false;
};
</script>
