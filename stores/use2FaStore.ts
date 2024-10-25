import { userRepository } from '~/repositories/user.repository';
import type { HelpStepItem } from '~/types/2fa.types';
import type { TwoStepLogin } from '~/types/response/user.types';

export const use2FaStore = defineStore('2FA', () => {
	const { $api } = useNuxtApp();
	const userRepo = userRepository($api);

	const steps = ref<HelpStepItem[]>([
		{ title: useT('stepOne'), description: useT('stepOneText'), isActive: false, done: false },
		{ title: useT('stepTwo'), description: useT('stepTwoText'), isActive: false, done: false },
		{ title: useT('stepThree'), description: useT('stepThreeText'), isActive: false, done: false },
		{ title: useT('stepFour'), description: useT('stepFourText'), isActive: false, done: false },
	]);

	const generate2FaData = ref<TwoStepLogin>();
	const generate2FaLoading = ref(false);
	const getGenerate2FaData = async () => {
		if (generate2FaLoading.value) return;

		generate2FaLoading.value = true;

		try {
			const { result } = await userRepo.generate2Fa();
			generate2FaData.value = result;
		}
		catch (error) {
			throw Error(String(error));
		}
		finally {
			generate2FaLoading.value = false;
		}
	};

	const updateStepStatus = (currentStep: number) => {
		if (currentStep < 1 || currentStep > steps.value.length) return;

		steps.value.forEach((step, index) => {
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

	return {
		getGenerate2FaData,
		updateStepStatus,
		generate2FaData,
		generate2FaLoading,
		steps,
	};
});
