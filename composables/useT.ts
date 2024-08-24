export const useT = (key: string): string => {
	try {
		const nuxtApp = useNuxtApp();

		if (nuxtApp && nuxtApp.$i18n) {
			return nuxtApp.$i18n.t(key);
		}
		else {
			return `[translation missing: ${key}]`;
		}
	}
	catch (error) {
		return `[translation error: ${String(error)}]`;
	}
};
