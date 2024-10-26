import { authRepository } from '~/repositories/auth.repository';
import type { SignupByEmailDto } from '~/types/dto/signup.dto';
import type { CheckCodeDto, ResendVerificationParams } from '~/types/verification.types';

export const useSignupStore = defineStore('Signup', () => {
	const { $api } = useNuxtApp();
	const authRepo = authRepository($api);

	const toast = useToast();

	const signupByEmailDto = ref<SignupByEmailDto>({
		captchaKey: '',
		email: '',
		password: '',
		refereeCode: '',
	});
	const checkCodeVerificationDto = ref<CheckCodeDto>({
		userId: 0,
		verificationCode: '',
		verificationId: 0,
	});

	const signupByEmailIsValid = ref<boolean>(true);
	const signupByEmailLoading = ref<boolean>(false);
	const signupByEmail = async () => {
		try {
			signupByEmailLoading.value = true;

			const response = await authRepo.signupByEmail({
				...signupByEmailDto.value,
				password: btoa(signupByEmailDto.value.password),
			});

			checkCodeVerificationDto.value.userId = response.result.userId;
			checkCodeVerificationDto.value.verificationId = response.result.verificationId;

			verificationResendParams.value.lastVerificationId = String(response.result.verificationId);
			verificationResendParams.value.userId = String(response.result.userId);

			signupByEmailLoading.value = false;
		}
		catch (error: any) {
			if (error.response._data.statusCode === -1311165) {
				signupByEmailIsValid.value = false;
				toast.add({
					title: useT('signup'),
					description: useT('emailAlreadyExist'),
					timeout: 5000,
					color: 'red',
				});
			}

			signupByEmailLoading.value = false;
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

			checkCodeVerificationDto.value.verificationId = response.result.verificationId;
		}
		catch (error: any) {
			console.log(error);
		}
	};

	const checkCodeVerificationLoading = ref<boolean>(false);
	const checkCodeVerification = async () => {
		try {
			checkCodeVerificationLoading.value = true;

			const response = await authRepo.checkCodeVerification(checkCodeVerificationDto.value);
			toast.add({
				title: useT('signup'),
				description: useT('signupSuccessfully'),
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
			checkCodeVerificationLoading.value = false;
		}
	};

	return {
		signupByEmailDto,
		checkCodeVerificationDto,
		signupByEmailLoading,
		checkCodeVerificationLoading,
		signupByEmailIsValid,
		checkCodeVerification,
		verificationResend,
		signupByEmail,
	};
});
