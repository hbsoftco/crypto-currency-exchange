import { useAuth } from '~/composables/auth/useAuth';
import type { CustomFetchContext } from '~/types/custom-fetch-options.types';
import { StatusCodes } from '~/utils/constants/status-codes';

export default defineNuxtPlugin(() => {
	const authStore = useAuthStore();
	const baseURL = useEnv('apiBaseUrl');

	const api = $fetch.create({
		baseURL,
		retry: 1,
		retryStatusCodes: [StatusCodes.OTC_EXPIRED.fa],
		async onRequest({ options }: CustomFetchContext<unknown>) {
			if (options.noAuth !== false) return;

			options.headers = { ...options.headers, ...(await authStore.getAuthHeaders()) };
		},
		async onResponse({ response }) {
			if (response && response?._data && response?._data?.statusCode === StatusCodes.OTC_EXPIRED.fa) {
				const { refreshOTC } = useAuth();
				await refreshOTC();
			}
			else if (response && response?._data && response?._data?.statusCode === StatusCodes.USER_LOGGED_OUT.fa) {
				const authStore = useAuthStore();
				await authStore.clearAuthData();
			}
		},
	});

	return { provide: { api } };
});
