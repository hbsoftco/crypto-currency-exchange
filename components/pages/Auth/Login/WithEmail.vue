<template>
	<div>
		<div class="my-8">
			<FormsFieldInput
				id="email"
				v-model="loginByEmailForm.email"
				type="text"
				input-class="text-left"
				label="emailAddress"
				placeholder="your@email.com"
				icon="i-heroicons-envelope"
				dir="ltr"
				:error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<div>
			<FormsFieldInput
				id="email_password"
				v-model="loginByEmailForm.password"
				type="password"
				input-class="text-left"
				label="password"
				placeholder=""
				icon="i-heroicons-eye"
				dir="ltr"
				:error-message="vbyEmail$.password.$error? $t('fieldIsRequired') : ''"
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
				@refresh="refreshCaptcha({ username: email, action: 'login' })"
				@slider-value="captchaValidation"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import SlideCaptcha from '~/components/ui/SlideCaptcha.vue';
import { useCaptcha } from '~/composables/auth/useCaptcha';
import { useLogin } from '~/composables/auth/useLogin';

const { loginByEmailForm, loginByEmail, vbyEmail$, validate } = useLogin();
const { captchaData, showCaptcha, loading, refreshCaptcha, generateCaptcha, validateCaptcha } = useCaptcha();

const handleLogin = async () => {
	if (!validate(LOGIN.BY_EMAIL)) return;

	await generateCaptcha({
		username: loginByEmailForm.email,
		action: 'login',
	});
};

const captchaValidation = async (sliderValue: number) => {
	try {
		const captchaKey = await validateCaptcha(sliderValue);
		if (captchaKey) {
			loginByEmailForm.captchaKey = captchaKey;
			await loginByEmail();
		}
	}
	catch (error) {
		throw new Error(`Captcha validation failed. ${error}`);
	}
};
</script>
