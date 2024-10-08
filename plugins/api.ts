/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FetchResponse } from 'ofetch';

import { useAuth } from '~/composables/auth/useAuth';
import type { CustomFetchContext } from '~/types/custom-fetch-options.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import { StatusCodes } from '~/utils/constants/status-codes';

export default defineNuxtPlugin(() => {
	const authStore = useAuthStore();
	const baseURL = useEnv('apiBaseUrl');
	const apiName = ref<string>('');
	const query = ref();

	const api = $fetch.create({
		baseURL,
		async onRequest({ options }: CustomFetchContext<unknown>) {
			if (options.noAuth !== false) return;
			apiName.value = options.apiName;
			query.value = options.query;

			options.headers = { ...options.headers, ...(await authStore.getAuthHeaders()) };
		},
		async onResponseError({ response, options }: CustomFetchContext<unknown> & { response: FetchResponse<any>; options: CustomNitroFetchOptions }): Promise<void> {
			const { doRequest } = useAPIClient();
			if (response && response?._data && response?._data?.statusCode === StatusCodes.OTC_EXPIRED.fa) {
				const { refreshOTC } = useAuth();
				await refreshOTC();

				const query = new URLSearchParams();
				Object.entries(options.queryParams || {}).forEach(([key, value]) => {
					if (value !== undefined && value !== null && value.toString().trim() !== '') {
						query.append(key, value);
					}
				});

				const queryString = query.toString() ? `?${query.toString()}` : '';

				await doRequest('GET', `${baseURL}${options.apiName}${queryString}`, options);
			}
			else if (response && response?._data && response?._data?.statusCode === StatusCodes.USER_LOGGED_OUT.fa) {
				const authStore = useAuthStore();
				await authStore.clearAuthData();
			}
			throw response;
		},
	});

	return { provide: { api } };
});

const useAPIClient = () => {
	// const { refreshSession, invalidateSession } = useAuthProxyClient();

	const doRequest = async (method: string, endpoint: string, config: any) => {
		// console.log('endpoint doRequest ======>', endpoint);
		try {
			return await $fetch(endpoint, { method, ...config });
		}
		catch (error: any) {
			// console.log('error.response 8888888888888888', error.response);
			// if (error.response?.status === 401) {
			// await refreshSession();
			// return await doRequest(method, endpoint, config);
			// // }
			// await invalidateSession();
			// throw error;
		}
	};

	return { doRequest };
};

// const useAuthProxyClient = () => {
// 	const refreshSession = async () => {
// 		const { refreshOTC } = useAuth();
// 		await refreshOTC();
// 	};

// 	const invalidateSession = async () => {
// 		// Logic for invalidating session
// 	};

// 	return { refreshSession, invalidateSession };
// };
