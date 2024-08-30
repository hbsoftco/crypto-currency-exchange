import { authRepository } from '~/repositories/auth.repository';
import type { CheckCodeDto } from '~/types/dto/verification.dto';

export const useVerification = () => {
	// const toast = useToast();

	const { $api } = useNuxtApp();
	const auth = authRepository($api);

	const loading = ref(false);

	const checkCodeVerification = async (data: CheckCodeDto) => {
		try {
			loading.value = true;
			const verificationResponse = await auth.checkCodeVerification(data);

			return verificationResponse;
		}
		catch (error) {
			throw new Error(`Invalid response format ${error}`);
		}
		finally {
			loading.value = false;
		}
	};

	return {
		checkCodeVerification,
		loading,
	};
};
