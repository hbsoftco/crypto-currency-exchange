import { userRepository } from '~/repositories/user.repository';
import type { IdentificationResendDto, IdentificationSendDto, IdentificationSendNewDto } from '~/types/dto/user.dto';

export const useIdentification = () => {
	const { $api } = useNuxtApp();
	const userRepo = userRepository($api);

	const toast = useToast();

	const identificationCodeLoading = ref<boolean>(false);
	const identificationId = ref<number>();
	const getIdentificationCode = async (sendType: string) => {
		identificationCodeLoading.value = true;
		try {
			const dto = ref<IdentificationSendDto>({ sendType });
			const { result } = await userRepo.getIdentificationCode(dto.value);
			identificationCodeLoading.value = false;
			identificationId.value = result.verificationId;

			return result.verificationId;
		}
		catch (error: any) {
			toast.add({
				title: useT('active2Fa'),
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
		}
		finally {
			identificationCodeLoading.value = false;
		}
	};

	const resendIdentificationCodeLoading = ref<boolean>(false);
	const resendIdentificationId = ref<number>();
	const getResendIdentificationCode = async (resendType: string, lastVerificationId: number) => {
		identificationCodeLoading.value = true;
		try {
			const dto = ref<IdentificationResendDto>({
				resendType,
				lastVerificationId,
			});
			const { result } = await userRepo.identificationResend(dto.value);
			resendIdentificationCodeLoading.value = false;
			resendIdentificationId.value = result.verificationId;

			return result.verificationId;
		}
		catch (error: any) {
			toast.add({
				title: useT('active2Fa'),
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
		}
		finally {
			resendIdentificationCodeLoading.value = false;
		}
	};

	const sendNewIdentificationCodeLoading = ref<boolean>(false);
	const sendNewIdentificationId = ref<number>();
	const getSendNewIdentificationCode = async (sendType: string, emailOrMobile: string) => {
		sendNewIdentificationCodeLoading.value = true;
		try {
			const dto = ref<IdentificationSendNewDto>({
				sendType,
				emailOrMobile,
			});
			const { result } = await userRepo.identificationSendNew(dto.value);
			sendNewIdentificationCodeLoading.value = false;
			sendNewIdentificationId.value = result.verificationId;

			return result.verificationId;
		}
		catch (error: any) {
			toast.add({
				title: useT('active2Fa'),
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
		}
		finally {
			sendNewIdentificationCodeLoading.value = false;
		}
	};

	return {
		identificationCodeLoading,
		getIdentificationCode,
		identificationId,

		resendIdentificationCodeLoading,
		getResendIdentificationCode,
		resendIdentificationId,

		sendNewIdentificationCodeLoading,
		getSendNewIdentificationCode,
		sendNewIdentificationId,
	};
};
