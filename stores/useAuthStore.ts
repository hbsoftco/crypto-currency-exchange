import { defineStore } from 'pinia';

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

	const isLoggedIn = computed(() => !!otc.value);

	const listenKeyCookie = useCookie('listenKey', { path: '/', maxAge: 60 * 60 * 24 * 365 });

	const otcCookie = useCookie('otc', { path: '/', maxAge: 60 * 60 * 24 * 365 });
	const userIdCookie = useCookie('userId', { path: '/', maxAge: 60 * 60 * 24 * 365 });
	const userSecretKeyCookie = useCookie('userSecretKey', { path: '/', maxAge: 60 * 60 * 24 * 365 });
	const passwordCookie = useCookie('password', { path: '/', maxAge: 60 * 60 * 24 * 365 });

	const savePassword = (password: string) => {
		passwordCookie.value = password;
	};

	const saveAuthData = ({ otc: newOTC, userId: newUserId, userSecretKey: newUserSecretKey }: AuthData) => {
		otc.value = newOTC;
		userId.value = newUserId;
		userSecretKey.value = newUserSecretKey;

		otcCookie.value = newOTC;
		userIdCookie.value = newUserId.toString();
		userSecretKeyCookie.value = newUserSecretKey.toString();
	};

	const loadAuthData = () => {
		otc.value = otcCookie.value || null;
		userId.value = userIdCookie.value ? parseInt(userIdCookie.value) : null;
		userSecretKey.value = userSecretKeyCookie.value ? parseInt(userSecretKeyCookie.value) : null;
	};

	const clearAuthData = () => {
		otc.value = null;
		userId.value = null;
		userSecretKey.value = null;

		otcCookie.value = null;
		userIdCookie.value = null;
		userSecretKeyCookie.value = null;
		passwordCookie.value = null;
	};

	const saveNewOTC = (newOTC: string) => {
		if (newOTC) {
			otc.value = newOTC;
			otcCookie.value = newOTC;
		}
	};

	const getAuthHeaders = async () => {
		try {
			const password = passwordCookie.value;

			if (!otc.value || !userId.value || !userSecretKey.value || !password) {
				console.error('اطلاعات احراز هویت ناقص است:', { otc: otc.value, userId: userId.value, userSecretKey: userSecretKey.value }, password);
				throw createError({
					statusCode: 500,
					statusMessage: `Missed data`,
				});
			}

			const systemTime = Date.now().toString();
			const signature = md5WithUtf16LE(password + otc.value + systemTime).toUpperCase();

			return {
				'Signature': signature,
				'Request-Time': systemTime,
				'Uid': userId.value.toString(),
				'Usid': userSecretKey.value.toString(),
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

	// Socket
	const listenKey = ref<string | null>(null);
	const isSocketListenKeyLoading = ref(false);

	const getSocketListenKey = async () => {
		const { $api } = useNuxtApp();
		const authRepo = authRepository($api);
		isSocketListenKeyLoading.value = true;

		try {
			const response = await authRepo.getSocketListenKey();
			if (response.result) {
				saveSocketListenKey(response.result);
				isSocketListenKeyLoading.value = true;
			}
		}
		catch (error) {
			throw Error(String(error));
		}
		finally {
			isSocketListenKeyLoading.value = false;
		}
	};

	const saveSocketListenKey = (newListenKey: string) => {
		if (newListenKey) {
			listenKey.value = newListenKey;
			listenKeyCookie.value = newListenKey;
		}
	};

	const socketListenKey = computed(() => listenKeyCookie.value);

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
		// Socket
		getSocketListenKey,
		saveSocketListenKey,
		socketListenKey,
	};
});
