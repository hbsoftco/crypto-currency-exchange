import { authRepository } from '~/repositories/auth.repository';
import type { CaptchaResponse } from '~/types/captcha-response.types';
import { useNuxtApp } from '#app';

export const useCaptcha = () => {
	const { $api } = useNuxtApp();
	const auth = authRepository($api);

	const captchaData = ref<CaptchaResponse>();
	const showCaptcha = ref(false);
	const loading = ref(false);

	const refreshCaptcha = () => {
		// generateCaptcha();
	};

	const generateCaptcha = async (username: string, action: 'login' | 'signup') => {
		loading.value = true;
		try {
			const captchaResponse = await auth.generateCaptcha({
				username,
				action,
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

	const getCaptchaValue = (sliderValue: number | undefined) => {
		if (sliderValue !== undefined) {
			// console.log('Received slider value from child:', sliderValue);
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
