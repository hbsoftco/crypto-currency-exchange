<template>
	<div>
		<div class="my-8">
			<FormsFieldInput
				id="mobile"
				v-model="loginByMobileForm.mobile"
				type="text"
				input-class="text-left"
				label="phoneNumber"
				placeholder="۰۹۱۰۰۰۰"
				icon="i-heroicons-phone"
				dir="ltr"
				:error-message="vbyMobile$.mobile.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<div>
			<FormsFieldInput
				id="password"
				v-model="loginByMobileForm.password"
				type="password"
				input-class="text-left"
				label="password"
				placeholder=""
				icon="i-heroicons-eye"
				dir="ltr"
				:error-message="vbyMobile$.password.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<div>
			<UButton
				size="lg"
				block
				:loading="loading"
				@click="handleLogin"
			>
				{{ $t('login') }}
			</UButton>
		</div>
		<div>
			<SlideCaptcha
				v-if="showCaptcha"
				:data="captchaData!"
				@close="showCaptcha = false"
				@refresh="refreshCaptcha({ username: loginByMobileForm.mobile, action: 'login' })"
				@slider-value="captchaValidation"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import SlideCaptcha from '~/components/ui/SlideCaptcha.vue';
import { useCaptcha } from '~/composables/auth/useCaptcha';
import { useLogin } from '~/composables/auth/useLogin';

const { loginByMobileForm, loginByMobile, vbyMobile$, validate } = useLogin();
const { captchaData, showCaptcha, loading, refreshCaptcha, generateCaptcha, validateCaptcha } = useCaptcha();

const handleLogin = async () => {
	if (!validate(LOGIN.BY_MOBILE)) return;

	await generateCaptcha({
		username: loginByMobileForm.mobile,
		action: 'login',
	});
};

const captchaValidation = async (sliderValue: number) => {
	try {
		const captchaKey = await validateCaptcha(sliderValue);
		if (captchaKey) {
			loginByMobileForm.captchaKey = captchaKey;
			await loginByMobile();
		}
	}
	catch (error) {
		throw new Error(`Captcha validation failed. ${error}`);
	}
};
</script>
