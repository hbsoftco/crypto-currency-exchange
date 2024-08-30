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
		refereeCode: '',
		password: '123@qwe!@#QWE',
		mobile: '+989155859539',

	});

	const signupByMobileRules = {
		captchaKey: { },
		refereeCode: { },
		password: { required: validations.required },
		mobile: { required: validations.required },
	};

	const signupByEmailForm = reactive<SignupByEmailDto>({
		captchaKey: '',
		refereeCode: '',
		password: '123@qwe!@#QWE',
		email: 'hossein.bajan@gmail.com',

	});

	const signupByEmailRules = {
		captchaKey: { },
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

	const signupByMobile = async () => {
		try {
			loading.value = true;
			const signupResponse = await auth.signupByMobile({
				captchaKey: signupByMobileForm.captchaKey,
				refereeCode: signupByMobileForm.refereeCode,
				password: btoa(signupByMobileForm.password),
				mobile: signupByMobileForm.mobile,
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

	const signupByEmail = async () => {
		try {
			loading.value = true;
			const signupResponse = await auth.signupByEmail({
				captchaKey: signupByEmailForm.captchaKey,
				refereeCode: signupByEmailForm.refereeCode,
				password: btoa(signupByEmailForm.password),
				email: signupByEmailForm.email,
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
		validate,
	};
};
