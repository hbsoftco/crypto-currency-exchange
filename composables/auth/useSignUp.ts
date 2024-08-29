import { useVuelidate } from '@vuelidate/core';

import { authRepository } from '~/repositories/auth.repository';
import type { SignupByEmailDto, SignupByMobileDto } from '~/types/dto/signup.dto';

export const useSignUp = () => {
	// const toast = useToast();

	const { $api } = useNuxtApp();
	const auth = authRepository($api);

	const loading = ref(false);

	const signupByMobileForm = reactive<SignupByMobileDto>({
		captchaKey: '',
		refereeCode: null,
		password: '',
		mobile: '',

	});

	const signupByMobileRules = {
		captchaKey: { required: validations.required },
		refereeCode: { required: validations.required },
		password: { required: validations.required },
		mobile: { required: validations.required },
	};

	const signupByEmailForm = reactive<SignupByEmailDto>({
		captchaKey: '',
		refereeCode: null,
		password: '',
		email: '',

	});

	const signupByEmailRules = {
		captchaKey: { required: validations.required },
		refereeCode: { },
		password: { required: validations.required },
		email: { required: validations.required },
	};

	const vbyMobile$ = useVuelidate(signupByMobileRules, signupByMobileForm);
	const vbyEmail$ = useVuelidate(signupByEmailRules, signupByEmailForm);

	const validate = (form: string) => {
		if (form === SIGNUP.BY_MOBILE) {
			vbyMobile$.value.$touch();
			return !vbyMobile$.value.$invalid;
		}
		else if (form === SIGNUP.BY_EMAIL) {
			vbyEmail$.value.$touch();
			return !vbyEmail$.value.$invalid;
		}
	};

	const signupByMobile = async (input: SignupByMobileDto) => {
		try {
			if (!validate(SIGNUP.BY_MOBILE)) {
				return Promise.resolve({ success: false });
			}

			loading.value = true;
			const signupResponse = await auth.signupByMobile({
				captchaKey: input.captchaKey,
				refereeCode: input.refereeCode,
				password: btoa(input.password),
				mobile: input.mobile,
			});

			return signupResponse;
		}
		catch (error) {
			return error;
		}
		finally {
			loading.value = false;
		}
	};

	const signupByEmail = async (input: SignupByEmailDto) => {
		try {
			if (!validate(SIGNUP.BY_EMAIL)) {
				return Promise.resolve({ success: false });
			}

			loading.value = true;
			const signupResponse = await auth.signupByEmail({
				captchaKey: input.captchaKey,
				refereeCode: input.refereeCode,
				password: btoa(input.password),
				email: input.email,
			});

			return signupResponse;
		}
		catch (error) {
			return error;
		}
		finally {
			loading.value = false;
		}
	};

	return {
		signupByMobileForm,
		signupByMobile,
		vbyMobile$,
		signupByEmailForm,
		signupByEmail,
		vbyEmail$,
	};
};
