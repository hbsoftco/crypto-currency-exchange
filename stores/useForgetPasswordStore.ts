import { authRepository } from '~/repositories/auth.repository';
import type { InitForgetPasswordDto } from '~/types/forget-password.types';

export const useForgetPasswordStore = defineStore('forgetPassword', () => {
	const { $api } = useNuxtApp();
	const authRepo = authRepository($api);

	const stepState = ref<'getCode' | 'setCode'>('getCode');
	const forgetPasswordDto = ref<InitForgetPasswordDto>({
		captchaKey: '',
		emailOrMobile: '',
	});
	const initForgetPasswordUserId = ref<number>();
	const initForgetPasswordVerificationId = ref<number>();

	const initForgetPasswordLoading = ref<boolean>(false);
	const initForgetPassword = async () => {
		try {
			initForgetPasswordLoading.value = true;

			const response = await authRepo.initForgetPassword(forgetPasswordDto.value);

			initForgetPasswordUserId.value = response.result.userId;
			initForgetPasswordVerificationId.value = response.result.verificationId;

			initForgetPasswordLoading.value = false;
		}
		catch (error: any) {
			console.log(error);
			initForgetPasswordLoading.value = false;
		}
	};

	return {
		initForgetPassword,
		initForgetPasswordUserId,
		initForgetPasswordVerificationId,
		forgetPasswordDto,
		stepState,
	};
});
