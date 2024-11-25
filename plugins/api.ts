import type { CustomFetchContext } from '~/types/custom-fetch-options.types';
import { StatusCodes } from '~/utils/constants/status-codes';

export default defineNuxtPlugin(() => {
	const authStore = useAuthStore();
	const baseURL = useEnv('apiBaseUrl');

	let refreshing = false;
	let waitingRequests: (() => void)[] = [];

	const api = $fetch.create({
		baseURL,
		retry: 1,
		cache: 'no-store',
		retryStatusCodes: [StatusCodes.OTC_EXPIRED.fa],
		async onRequest({ options }: CustomFetchContext<unknown>) {
			try {
				if (options.noAuth !== false) return;

				await authStore.startRefreshInterval();
				console.log('options.headers =====>', options.noAuth);
				console.log('options.headers =====>', options);

				options.headers = { ...options.headers };
				const tokenHeaders = await authStore.generateToken();
				if (tokenHeaders) {
					options.headers = {
						...options.headers,
						...tokenHeaders,
					};
				}
			}
			catch (error) {
				console.log(error);
			}
		},
		async onResponse({ response }) {
			if (response && response?._data && response?._data?.statusCode === StatusCodes.OTC_EXPIRED.fa) {
				if (!refreshing) {
					refreshing = true;

					try {
						await authStore.refreshOtc();
						waitingRequests.forEach((resolve) => resolve());
						waitingRequests = [];
					}
					catch (error) {
						console.error('Error refreshing OTC:', error);
					}
					finally {
						refreshing = false;
					}
				}
				else {
					await new Promise<void>((resolve) => waitingRequests.push(resolve));
				}
			}
			else if (response && response?._data && response?._data?.statusCode === StatusCodes.USER_LOGGED_OUT.fa) {
				await authStore.clearAuthCredentials();
			}
		},
	});

	return { provide: { api } };
});
