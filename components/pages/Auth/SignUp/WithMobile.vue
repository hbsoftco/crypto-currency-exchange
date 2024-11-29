<template>
	<div>
		<div class="my-8">
			<FormsFieldInput
				id="mobile"
				v-model="signupStore.signupByMobileDto.mobile"
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
				id="mobile_password"
				v-model="signupStore.signupByMobileDto.password"
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
				id="mobile_refereeCode"
				v-model="signupStore.signupByMobileDto.refereeCode"
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
				:loading="captchaStore.generateCaptchaLoading || signupStore.signupByMobileLoading"
				:disabled="!isAgreeChecked"
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

import { normalizeMobile } from '~/utils/normalize-mobile';
import SlideCaptcha from '~/components/ui/SlideCaptcha.vue';
import ReferralFieldInput from '~/components/forms/ReferralFieldInput.vue';
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
	signupStore.signupByMobileDto.refereeCode = props.inviter;
	isVisible.value = true;
}

const signupByMobileRules = {
	captchaKey: { },
	refereeCode: { },
	password: { required: validations.required, complexPassword },
	mobile: { required: validations.required },
};

const v$ = useVuelidate(signupByMobileRules, signupStore.signupByMobileDto);

const submit = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		await getNewCaptcha();

		if (captchaStore.stateId === 11) {
			await signupStore.signupByMobile();
			router.push({
				path: '/auth/otp',
				query: { action: 'signup', type: 'mobile' },
			});
		}
	}
	catch (error) {
		console.error('Failed:', error);
	}
};

const getNewCaptcha = async () => {
	captchaStore.captchaInput.username = normalizeMobile(signupStore.signupByMobileDto.mobile);
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
		await signupStore.signupByMobile();

		if (signupStore.signupByMobileIsValid) {
			router.push({
				path: '/auth/otp',
				query: { action: 'signup', type: 'mobile' },
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
