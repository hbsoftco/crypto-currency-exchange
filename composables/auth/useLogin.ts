import { useVuelidate } from '@vuelidate/core';

import { authRepository } from '~/repositories/auth.repository';
import type { LoginByMobileDto, LoginByEmailDto } from '~/types/dto/login.dto';

export const useLogin = () => {
	// const toast = useToast();

	const { $api } = useNuxtApp();
	const auth = authRepository($api);

	const loading = ref(false);

	const loginByMobileForm = reactive<LoginByMobileDto>({
		captchaKey: '',
		ignore2FA: null,
		password: '',
		mobile: '',

	});

	const loginByMobileRules = {
		captchaKey: { required: validations.required },
		ignore2FA: { },
		password: { required: validations.required },
		mobile: { required: validations.required },
	};

	const loginByEmailForm = reactive<LoginByEmailDto>({
		captchaKey: '',
		ignore2FA: null,
		password: '123@qwe!@#QWE',
		email: 'hossein.bajan@gmail.com',

	});

	const loginByEmailRules = {
		captchaKey: { },
		// captchaKey: { required: validations.required },
		ignore2FA: { },
		password: { required: validations.required },
		email: { required: validations.required },
	};

	const vbyMobile$ = useVuelidate(loginByMobileRules, loginByMobileForm);
	const vbyEmail$ = useVuelidate(loginByEmailRules, loginByEmailForm);

	const validate = (form: string) => {
		if (form === LOGIN.BY_MOBILE) {
			vbyMobile$.value.$touch();
			return !vbyMobile$.value.$invalid;
		}
		else if (form === LOGIN.BY_EMAIL) {
			vbyEmail$.value.$touch();
			return !vbyEmail$.value.$invalid;
		}
	};

	const loginByMobile = async () => {
		try {
			if (!validate(SIGNUP.BY_MOBILE)) {
				return Promise.resolve({ success: false });
			}

			loading.value = true;
			const loginResponse = await auth.loginByMobile({
				captchaKey: loginByMobileForm.captchaKey,
				ignore2FA: loginByMobileForm.ignore2FA,
				password: btoa(loginByMobileForm.password),
				mobile: loginByMobileForm.mobile,
			});

			return loginResponse;
		}
		catch (error) {
			return error;
		}
		finally {
			loading.value = false;
		}
	};

	const loginByEmail = async () => {
		try {
			loading.value = true;
			const loginResponse = await auth.loginByEmail({
				captchaKey: loginByEmailForm.captchaKey,
				ignore2FA: loginByEmailForm.ignore2FA,
				password: btoa(loginByEmailForm.password),
				email: loginByEmailForm.email,
			});

			return loginResponse;
		}
		catch (error) {
			return error;
		}
		finally {
			loading.value = false;
		}
	};

	return {
		loginByMobileForm,
		loginByMobile,
		vbyMobile$,
		loginByEmailForm,
		loginByEmail,
		vbyEmail$,
		validate,
	};
};
