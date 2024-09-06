import { useAuth } from '~/composables/auth/useAuth';
import type { CustomFetchContext } from '~/types/custom-fetch-options.types';
// import type { ErrorResponse } from '~/types/response/error.type';
import { StatusCodes } from '~/utils/constants/status-codes';

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

			// async onResponseError({ response, options }: CustomFetchContext<unknown> & { response: Response }): Promise<unknown> {
			async onResponseError({ response, options }): Promise<void> {
				// const res = response as ErrorResponse;
				if (response._data.statusCode === StatusCodes.OTC_EXPIRED.fa) {
					try {
						console.log('yaaaaaa hosssein');

						const { refreshOTC } = useAuth();
						await refreshOTC();

						options.headers = {
							...(await authStore.getAuthHeaders()),
							...options.headers,
						};

						return await api(options as any);
					}
					catch (error) {
						console.log(error);

						throw createError({
							statusCode: 500,
							statusMessage: 'خطا در به‌روزرسانی OTC',
						});
					}
				}
				throw response;
			},
		});

		return {
			provide: {
				api,
			},
		};
	},
});
