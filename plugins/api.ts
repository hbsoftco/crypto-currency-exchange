import type { CustomFetchContext } from '~/types/custom-fetch-options.types';

export default defineNuxtPlugin({
	setup() {
		const authStore = useAuthStore();
		const baseURL: string = useEnv('apiBaseUrl');

		const api = $fetch.create({
			baseURL,
			async onRequest({ options }: CustomFetchContext<unknown>) {
				if (options.noAuth) {
					return;
				}

				try {
					const headers = await authStore.getAuthHeaders();
					if (headers) {
						options.headers = {
							...options.headers,
							...headers,
						};
					}
				}
				catch (error) {
					throw createError({
						statusCode: 500,
						statusMessage: `${error}`,
					});
				}
			},
		});

		return {
			provide: {
				api,
			},
		};
	},
});
