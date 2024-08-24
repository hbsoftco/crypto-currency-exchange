export default defineNuxtPlugin({
	setup() {
		const config = useRuntimeConfig();
		const baseURL: string = config.public.apiBaseUrl as string;

		const api = $fetch.create({
			baseURL,
		});

		return {
			provide: {
				api,
			},
		};
	},
});
