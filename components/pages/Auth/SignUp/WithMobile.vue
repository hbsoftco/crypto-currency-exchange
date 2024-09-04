<template>
	<div>
		<div class="my-8">
			<FormsFieldInput
				id="mobile"
				v-model="mobile"
				type="text"
				input-class="text-left"
				label="phoneNumber"
				placeholder="۰۹۱۰۰۰۰"
				icon="i-heroicons-phone"
				dir="ltr"
			/>
		</div>
		<div>
			<FormsFieldInput
				id="mobile_password"
				v-model="password"
				type="password"
				input-class="text-left"
				label="password"
				placeholder=""
				icon="i-heroicons-eye"
				dir="ltr"
			/>
		</div>
		<div class="my-8">
			<ReferralFieldInput
				id="mobile_refereeCode"
				v-model="refereeCode"
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
				@click="signup"
			>
				{{ $t('signup') }}
			</UButton>
		</div>
		<div>
			<SlideCaptcha
				v-if="showCaptcha"
				:data="captchaData!"
				@close="showCaptcha = false"
				@slider-value="handleCaptchaValidation"
				@refresh="refreshCaptcha({ username: mobile, action: 'signup' })"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import SlideCaptcha from '~/components/ui/SlideCaptcha.vue';
import { useCaptcha } from '~/composables/auth/useCaptcha';
import { useAuth } from '~/composables/auth/useAuth';
import ReferralFieldInput from '~/components/forms/ReferralFieldInput.vue';

const { signupByMobile } = useAuth();

interface PropsDefinition {
	inviter: string | null;
}

const props = defineProps<PropsDefinition>();

const mobile = ref<string>('+989155859539');
const refereeCode = ref<string>('');
const password = ref<string>('123@qweQWE');
const isAgreeChecked = ref<boolean>(false);

const isVisible = ref(false);

if (props.inviter) {
	refereeCode.value = props.inviter;
	isVisible.value = true;
}

const {
	captchaData,
	showCaptcha,
	loading,
	generateCaptcha,
	validateCaptcha,
	refreshCaptcha } = useCaptcha();

const signup = async () => {
	const captchaResult = await generateCaptcha({ username: mobile.value, action: 'signup' });
	if (captchaResult instanceof Error) {
		alert('Failed to generate captcha. Please try again.');
		return;
	}

	showCaptcha.value = true;
};

const handleCaptchaValidation = async (sliderValue?: number) => {
	if (sliderValue === undefined) {
		alert('Slider value is required. Please try again.');
		return;
	}

	const result = await validateCaptcha(sliderValue);

	if (result instanceof Error) {
		alert('Captcha validation failed. Please try again.');
	}
	else {
		showCaptcha.value = false;
		await doSignup();
	}
};

const doSignup = async () => {
	if (!captchaData.value) {
		alert('Captcha data is missing. Please try again.');
		return;
	}

	const response = await signupByMobile({
		captchaKey: captchaData.value.id,
		password: password.value,
		mobile: mobile.value,
		refereeCode: refereeCode.value || '',
	});

	if (response instanceof Error) {
		alert('Signup failed. Please try again.');
	}
	else {
		alert('Signup successful!');
	}
};
</script>
