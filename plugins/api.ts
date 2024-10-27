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
			try {
				if (options.noAuth !== false) return;

				const tokenHeaders = await authStore.generateToken();
				if (tokenHeaders) {
					options.headers = { ...options.headers, ...tokenHeaders };
				}
			}
			catch (error) {
				console.log(error);
			}
		},
		async onResponse({ response }) {
			if (response && response?._data && response?._data?.statusCode === StatusCodes.OTC_EXPIRED.fa) {
				await authStore.refreshOtc();
			}
			else if (response && response?._data && response?._data?.statusCode === StatusCodes.USER_LOGGED_OUT.fa) {
				const authStore = useAuthStore();
				await authStore.clearAuthCredentials();
			}
		},
	});

	return { provide: { api } };
});
