import { authRepository } from '~/repositories/auth.repository';
import type { CaptchaResponse } from '~/types/captcha-response.types';

type GenerateCaptchaInput = {
	username: string;
	action: 'login' | 'signup';
};

export const useCaptcha = () => {
	const toast = useToast();

	const { $api } = useNuxtApp();
	const auth = authRepository($api);

	const captchaData = ref<CaptchaResponse>();
	const showCaptcha = ref(false);
	const loading = ref(false);

	const refreshCaptcha = (input: GenerateCaptchaInput) => {
		generateCaptcha(input);
	};

	const generateCaptcha = async (input: GenerateCaptchaInput) => {
		loading.value = true;
		try {
			const captchaResponse = await auth.generateCaptcha({
				username: input.username,
				action: input.action,
				captchaType: 'Slide',
			});

			if (captchaResponse.stateId !== 11) {
				captchaData.value = captchaResponse;
				showCaptcha.value = true;
			}
			else {
				captchaData.value.id = captchaResponse.id;
				showCaptcha.value = false;
			}
		}
		catch (error) {
			return error;
		}
		finally {
			loading.value = false;
		}
	};

	const validateCaptcha = async (sliderValue: number | undefined): Promise<string | Error> => {
		if (sliderValue !== undefined && captchaData.value?.id) {
			loading.value = true;
			try {
				const captchaResponse = await auth.validateCaptcha({
					captchaKey: captchaData.value?.id,
					points: [
						{ x: captchaRange(sliderValue) },
					],
				});

				if (captchaResponse.statusCode === 200) {
					toast.add({
						title: '',
						timeout: 3000,
						color: 'primary-yellow',
					});
					return captchaData.value.id;
				}
				else {
					throw new Error('Captcha validation failed.');
				}
			}
			catch (error) {
				toast.add({
					title: useT('error'),
					timeout: 3000,
					description: useT('captchaIsNotValid'),
					color: 'red',
				});

				throw new Error(`Error ${error}`);
			}
			finally {
				loading.value = false;
			}
		}
		else {
			return new Error('Slider value is undefined or captcha data is missing.');
		}
	};

	return {
		captchaData,
		showCaptcha,
		loading,
		refreshCaptcha,
		generateCaptcha,
		validateCaptcha,
	};
};
