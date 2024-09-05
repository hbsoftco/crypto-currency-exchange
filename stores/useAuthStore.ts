import { defineStore } from 'pinia';

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

		authCookie.value = null;
		passwordCookie.value = null;
	};

	const saveNewOTC = (newOTC: string) => {
		const authData: AuthData = authCookie.value as unknown as AuthData;
		const { userId, userSecretKey } = authData;

		authCookie.value = JSON.stringify({ otc: newOTC, userId, userSecretKey });
	};

	const getAuthHeaders = async () => {
		try {
			const authData: AuthData = authCookie.value as unknown as AuthData;
			const password = passwordCookie.value;

			if (!authData || !password) {
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
		saveNewOTC,
	};
});
