// stores/auth.ts
import { defineStore } from 'pinia';

import { useCookie } from '#app';
import { authRepository } from '~/repositories/auth.repository';
import type { ErrorResponse } from '~/types/response/error.type';

interface AuthData {
	otc: string;
	userId: number;
	userSecretKey: number;
}

export const useAuthStore = defineStore('auth', () => {
	const otc = ref<string | null>(null);
	const userId = ref<number | null>(null);
	const userSecretKey = ref<number | null>(null);
	// const intervalId = ref<number | NodeJS.Timeout | null>(null);

	const isLoggedIn = computed(() => !!otc.value);

	const authCookie = useCookie('authData', { path: '/', maxAge: 60 * 60 * 24 * 365 });
	const passwordCookie = useCookie('password', { path: '/', maxAge: 60 * 60 * 24 * 365 });

	const savePassword = (password: string) => {
		passwordCookie.value = password;
	};

	const saveAuthData = ({ otc: newOTC, userId: newUserId, userSecretKey: newUserSecretKey }: AuthData) => {
		otc.value = newOTC;
		userId.value = newUserId;
		userSecretKey.value = newUserSecretKey;

		authCookie.value = JSON.stringify({ otc: newOTC, userId: newUserId, userSecretKey: newUserSecretKey });
	};

	const loadAuthData = () => {
		const authData: AuthData = authCookie.value as unknown as AuthData;
		if (authData) {
			otc.value = authData.otc;
			userId.value = authData.userId;
			userSecretKey.value = authData.userSecretKey;
		}
	};

	const clearAuthData = () => {
		otc.value = null;
		userId.value = null;
		userSecretKey.value = null;
		// stopOtcUpdate();
		authCookie.value = null;
		passwordCookie.value = null;
	};

	// const startOtcUpdate = () => {
	// 	if (intervalId.value) return;

	// 	intervalId.value = setInterval(async () => {
	// 		try {
	// 			await fetchNewOTC();
	// 		}
	// 		catch (error) {
	// 			console.error('Failed to update OTC:', error);
	// 		}
	// 	}, 20000);
	// };

	// const stopOtcUpdate = () => {
	// 	if (intervalId.value) {
	// 		clearInterval(intervalId.value);
	// 		intervalId.value = null;
	// 	}
	// };

	// watch(isLoggedIn, () => {
	// 	if (isLoggedIn.value === true) {
	// 		startOtcUpdate();
	// 	}
	// 	else {
	// 		stopOtcUpdate();
	// 	}
	// }, { immediate: true });

	const fetchNewOTC = async () => {
		const { $api } = useNuxtApp();
		const auth = authRepository($api);

		try {
			const response = await auth.generateNewOTC();

			const authData: AuthData = authCookie.value as unknown as AuthData;

			const { userId, userSecretKey } = authData;

			if (!authData) {
				throw createError({
					statusCode: 500,
					statusMessage: `Authentication data is missing`,
				});
			}

			saveAuthData({ otc: response.result, userId, userSecretKey: userSecretKey });
		}
		catch (error: unknown) {
			const err = error as ErrorResponse;
			throw createError({
				statusCode: 500,
				statusMessage: `${err}`,
			});
		}
	};

	const getAuthHeaders = async () => {
		try {
			const authData: AuthData = authCookie.value as unknown as AuthData;
			const password = passwordCookie.value;

			if (!authData || !password) {
				// throw createError({
				// 	statusCode: 500,
				// 	statusMessage: `Authentication data or password is missing`,
				// });

				return;
			}

			const { otc, userId, userSecretKey } = authData;
			const systemTime = Date.now().toString();
			const signature = md5WithUtf16LE(password + otc + systemTime).toUpperCase();

			return {
				'Signature': signature,
				'Request-Time': systemTime,
				'Uid': userId.toString(),
				'Usid': userSecretKey.toString(),
				'Platform': 'User',
			};
		}
		catch (error: unknown) {
			const err = error as ErrorResponse;
			throw createError({
				statusCode: 500,
				statusMessage: `${err}`,
			});
		}
	};

	return {
		otc,
		userId,
		userSecretKey,
		isLoggedIn,
		saveAuthData,
		loadAuthData,
		clearAuthData,
		savePassword,
		getAuthHeaders,
		fetchNewOTC,
	};
});
