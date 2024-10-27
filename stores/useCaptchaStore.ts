import { authRepository } from '~/repositories/auth.repository';
import type { CaptchaResponse } from '~/types/captcha-response.types';
import type { CaptchaRequestParams } from '~/types/dto/generate-captcha.dto';
import type { ValidateCaptchaDto } from '~/types/dto/validate-captcha.dto';

export const useCaptchaStore = defineStore('captcha', () => {
	const { $api } = useNuxtApp();
	const authRepo = authRepository($api);

	const forgetPasswordStore = useForgetPasswordStore();
	const signupStore = useSignupStore();
	const loginStore = useLoginStore();

	const captchaInput = ref<CaptchaRequestParams>({
		username: '',
		action: '',
		captchaType: 'Slide',
	});

	const captchaResponse = ref<CaptchaResponse>({
		backgroundImage: '',
		secondaryImage: '',
		id: '',
		stateId: 0,
	});

	// Required variables
	const stateId = ref<number>();
	const captchaKey = ref<string>();
	const backgroundImage = ref<string>();
	const secondaryImage = ref<string>();

	const openCaptcha = ref<boolean>(false);

	const sliderValue = ref<number>();

	const generateCaptchaLoading = ref<boolean>(false);
	const generateCaptcha = async () => {
		try {
			generateCaptchaLoading.value = true;
			const response = await authRepo.generateCaptcha(captchaInput.value);
			if (response) {
				stateId.value = response.stateId;
				captchaKey.value = response.id;

				forgetPasswordStore.forgetPasswordDto.captchaKey = response.id;

				signupStore.signupByEmailDto.captchaKey = response.id;
				signupStore.signupByMobileDto.captchaKey = response.id;

				loginStore.loginByMobileDto.captchaKey = response.id;
				loginStore.loginByEmailDto.captchaKey = response.id;

				if (stateId.value === 0) {
					captchaResponse.value = response;

					backgroundImage.value = response.backgroundImage;
					secondaryImage.value = response.secondaryImage;

					openCaptcha.value = true;
				}
			}
		}
		catch (error) {
			console.log(error);
		}
		finally {
			generateCaptchaLoading.value = false;
		}
	};

	const captchaValidateInput = ref<ValidateCaptchaDto>({
		captchaKey: '',
		points: [
			{ x: 0 },
		],
	});

	const validCaptcha = ref<boolean>(false);
	const validateCaptcha = async () => {
		try {
			if (captchaKey.value && sliderValue.value) {
				captchaValidateInput.value.captchaKey = captchaKey.value;
				captchaValidateInput.value.points[0].x = captchaRange(sliderValue.value);
			}
			else {
				return;
			}
			const response = await authRepo.validateCaptcha(captchaValidateInput.value);
			if (response.statusCode === 200) {
				validCaptcha.value = true;
			}
		}
		catch (error: any) {
			if (error.response._data.statusCode === 400 && error.response._data.message === 'Captcha is not valid') {
				validCaptcha.value = false;
			}
		}
	};

	return {
		generateCaptcha,
		validateCaptcha,
		validCaptcha,
		openCaptcha,
		captchaInput,
		captchaKey,
		sliderValue,
		captchaResponse,
		generateCaptchaLoading,
		stateId,
		backgroundImage,
		secondaryImage,
	};
});
