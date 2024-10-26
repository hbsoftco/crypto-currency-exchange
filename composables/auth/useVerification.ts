import { useVuelidate } from '@vuelidate/core';

import { authRepository } from '~/repositories/auth.repository';
import type { CheckCodeDto } from '~/types/verification.types';
import type { BodyErrorResponse, ErrorResponse } from '~/types/response/error.type';
import type { VerificationCheckCodeResponse } from '~/types/response/verification.types';

export const useVerification = () => {
	const toast = useToast();

	const { $api } = useNuxtApp();
	const auth = authRepository($api);

	const loading = ref(false);
	const verificationErrorMessage = ref<BodyErrorResponse | null>(null);

	const checkCodeVerificationForm = reactive<CheckCodeDto>({
		userId: null,
		verificationId: null,
		verificationCode: null,

	});

	const checkCodeVerificationRules = {
		userId: { required: validations.required },
		verificationId: { required: validations.required },
		verificationCode: { required: validations.required },
	};

	const v$ = useVuelidate(checkCodeVerificationRules, checkCodeVerificationForm);

	const validate = () => {
		v$.value.$touch();
		return !v$.value.$invalid;
	};

	const checkCodeVerification = async (): Promise<VerificationCheckCodeResponse> => {
		try {
			loading.value = true;
			const verificationResponse = await auth.checkCodeVerification(checkCodeVerificationForm);

			return verificationResponse;
		}
		catch (error: unknown) {
			const err = error as ErrorResponse;
			verificationErrorMessage.value = err.response._data;

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
		checkCodeVerification,
		loading,
		checkCodeVerificationForm,
		v$,
		validate,
		verificationErrorMessage,
	};
};
