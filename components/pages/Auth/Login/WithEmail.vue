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
				:has-error="captchaHasError"
				:data="captchaData!"
				@close="showCaptcha = false"
				@slider-value="handleCaptchaValidation"
				@refresh="captchaRefresh"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import SlideCaptcha from '~/components/ui/SlideCaptcha.vue';
import { useCaptcha } from '~/composables/auth/useCaptcha';
import { useLogin } from '~/composables/auth/useLogin';

const { loginByEmailForm, loginByEmail, vbyEmail$, validate } = useLogin();
const {
	captchaData,
	showCaptcha,
	loading,
	closeCaptcha,
	refreshCaptcha,
	generateCaptcha,
	validateCaptcha,
} = useCaptcha();

const verificationStore = useVerificationStore();

const router = useRouter();

const captchaHasError = ref(false);

const handleLogin = async () => {
	if (!validate(LOGIN.BY_EMAIL)) return;

	await generateCaptcha({
		username: loginByEmailForm.email,
		action: 'login',
	});
};

const captchaRefresh = async () => {
	captchaHasError.value = false;
	await refreshCaptcha({ username: loginByEmailForm.email, action: 'signup' });
	captchaHasError.value = true;
};

const handleCaptchaValidation = async (sliderValue: number) => {
	try {
		const { captchaKey, validate } = await validateCaptcha(sliderValue);
		if (validate && captchaKey) {
			loginByEmailForm.captchaKey = captchaKey;
			captchaHasError.value = false;
			closeCaptcha();

			// Check login
			const { result } = await loginByEmail();

			// Save data into store
			verificationStore.setVerificationData({
				verificationId: result.verificationId,
				userId: result.userId,
				wloId: result.wloId,
				type: 'email',
				username: loginByEmailForm.email,
			});

			router.push({
				path: '/auth/otp',
				query: { action: 'login', type: 'email' },
			});
		}
		else {
			captchaRefresh();
		}
	}
	catch (error) {
		throw new Error(`Captcha validation failed. ${error}`);
	}
};
</script>
