import { authRepository } from '~/repositories/auth.repository';
import type { CheckForgetPasswordDto, InitForgetPasswordDto, ResetPasswordDto } from '~/types/forget-password.types';
import type { ResendVerificationParams } from '~/types/verification.types';

export const useForgetPasswordStore = defineStore('forgetPassword', () => {
	const { $api } = useNuxtApp();
	const authRepo = authRepository($api);

	const toast = useToast();

	const otc = ref<string>();
	const stepState = ref<'getCode' | 'setCode'>('getCode');
	const forgetPasswordDto = ref<InitForgetPasswordDto>({
		captchaKey: '',
		emailOrMobile: '',
	});
	const checkForgetPasswordDto = ref<CheckForgetPasswordDto>({
		userId: 0,
		verificationId: 0,
		verificationCode: '',
	});
	const resetPasswordDto = ref<ResetPasswordDto>({
		newPassword: '',
		verificationId: 0,
		userSecretKey: 0,
	});

	const resetAllData = () => {
		const captchaStore = useCaptchaStore();
		captchaStore.openCaptcha = false;

		otc.value = '';
		stepState.value = 'getCode';
		forgetPasswordDto.value = {
			captchaKey: '',
			emailOrMobile: '',
		};
		checkForgetPasswordDto.value = {
			userId: 0,
			verificationId: 0,
			verificationCode: '',
		};
		resetPasswordDto.value = {
			newPassword: '',
			verificationId: 0,
			userSecretKey: 0,
		};

		initForgetPasswordLoading.value = false;
		checkForgetPasswordLoading.value = false;
		resetPasswordLoading.value = false;
	};

	const initForgetPasswordLoading = ref<boolean>(false);
	const initForgetPassword = async () => {
		try {
			initForgetPasswordLoading.value = true;

			const response = await authRepo.initForgetPassword(forgetPasswordDto.value);

			checkForgetPasswordDto.value.userId = response.result.userId;
			checkForgetPasswordDto.value.verificationId = response.result.verificationId;

			verificationResendParams.value.lastVerificationId = String(response.result.verificationId);
			verificationResendParams.value.userId = String(response.result.userId);

			resetPasswordDto.value.verificationId = response.result.verificationId;

			initForgetPasswordLoading.value = false;
		}
		catch (error: any) {
			console.log(error);
			initForgetPasswordLoading.value = false;
		}
	};

	const checkForgetPasswordLoading = ref<boolean>(false);
	const checkForgetPassword = async () => {
		try {
			checkForgetPasswordLoading.value = true;

			const { result } = await authRepo.checkForgetPassword(checkForgetPasswordDto.value);

			otc.value = result.otc;

			resetPasswordDto.value.userSecretKey = result.userSecretKey;

			checkForgetPasswordLoading.value = false;
		}
		catch (error: any) {
			console.log(error);
			checkForgetPasswordLoading.value = false;
		}
	};

	const verificationResendParams = ref<ResendVerificationParams>({
		userId: '',
		lastVerificationId: '',
		resendType: '',
	});
	const verificationResend = async (resendType: number) => {
		try {
			verificationResendParams.value.resendType = String(resendType);
			const response = await authRepo.verificationResend(verificationResendParams.value);

			checkForgetPasswordDto.value.verificationId = response.result.verificationId;

			resetPasswordDto.value.verificationId = response.result.verificationId;
		}
		catch (error: any) {
			console.log(error);
		}
	};

	const resetPasswordLoading = ref<boolean>(false);
	const resetPassword = async (newPassword: string) => {
		try {
			resetPasswordDto.value.newPassword = btoa(String(newPassword));
			resetPasswordLoading.value = true;

			const response = await authRepo.resetPassword(resetPasswordDto.value);
			toast.add({
				title: useT('password'),
				description: useT('passwordChangedSuccessfully'),
				timeout: 5000,
				color: 'green',
			});
			return response.statusCode;
		}
		catch (error: any) {
			if (error.response._data.statusCode === 422) {
				toast.add({
					title: useT('password'),
					description: useT('passwordMustBeComplex'),
					timeout: 5000,
					color: 'red',
				});
			}
			resetPasswordLoading.value = false;
		}
	};

	return {
		initForgetPassword,
		checkForgetPasswordDto,
		resetPasswordDto,
		forgetPasswordDto,
		stepState,
		checkForgetPasswordLoading,
		resetPasswordLoading,
		checkForgetPassword,
		verificationResend,
		resetPassword,
		resetAllData,
	};
});
