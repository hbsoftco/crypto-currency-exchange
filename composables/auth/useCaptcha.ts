import { authRepository } from '~/repositories/auth.repository';
import type { CaptchaResponse } from '~/types/captcha-response.types';
import { useNuxtApp } from '#app';

type GenerateCaptchaInput = {
	username: string;
	action: 'login' | 'signup';
};

export const useCaptcha = () => {
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
		}
		catch (error) {
			return error;
		}
		finally {
			loading.value = false;
		}
	};

	const getCaptchaValue = async (sliderValue: number | undefined) => {
		if (sliderValue !== undefined && captchaData.value?.id) {
			loading.value = true;
			try {
				const captchaResponse = await auth.validateCaptcha({
					captchaKey: captchaData.value?.id,
					points: [
						{ x: sliderValue },
					],
				});

				console.log(captchaResponse);

				// if (captchaResponse.stateId !== 11) {
				// 	captchaData.value = captchaResponse;
				// 	showCaptcha.value = true;
				// }
			}
			catch (error) {
				return error;
			}
			finally {
				loading.value = false;
			}
		}
		else {
			// console.error('Slider value is undefined');
		}
	};

	return {
		captchaData,
		showCaptcha,
		loading,
		refreshCaptcha,
		generateCaptcha,
		getCaptchaValue,
	};
};
