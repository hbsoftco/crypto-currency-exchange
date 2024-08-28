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
				:loading="loading"
				class=" "
				@click="login"
			>
				{{ $t('login') }}
			</UButton>
		</div>
		<div>
			<SlideCaptcha
				v-if="showCaptcha"
				:data="captchaData!"
				@close="showCaptcha = false"
				@slider-value="getCaptchaValue"
				@refresh="refreshCaptcha({ username: email, action: 'login' })"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import SlideCaptcha from '~/components/ui/SlideCaptcha.vue';
import { useCaptcha } from '~/composables/auth/useCaptcha';

const email = ref<string>('hossein.bajan@gmail.com');
const password = ref<string>('123456');

const { captchaData, showCaptcha, loading, generateCaptcha, getCaptchaValue, refreshCaptcha } = useCaptcha();

const login = () => {
	generateCaptcha({ username: email.value, action: 'login' });
};
</script>
