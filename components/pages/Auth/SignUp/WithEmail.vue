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
			<ReferralFieldInput
				id="email_refereeCode"
				v-model="signupByEmailForm.refereeCode"
				type="text"
				input-class="text-left"
				label="haveReferralCode"
				placeholder=""
				dir="ltr"
				:is-visible="isVisible"
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
import md5 from 'md5';

import ReferralFieldInput from '~/components/forms/ReferralFieldInput.vue';
import SlideCaptcha from '~/components/ui/SlideCaptcha.vue';
import { useCaptcha } from '~/composables/auth/useCaptcha';
import { useSignUp } from '~/composables/auth/useSignUp';

const authStore = useAuthStore();
const verificationStore = useVerificationStore();

const router = useRouter();

interface PropsDefinition {
	inviter: string | null;
}

const props = defineProps<PropsDefinition>();

const {
	signupByEmailForm,
	signupByEmail,
	vbyEmail$,
	validate,
	errorMessage,
} = useSignUp();
const {
	captchaData,
	showCaptcha,
	loading,
	closeCaptcha,
	refreshCaptcha,
	generateCaptcha,
	validateCaptcha,
	validateData,
} = useCaptcha();

const isAgreeChecked = ref(false);
const captchaHasError = ref(false);
const isVisible = ref(false);

if (props.inviter) {
	signupByEmailForm.refereeCode = props.inviter;
	isVisible.value = true;
}

const savePassword = (password: string): string => {
	const md5Password = md5(password);
	authStore.savePassword(md5Password);

	return md5Password;
};

const handleSignup = async () => {
	if (!validate(SIGNUP.BY_EMAIL)) return;

	const captchaResponse = await generateCaptcha({
		username: signupByEmailForm.email,
		action: 'signup',
	});

	if (captchaResponse && captchaResponse.stateId === 11) {
		await handleSuccessfulCaptcha();
	}
	else {
		showCaptcha.value = true;
	}
};

const captchaRefresh = async () => {
	captchaHasError.value = false;
	await refreshCaptcha({ username: signupByEmailForm.email, action: 'signup' });
	captchaHasError.value = true;
};

const handleSuccessfulCaptcha = async () => {
	try {
		loading.value = true;
		if (validateData.value.captchaKey) {
			signupByEmailForm.captchaKey = validateData.value.captchaKey;
			const response = await signupByEmail();

			if (response.statusCode === 200) {
				savePassword(signupByEmailForm.password);

				verificationStore.setVerificationData({
					verificationId: response.result.verificationId,
					userId: response.result.userId,
					wloId: response.result.wloId,
					type: 'email',
					username: signupByEmailForm.email,
				});

				router.push({
					path: '/auth/otp',
					query: { action: 'signup', type: 'email' },
				});
			}
		}
	}
	catch (error) {
		throw new Error(`Login failed. ${error}`);
	}
};

const handleCaptchaValidation = async (sliderValue: number) => {
	try {
		loading.value = true;
		const { captchaKey, validate } = await validateCaptcha(sliderValue);
		if (validate && captchaKey) {
			signupByEmailForm.captchaKey = captchaKey;
			captchaHasError.value = false;
			closeCaptcha();

			// Check signup
			const { result } = await signupByEmail();

			// Save data into store
			verificationStore.setVerificationData({
				verificationId: result.verificationId,
				userId: result.userId,
				wloId: result.wloId,
				type: 'email',
				username: signupByEmailForm.email,
			});

			router.push({
				path: '/auth/otp',
				query: { action: 'signup', type: 'email' },
			});
		}
		else {
			if (!errorMessage.value) {
				captchaRefresh();
			}

			errorMessage.value = null;
		}
	}
	catch (error) {
		if (!errorMessage.value) {
			captchaRefresh();
		}
		return `${error}`;
	}
};
</script>
