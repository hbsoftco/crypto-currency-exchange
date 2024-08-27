export default defineNuxtPlugin({
	setup() {
		const baseURL: string = useEnv('apiBaseUrl');

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
