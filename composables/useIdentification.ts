import { securityRepository } from '~/repositories/security.repository';
import type { Identification, IdentificationDto, IdentificationResendDto } from '~/types/definitions/security.types';
import { SendType } from '~/utils/enums/user.enum';

export const useIdentification = () => {
	const { $api } = useNuxtApp();
	const securityRepo = securityRepository($api);
	const toast = useToast();

	const codeLoading = ref<boolean>();
	const getCode = async (sendType: number) => {
		codeLoading.value = true;
		try {
			const dto = ref<IdentificationDto>({ sendType: String(sendType) });
			const { result } = await securityRepo.identificationSend(dto.value);
			codeLoading.value = false;

			return (result as Identification).verificationId;
		}
		catch (error: any) {
			toast.add({
				title: 'code',
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
		}
		finally {
			codeLoading.value = false;
		}
	};

	const resendCodeLoading = ref<boolean>();
	const getResendCode = async (resendType: number, lastVerificationId: number) => {
		resendCodeLoading.value = true;
		try {
			const dto = ref<IdentificationResendDto>({ resendType: String(resendType), lastVerificationId });
			const { result } = await securityRepo.identificationResend(dto.value);
			resendCodeLoading.value = false;

			return (result as Identification).verificationId;
		}
		catch (error: any) {
			toast.add({
				title: 'code',
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
		}
		finally {
			resendCodeLoading.value = false;
		}
	};

	const newCodeLoading = ref<boolean>();
	const getNewCode = async (sendType: number, emailOrMobile: string) => {
		newCodeLoading.value = true;
		try {
			const dto = ref<IdentificationDto>({ sendType: String(sendType), emailOrMobile });

			if (sendType === SendType.SMS) {
				dto.value.emailOrMobile = normalizeMobile(String(dto.value.emailOrMobile));
			}

			const { result } = await securityRepo.identificationSendNew(dto.value);
			newCodeLoading.value = false;

			return (result as Identification).verificationId;
		}
		catch (error: any) {
			toast.add({
				title: 'code',
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
		}
		finally {
			newCodeLoading.value = false;
		}
	};

	return {
		codeLoading,
		getCode,

		resendCodeLoading,
		getResendCode,

		newCodeLoading,
		getNewCode,
	};
};
