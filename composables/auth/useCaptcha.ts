import { authRepository } from '~/repositories/auth.repository';
import type { CaptchaResponse } from '~/types/captcha-response.types';

type GenerateCaptchaInput = {
	username: string;
	action: 'login' | 'signup';
};

type ValidateCaptchaResponse = {
	validate: boolean;
	statusCode: number;
	message?: string;
	captchaKey?: string;
};

export const useCaptcha = () => {
	const { $api } = useNuxtApp();
	const auth = authRepository($api);

	const captchaData = ref<CaptchaResponse>();
	const showCaptcha = ref(false);
	const loading = ref(false);
	const validateData = ref<ValidateCaptchaResponse>({
		validate: false,
		statusCode: 0,
		message: '',
		captchaKey: '',
	});

	const refreshCaptcha = async (input: GenerateCaptchaInput) => {
		await generateCaptcha(input);
	};

	const generateCaptcha = async (input: GenerateCaptchaInput): Promise<CaptchaResponse> => {
		loading.value = true;
		resetValidateDate();
		try {
			const captchaResponse = await auth.generateCaptcha({
				username: input.username,
				action: input.action,
				captchaType: 'Slide',
			});

			captchaData.value = captchaResponse;

			if (captchaResponse.stateId !== 11) {
				captchaData.value = captchaResponse;
				showCaptcha.value = true;
			}
			else {
				captchaData.value.id = captchaResponse.id;
				validateData.value.captchaKey = captchaData.value.id;
				validateData.value.validate = true;
				validateData.value.statusCode = 200;

				showCaptcha.value = false;
			}

			return captchaResponse;
		}
		// eslint-disable-next-line no-useless-catch
		catch (error) {
			throw error;
		}
		finally {
			loading.value = false;
		}
	};

	const validateCaptcha = async (sliderValue: number | undefined) => {
		if (sliderValue !== undefined && captchaData.value?.id) {
			loading.value = true;
			try {
				const captchaResponse = await auth.validateCaptcha({
					captchaKey: captchaData.value?.id,
					points: [
						{ x: captchaRange(sliderValue) },
					],
				});

				validateData.value.statusCode = captchaResponse.statusCode;

				if (captchaResponse.statusCode === 200) {
					validateData.value.validate = true;
					validateData.value.captchaKey = captchaData.value.id;
					validateData.value.message = String(captchaResponse.result);

					closeCaptcha();

					return validateData.value;
				}
				else {
					validateData.value.validate = false;
					validateData.value.message = '';

					return validateData.value;
				}
			}
			catch (error) {
				validateData.value.statusCode = 400;
				validateData.value.validate = false;
				validateData.value.message = String(error);
			}
			finally {
				loading.value = false;
			}

			return validateData.value;
		}
		else {
			validateData.value.validate = false;
			validateData.value.message = 'Slider value is undefined or captcha data is missing.';
		}

		return validateData.value;
	};

	const resetValidateDate = () => {
		validateData.value = {
			validate: false,
			statusCode: 0,
			message: '',
			captchaKey: '',
		};
	};

	const closeCaptcha = () => {
		showCaptcha.value = false;
	};

	return {
		validateData,
		captchaData,
		showCaptcha,
		loading,
		refreshCaptcha,
		generateCaptcha,
		validateCaptcha,
		resetValidateDate,
		closeCaptcha,
	};
};
