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

	const api = $fetch.create({
		baseURL,
		async onRequest({ options }: CustomFetchContext<unknown>) {
			if (options.noAuth !== false) return;
			apiName.value = options.apiName;
			options.headers = { ...options.headers, ...(await authStore.getAuthHeaders()) };
		},
		async onResponseError({ response, options }: CustomFetchContext<unknown> & { response: FetchResponse<any>; options: CustomNitroFetchOptions }): Promise<void> {
			const { doRequest } = useAPIClient();
			if (response && response?._data && response?._data?.statusCode === StatusCodes.OTC_EXPIRED.fa) {
				const { refreshOTC } = useAuth();
				await refreshOTC();
				await doRequest('GET', `${baseURL}${options.apiName}`, options);
			}
			throw response;
		},
	});

	return { provide: { api } };
});

const useAPIClient = () => {
	// const { refreshSession, invalidateSession } = useAuthProxyClient();

	const doRequest = async (method: string, endpoint: string, config: any) => {
		try {
			return await $fetch(endpoint, { method, ...config });
		}
		catch (error: any) {
			console.log(error);
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
