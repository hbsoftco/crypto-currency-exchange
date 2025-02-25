import { authRepository } from '~/repositories/auth.repository';
import type { CheckCodeDto, ResendVerificationParams, SignupByEmailDto, SignupByMobileDto } from '~/types/definitions/auth.types';
import { normalizeMobile } from '~/utils/helpers';

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
	const signupByMobileDto = ref<SignupByMobileDto>({
		captchaKey: '',
		mobile: '',
		password: '',
		refereeCode: '',
	});
	const checkCodeVerificationDto = ref<CheckCodeDto>({
		userId: 0,
		verificationCode: '',
		verificationId: 0,
	});

	const resetAllData = () => {
		const captchaStore = useCaptchaStore();
		captchaStore.openCaptcha = false;

		signupByEmailDto.value = {
			captchaKey: '',
			email: '',
			password: '',
			refereeCode: '',
		};

		signupByMobileDto.value = {
			captchaKey: '',
			mobile: '',
			password: '',
			refereeCode: '',
		};

		checkCodeVerificationDto.value = {
			userId: 0,
			verificationCode: '',
			verificationId: 0,
		};

		signupByEmailLoading.value = false;
		checkCodeVerificationLoading.value = false;
	};

	const signupByMobileIsValid = ref<boolean>(true);
	const signupByMobileLoading = ref<boolean>(false);
	const signupByMobile = async () => {
		try {
			signupByMobileLoading.value = true;
			signupByMobileIsValid.value = true;

			const response = await authRepo.signupByMobile({
				...signupByMobileDto.value,
				mobile: normalizeMobile(signupByMobileDto.value.mobile),
				password: btoa(signupByMobileDto.value.password),
			});

			checkCodeVerificationDto.value.userId = response.result.userId;
			checkCodeVerificationDto.value.verificationId = response.result.verificationId;

			verificationResendParams.value.lastVerificationId = String(response.result.verificationId);
			verificationResendParams.value.userId = String(response.result.userId);

			signupByMobileLoading.value = false;
		}
		catch (error: any) {
			signupByMobileIsValid.value = false;
			toast.add({
				title: useT('signup'),
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});

			signupByMobileLoading.value = false;
		}
	};

	const signupByEmailIsValid = ref<boolean>(true);
	const signupByEmailLoading = ref<boolean>(false);
	const signupByEmail = async () => {
		try {
			signupByEmailLoading.value = true;
			signupByEmailIsValid.value = true;

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
			signupByEmailIsValid.value = false;
			toast.add({
				title: useT('signup'),
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
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
			toast.add({
				title: useT('signup'),
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
		}
	};

	const checkCodeVerificationIsValid = ref<boolean>(true);
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
			checkCodeVerificationIsValid.value = false;
			toast.add({
				title: useT('signup'),
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
			checkCodeVerificationLoading.value = false;
		}
	};

	return {
		// Email
		signupByEmailDto,
		checkCodeVerificationDto,
		signupByEmailLoading,
		checkCodeVerificationLoading,
		signupByEmailIsValid,
		checkCodeVerification,
		checkCodeVerificationIsValid,
		verificationResend,
		signupByEmail,
		// Mobile
		signupByMobileDto,
		signupByMobile,
		signupByMobileIsValid,
		signupByMobileLoading,
		resetAllData,
	};
});
