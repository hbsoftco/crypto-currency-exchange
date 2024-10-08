import { authRepository } from '~/repositories/auth.repository';

export const useAuth = () => {
	const { $api } = useNuxtApp();
	const auth = authRepository($api);

	const socketListenKeyLoading = ref(false);

	const loading = ref(false);
	const refreshOTC = async () => {
		if (loading.value) return;

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

	const getSocketListenKey = async () => {
		socketListenKeyLoading.value = true;
		try {
			const response = await auth.getSocketListenKey();

			const authStore = useAuthStore();
			if (response.result) {
				authStore.saveSocketListenKey(response.result);
			}

			return response;
		}
		catch (error) {
			return error;
		}
		finally {
			socketListenKeyLoading.value = false;
		}
	};

	return {
		getSocketListenKey,
		refreshOTC,
	};
};
