import { authRepository } from '~/repositories/auth.repository';
import type { Check2faCodeDto, CheckCodeDto, LoginByEmailDto, LoginByMobileDto, LoginTabType, QrCodeGenerateParams, ResendVerificationParams } from '~/types/definitions/auth.types';
import type { QrCodeInput } from '~/types/definitions/common.types';
import { normalizeMobile } from '~/utils/helpers';

export const useLoginStore = defineStore('login', () => {
	const { $api } = useNuxtApp();
	const authRepo = authRepository($api);

	const authStore = useAuthStore();

	const toast = useToast();

	const selectedTabLoginType = ref<LoginTabType>('phoneNumber');

	const login2fa = ref<boolean>(false);
	const login2faDto = ref<Check2faCodeDto>({
		userId: null,
		v2fId: null,
		v2fCode: null,
		v2fHash: null,
	});

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

		login2faDto.value = {
			userId: null,
			v2fId: null,
			v2fCode: null,
			v2fHash: null,
		};

		login2fa.value = false;
		loginByEmailLoading.value = false;
		loginByMobileLoading.value = false;
		checkCodeVerificationLoading.value = false;
	};

	const loginByEmailIsValid = ref<boolean>(true);
	const loginByEmailLoading = ref<boolean>(false);
	const loginByEmail = async () => {
		try {
			loginByEmailLoading.value = true;
			loginByEmailIsValid.value = true;

			const { result } = await authRepo.loginByEmail({
				...loginByEmailDto.value,
				password: btoa(loginByEmailDto.value.password),
			});

			if (result.v2FAId) {
				login2fa.value = true;

				login2faDto.value.userId = result.userId;
				login2faDto.value.v2fId = result.v2FAId;
				login2faDto.value.v2fHash = md5WithUtf16LE(`${md5WithUtf16LE(loginByEmailDto.value.password)}${result.v2FASecret}`);
			}
			else {
				checkCodeVerificationDto.value.userId = result.userId;
				checkCodeVerificationDto.value.verificationId = result.verificationId;

				verificationResendParams.value.lastVerificationId = String(result.verificationId);
				verificationResendParams.value.userId = String(result.userId);
			}

			authStore.setPassword(loginByEmailDto.value.password);

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
			loginByMobileIsValid.value = true;

			const { result } = await authRepo.loginByMobile({
				...loginByMobileDto.value,
				mobile: normalizeMobile(loginByMobileDto.value.mobile),
				password: btoa(loginByMobileDto.value.password),
			});

			if (result.v2FAId) {
				login2fa.value = true;

				login2faDto.value.userId = result.userId;
				login2faDto.value.v2fId = result.v2FAId;
				login2faDto.value.v2fHash = md5WithUtf16LE(`${md5WithUtf16LE(loginByMobileDto.value.password)}${result.v2FASecret}`);
			}

			checkCodeVerificationDto.value.userId = result.userId;
			checkCodeVerificationDto.value.verificationId = result.verificationId;

			verificationResendParams.value.lastVerificationId = String(result.verificationId);
			verificationResendParams.value.userId = String(result.userId);

			authStore.setPassword(loginByMobileDto.value.password);

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

	const check2faCodeVerificationIsValid = ref<boolean>(true);
	const check2faCodeVerificationLoading = ref<boolean>(false);
	const check2faCodeVerification = async () => {
		try {
			check2faCodeVerificationLoading.value = true;

			const { result, statusCode } = await authRepo.check2faCodeVerification(login2faDto.value);

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
			check2faCodeVerificationIsValid.value = false;
			toast.add({
				title: useT('password'),
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
			check2faCodeVerificationLoading.value = false;
		}
	};

	const qrCodeInput = ref<QrCodeInput>({
		id: '',
		hash: '',
		type: 'login_qrc',
	});
	const generateQrCodeParams = ref<QrCodeGenerateParams>({
		initKey: '',
	});
	const generateQrCodeLoading = ref<boolean>(false);
	const generateQrCode = async () => {
		try {
			generateQrCodeLoading.value = true;
			generateQrCodeParams.value.initKey = generateGUID();

			const { result } = await authRepo.generateQrCode(generateQrCodeParams.value);

			qrCodeInput.value.id = result.lqrcID;
			qrCodeInput.value.hash = md5WithUtf16LE(`${(generateQrCodeParams.value.initKey).toUpperCase()}${result.lqrcSecret}`);

			generateQrCodeLoading.value = false;
		}
		catch (error: any) {
			generateQrCodeLoading.value = false;
			console.log(error);
		}
	};

	const getQrCodeInput = computed(() => JSON.stringify(qrCodeInput.value));

	const checkQrCodeLoading = ref<boolean>(false);
	const checkQrCode = async () => {
		try {
			checkQrCodeLoading.value = true;
			const { result } = await authRepo.checkQrCode({ lqrcId: qrCodeInput.value.id });

			const { otc, userId, userSecretKey, hashPassword } = result;
			if (otc && userId && userSecretKey && hashPassword) {
				await authStore.setAuthCredentials(otc, userId, userSecretKey);
				await authStore.setPassword(hashPassword, false);

				toast.add({
					title: useT('login'),
					description: useT('qrLoginSuccess'),
					timeout: 5000,
					color: 'green',
				});
			}

			checkQrCodeLoading.value = false;

			return true;
		}
		catch (error: any) {
			checkQrCodeLoading.value = false;
			console.log(error);
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
		// QrCode
		generateQrCodeLoading,
		generateQrCode,
		generateQrCodeParams,
		getQrCodeInput,
		checkQrCode,
		// Share
		selectedTabLoginType,
		// 2FA
		login2faDto,
		login2fa,
		check2faCodeVerificationIsValid,
		check2faCodeVerificationLoading,
		check2faCodeVerification,
	};
});
