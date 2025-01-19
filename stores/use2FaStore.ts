import { securityRepository } from '~/repositories/security.repository';
import type { Generate2fa, GuidanceStep } from '~/types/definitions/security.types';

export const use2FaStore = defineStore('2FA', () => {
	const { $api } = useNuxtApp();
	const securityRepo = securityRepository($api);

	const toast = useToast();
	const router = useRouter();

	const generate2Fa = ref<Generate2fa | null>(null);
	const generate2FaLoading = ref<boolean>(false);
	const getGenerate2FaData = async () => {
		if (generate2FaLoading.value) return;

		generate2FaLoading.value = true;

		try {
			const { result } = await securityRepo.generate2fa();
			generate2Fa.value = result as Generate2fa;
		}
		catch (error: any) {
			router.push('/user/security');

			toast.add({
				title: useT('active2Fa'),
				description: error.response._data.message,
				timeout: 5000,
				color: 'red',
			});
		}
		finally {
			generate2FaLoading.value = false;
		}
	};

	const guidanceSteps = ref<GuidanceStep[]>([
		{ title: useT('stepOne'), description: useT('stepOneText'), isActive: true, done: false },
		{ title: useT('stepTwo'), description: useT('stepTwoText'), isActive: false, done: false },
		{ title: useT('stepThree'), description: useT('stepThreeText'), isActive: false, done: false },
		{ title: useT('stepFour'), description: useT('stepFourText'), isActive: false, done: false },
	]);

	const updateStepStatus = (currentStep: number) => {
		if (currentStep < 1 || currentStep > guidanceSteps.value.length) return;

		guidanceSteps.value.forEach((step, index) => {
			if (index + 1 === currentStep) {
				step.isActive = true;
				step.done = false;
			}
			else if (index + 1 < currentStep) {
				step.isActive = false;
				step.done = true;
			}
			else {
				step.isActive = false;
				step.done = false;
			}
		});
	};

	const resetData = async () => {
		await updateStepStatus(1);
		generate2Fa.value = null;
	};

	return {
		getGenerate2FaData,
		updateStepStatus,
		generate2Fa,
		generate2FaLoading,
		guidanceSteps,
		resetData,
	};
});
