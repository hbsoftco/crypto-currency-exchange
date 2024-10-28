import { authRepository } from '~/repositories/auth.repository';
import type { LoginByEmailDto, LoginByMobileDto } from '~/types/login.types';
import type { CheckCodeDto, ResendVerificationParams } from '~/types/verification.types';
import { normalizeMobile } from '~/utils/normalize-mobile';

export const useLoginStore = defineStore('login', () => {
	const { $api } = useNuxtApp();
	const authRepo = authRepository($api);

	const authStore = useAuthStore();

	const toast = useToast();

	const loginByEmailDto = ref<LoginByEmailDto>({
		captchaKey: '',
		email: '',
		password: '',
		ignore2FA: null,
	});
	const loginByMobileDto = ref<LoginByMobileDto>({
		captchaKey: '',
		mobile: '',
		password: '',
		ignore2FA: null,
	});
	const checkCodeVerificationDto = ref<CheckCodeDto>({
		userId: 0,
		verificationCode: '',
		verificationId: 0,
	});

	const resetAllData = () => {
		const captchaStore = useCaptchaStore();
		captchaStore.openCaptcha = false;

		loginByEmailDto.value = {
			captchaKey: '',
			email: '',
			password: '',
			ignore2FA: null,
		};

		loginByMobileDto.value = {
			captchaKey: '',
			mobile: '',
			password: '',
			ignore2FA: null,
		};

		checkCodeVerificationDto.value = {
			userId: 0,
			verificationCode: '',
			verificationId: 0,
		};

		loginByEmailLoading.value = false;
		loginByMobileLoading.value = false;
		checkCodeVerificationLoading.value = false;
	};

	const loginByEmailIsValid = ref<boolean>(true);
	const loginByEmailLoading = ref<boolean>(false);
	const loginByEmail = async () => {
		try {
			loginByEmailLoading.value = true;

			const response = await authRepo.loginByEmail({
				...loginByEmailDto.value,
				password: btoa(loginByEmailDto.value.password),
			});

			authStore.setPassword(loginByEmailDto.value.password);

			checkCodeVerificationDto.value.userId = response.result.userId;
			checkCodeVerificationDto.value.verificationId = response.result.verificationId;

			verificationResendParams.value.lastVerificationId = String(response.result.verificationId);
			verificationResendParams.value.userId = String(response.result.userId);

			loginByEmailLoading.value = false;
		}
		catch (error: any) {
			loginByEmailIsValid.value = false;
			toast.add({
				title: useT('login'),
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});

			loginByEmailLoading.value = false;
		}
	};

	const loginByMobileIsValid = ref<boolean>(true);
	const loginByMobileLoading = ref<boolean>(false);
	const loginByMobile = async () => {
		try {
			loginByMobileLoading.value = true;

			const response = await authRepo.loginByMobile({
				...loginByMobileDto.value,
				mobile: normalizeMobile(loginByMobileDto.value.mobile),
				password: btoa(loginByMobileDto.value.password),
			});

			authStore.setPassword(loginByMobileDto.value.password);

			checkCodeVerificationDto.value.userId = response.result.userId;
			checkCodeVerificationDto.value.verificationId = response.result.verificationId;

			verificationResendParams.value.lastVerificationId = String(response.result.verificationId);
			verificationResendParams.value.userId = String(response.result.userId);

			loginByMobileLoading.value = false;
		}
		catch (error: any) {
			loginByMobileIsValid.value = false;
			toast.add({
				title: useT('login'),
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
			loginByMobileLoading.value = false;
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
				title: useT('login'),
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

			const { result, statusCode } = await authRepo.checkCodeVerification(checkCodeVerificationDto.value);

			toast.add({
				title: useT('login'),
				description: useT('loggedInSuccessfully'),
				timeout: 5000,
				color: 'green',
			});

			const { otc, userId, userSecretKey } = result;
			authStore.setAuthCredentials(otc, userId, userSecretKey);

			return statusCode;
		}
		catch (error: any) {
			checkCodeVerificationIsValid.value = false;
			toast.add({
				title: useT('password'),
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
			checkCodeVerificationLoading.value = false;
		}
	};

	return {
		// Email
		loginByEmailDto,
		loginByEmailIsValid,
		loginByEmailLoading,
		loginByEmail,
		verificationResend,
		checkCodeVerificationDto,
		checkCodeVerification,
		checkCodeVerificationIsValid,
		checkCodeVerificationLoading,
		// Mobile
		loginByMobileDto,
		loginByMobileIsValid,
		loginByMobileLoading,
		loginByMobile,
		resetAllData,
	};
});
