<template>
	<div>
		<div class="my-8">
			<FormsFieldInput
				id="email"
				v-model="signupByEmailForm.email"
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
				id="password"
				v-model="signupByEmailForm.password"
				type="password"
				input-class="text-left"
				label="password"
				placeholder=""
				icon="i-heroicons-eye"
				dir="ltr"
				:error-message="vbyEmail$.password.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<div class="my-8">
			<FormsFieldInput
				id="email_refereeCode"
				v-model="signupByEmailForm.refereeCode"
				type="text"
				input-class="text-left"
				label="haveReferralCode"
				placeholder=""
				dir="ltr"
			/>
		</div>
		<div class="mb-3">
			<UCheckbox v-model="isAgreeChecked">
				<template #label>
					<span>
						<ULink
							to="/auth/login"
							class="text-primary-yellow-light dark:text-primary-yellow-dark font-bold text-sm"
							active-class="text-green"
							inactive-class=""
						>
							{{ $t('termsAndConditions') }}
						</ULink>
					</span>
					<span class="text-sm">{{ $t('agreeWithConditions') }}</span>
				</template>
			</UCheckbox>
		</div>
		<div>
			<UButton
				size="lg"
				block
				:loading="loading"
				:disabled="!isAgreeChecked"
				@click="handleSignup"
			>
				{{ $t('signup') }}
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
import { useSignUp } from '~/composables/auth/useSignUp';

const { signupByEmailForm, signupByEmail, vbyEmail$, validate } = useSignUp();
const {
	captchaData,
	showCaptcha,
	loading,
	closeCaptcha,
	refreshCaptcha,
	generateCaptcha,
	validateCaptcha,
} = useCaptcha();

const isAgreeChecked = ref(false);
const captchaHasError = ref(false);

const handleSignup = async () => {
	if (!validate(SIGNUP.BY_EMAIL)) return;

	await generateCaptcha({
		username: signupByEmailForm.email,
		action: 'signup',
	});
};

const captchaRefresh = async () => {
	captchaHasError.value = false;
	await refreshCaptcha({ username: signupByEmailForm.email, action: 'signup' });
	captchaHasError.value = true;
};

const handleCaptchaValidation = async (sliderValue: number) => {
	try {
		const { captchaKey, validate } = await validateCaptcha(sliderValue);
		if (validate) {
			signupByEmailForm.captchaKey = captchaKey;
			captchaHasError.value = false;
			closeCaptcha();

			await signupByEmail();
		}
		else {
			captchaRefresh();
		}
	}
	catch (error) {
		captchaRefresh();
		return `${error}`;
	}
};
</script>
