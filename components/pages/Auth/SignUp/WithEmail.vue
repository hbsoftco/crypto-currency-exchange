<template>
	<div>
		<div class="my-8">
			<FormsFieldInput
				id="email"
				v-model="signupStore.signupByEmailDto.email"
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
				id="password"
				v-model="signupStore.signupByEmailDto.password"
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
		<div class="my-8">
			<ReferralFieldInput
				id="email_refereeCode"
				v-model="signupStore.signupByEmailDto.refereeCode"
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
				:disabled="!isAgreeChecked"
				:loading="captchaStore.generateCaptchaLoading || signupStore.signupByEmailLoading"
				@click="submit"
			>
				{{ $t('signup') }}
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

import ReferralFieldInput from '~/components/forms/ReferralFieldInput.vue';
import SlideCaptcha from '~/components/ui/SlideCaptcha.vue';
import { complexPassword } from '~/utils/validation-rules';

interface PropsDefinition {
	inviter: string | null;
}

const props = defineProps<PropsDefinition>();

const signupStore = useSignupStore();
const captchaStore = useCaptchaStore();

const router = useRouter();

captchaStore.captchaInput.action = 'signup';

const isVisible = ref(false);
const isAgreeChecked = ref(false);
const captchaHasError = ref(false);

if (props.inviter) {
	signupStore.signupByEmailDto.refereeCode = props.inviter;
	isVisible.value = true;
}

const signupByEmailRules = {
	captchaKey: { },
	refereeCode: { },
	password: { required: validations.required, complexPassword },
	email: { required: validations.required },
};

const v$ = useVuelidate(signupByEmailRules, signupStore.signupByEmailDto);

const submit = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		await getNewCaptcha();

		if (captchaStore.stateId === 11) {
			await signupStore.signupByEmail();

			if (signupStore.signupByEmailIsValid) {
				router.push({
					path: '/auth/otp',
					query: { action: 'signup', type: 'email' },
				});
			}
		}
	}
	catch (error) {
		console.error('Failed:', error);
	}
};

const getNewCaptcha = async () => {
	captchaStore.captchaInput.username = signupStore.signupByEmailDto.email;
	await captchaStore.generateCaptcha();
};

const handleCaptchaValidation = async (sliderValue: number) => {
	captchaStore.sliderValue = sliderValue;

	await captchaStore.validateCaptcha();

	if (!captchaStore.validCaptcha) {
		captchaHasError.value = true;
		await getNewCaptcha();
		captchaHasError.value = false;
	}
	else {
		captchaStore.openCaptcha = false;
		await signupStore.signupByEmail();

		if (signupStore.signupByEmailIsValid) {
			router.push({
				path: '/auth/otp',
				query: { action: 'signup', type: 'email' },
			});
		}
	}
};

const closeCaptcha = () => {
	captchaStore.openCaptcha = false;
	captchaStore.generateCaptchaLoading = false;
	signupStore.signupByEmailLoading = false;
};
</script>
