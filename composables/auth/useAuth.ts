import { authRepository } from '~/repositories/auth.repository';

export const useAuth = () => {
	const { $api } = useNuxtApp();
	const auth = authRepository($api);

	const loading = ref(false);

	const refreshOTC = async () => {
		loading.value = true;
		try {
			const response = await auth.generateNewOTC();

			const authStore = useAuthStore();
			if (response.result) {
				authStore.saveNewOTC(response.result);
			}

			return response;
		}
		catch (error) {
			return error;
		}
		finally {
			loading.value = false;
		}
	};

	return {
		refreshOTC,
	};
};
