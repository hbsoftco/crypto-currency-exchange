<template>
	<div>
		<div class="my-8">
			<FormsFieldInput
				id="email"
				v-model="email"
				type="text"
				input-class="text-left"
				label="emailAddress"
				placeholder="your@email.com"
				icon="i-heroicons-envelope"
				dir="ltr"
			/>
		</div>
		<div>
			<FormsFieldInput
				id="password"
				v-model="password"
				type="password"
				input-class="text-left"
				label="password"
				placeholder=""
				icon="i-heroicons-eye"
				dir="ltr"
			/>
		</div>
		<div>
			<UButton
				size="lg"
				block
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
				@refresh="refreshCaptcha()"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import SlideCaptcha from '~/components/ui/SlideCaptcha.vue';
import { authRepository } from '~/repositories/auth.repository';
import type { CaptchaResponse } from '~/types/captcha-response.types';

const { $api } = useNuxtApp();
const auth = authRepository($api);

const captchaData = ref<CaptchaResponse>();

const showCaptcha = ref(false);

const handleLogin = async () => {
	try {
		const captchaResponse = await auth.generateCaptcha({
			username: email.value,
			action: 'login',
			captchaType: 'Slide',
		});

		if (captchaResponse.stateId !== 11) {
			captchaData.value = captchaResponse;
			showCaptcha.value = true;
		}

		// authRepository.login(email.value, password.value);

		// router.push('/dashboard');
	}
	catch (error) {
		console.error('Login failed:', error);
		alert('Login failed');
	}
};

const refreshCaptcha = () => {
	handleLogin();
};

const email = ref<string>('hossein.bajan@gmail.com');
const password = ref<string>('123456');
</script>
