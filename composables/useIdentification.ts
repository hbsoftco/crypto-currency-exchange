import { userRepository } from '~/repositories/user.repository';
import type { IdentificationSendDto } from '~/types/dto/user.dto';

export const useIdentification = () => {
	const { $api } = useNuxtApp();
	const userRepo = userRepository($api);

	const identificationCodeLoading = ref(false);
	const getIdentificationCode = async (sendType: string) => {
		identificationCodeLoading.value = true;
		try {
			const dto = ref<IdentificationSendDto>({ sendType });
			const { result } = await userRepo.getIdentificationCode(dto.value);
			identificationCodeLoading.value = false;
			return result.verificationId;
		}
		catch (error) {
			console.log(error);
		}
		finally {
			identificationCodeLoading.value = false;
		}
	};

	return {
		identificationCodeLoading,
		getIdentificationCode,
	};
};
