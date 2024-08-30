import { useVuelidate } from '@vuelidate/core';

import { authRepository } from '~/repositories/auth.repository';
import type { CheckCodeDto } from '~/types/dto/verification.dto';
import type { VerificationCheckCodeResponse } from '~/types/response/verification.types';

export const useVerification = () => {
	// const toast = useToast();

	const { $api } = useNuxtApp();
	const auth = authRepository($api);

	const loading = ref(false);

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
		catch (error) {
			throw new Error(`Invalid response format ${error}`);
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
	};
};
