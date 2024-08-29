import { authRepository } from '~/repositories/auth.repository';
import type { SignupByMobileDto } from '~/types/dto/signup.dto';

export const useAuth = () => {
	// const toast = useToast();

	const { $api } = useNuxtApp();
	const auth = authRepository($api);

	const loading = ref(false);

	const signupByMobile = async (input: SignupByMobileDto) => {
		loading.value = true;
		try {
			const signupResponse = await auth.signupByMobile({
				captchaKey: input.captchaKey,
				refereeCode: input.refereeCode,
				password: btoa(input.password),
				mobile: input.mobile,
			});

			return signupResponse;
		}
		catch (error) {
			return error;
		}
		finally {
			loading.value = false;
		}
	};

	return {
		signupByMobile,
	};
};
