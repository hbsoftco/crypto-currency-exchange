import { useVuelidate } from '@vuelidate/core';

import { authRepository } from '~/repositories/auth.repository';
import type { SignupByEmailDto, SignupByMobileDto } from '~/types/definitions/auth.types';
import type { BodyErrorResponse, ErrorResponse } from '~/types/response/error.type';
import type { SignUpResponse } from '~/types/response/sign-up.types';

export const useSignUp = () => {
	const toast = useToast();

	const { $api } = useNuxtApp();
	const auth = authRepository($api);

	const loading = ref(false);
	const errorMessage = ref<BodyErrorResponse | null>(null);

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
		email: 'hossein.bajan@yahoo.com',
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

	const signupByEmail = async (): Promise<SignUpResponse> => {
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
		catch (error: unknown) {
			const err = error as ErrorResponse;
			errorMessage.value = err.response._data;

			toast.add({
				title: useT('error'),
				description: `${err.response._data.message}`,
				timeout: 5000,
				color: 'red',
			});

			throw createError({
				statusCode: 500,
				statusMessage: `${err.response._data.message}`,
			});
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
		errorMessage,
	};
};
