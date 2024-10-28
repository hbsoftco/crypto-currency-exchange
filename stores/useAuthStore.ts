import { defineStore } from 'pinia';

import { authRepository } from '~/repositories/auth.repository';
import { userRepository } from '~/repositories/user.repository';
import type { KeyValue } from '~/types/base.types';
import { CACHE_KEY_CURRENT_USER } from '~/utils/constants/common';
import { removeFromCache } from '~/utils/indexeddb';

export const useAuthStore = defineStore('auth', () => {
	const router = useRouter();

	const authStatus = ref(!!(localStorage.getItem('otc')
		&& localStorage.getItem('userId')
		&& localStorage.getItem('userSecretKey')));

	const setAuthCredentials = (_otc: string, _userId: number, _userSecretKey: number) => {
		localStorage.setItem('otc', _otc);
		localStorage.setItem('userId', String(_userId));
		localStorage.setItem('userSecretKey', String(_userSecretKey));

		authStatus.value = true;
	};

	const setPassword = (_password: string) => {
		localStorage.setItem('password', md5WithUtf16LE(_password));

		authStatus.value = true;
	};

	const getAuthCredentials = () => {
		const otc = localStorage.getItem('otc')
			? localStorage.getItem('otc')
			: null;
		const userId = localStorage.getItem('userId')
			? Number(localStorage.getItem('userId'))
			: null;
		const userSecretKey = localStorage.getItem('userSecretKey')
			? Number(localStorage.getItem('userSecretKey'))
			: null;
		const password = localStorage.getItem('password')
			? localStorage.getItem('password')
			: null;

		if (otc && userId && userSecretKey && password) {
			return { otc, userId, userSecretKey, password };
		}

		return null;
	};

	const clearAuthCredentials = () => {
		localStorage.removeItem('otc');
		localStorage.removeItem('userId');
		localStorage.removeItem('userSecretKey');
		localStorage.removeItem('password');

		removeFromCache(CACHE_KEY_CURRENT_USER);

		currentUser.value = [];

		router.push('/');

		authStatus.value = false;
	};

	const generateToken = (): Record<string, string> | null => {
		try {
			const result = getAuthCredentials();
			if (result) {
				const { otc, password, userId, userSecretKey } = result;
				const systemTime = Date.now().toString();
				const signature = md5WithUtf16LE(password + otc + systemTime).toUpperCase();

				return {
					'Signature': signature,
					'Request-Time': systemTime,
					'Uid': String(userId),
					'Usid': String(userSecretKey),
					'Platform': 'User',
				};
			}
			return null;
		}
		catch (error) {
			console.log('Generate token failed!', error);
			return null;
		}
	};

	const refreshOtcLoading = ref<boolean>(false);
	const refreshOtc = async () => {
		if (refreshOtcLoading.value) return;

		refreshOtcLoading.value = true;
		try {
			const { $api } = useNuxtApp();
			const authRepo = authRepository($api);

			const { result: otc } = await authRepo.refreshOtc();
			localStorage.setItem('otc', otc);

			authStatus.value = true;
		}
		catch (error) {
			return error;
		}
		finally {
			refreshOtcLoading.value = false;
		}
	};

	const currentUser = ref<KeyValue[]>([]);
	const currentUserFetched = ref(false);
	const currentUserLoading = ref<boolean>(false);
	const fetchCurrentUser = async (force: boolean = false) => {
		if (currentUserLoading.value && currentUserFetched.value && !force) return;

		currentUserLoading.value = true;

		try {
			if (!force) {
				const cachedData: KeyValue[] = await loadFromCache(CACHE_KEY_CURRENT_USER) || [];
				if (cachedData.length) {
					currentUser.value = cachedData;
					currentUserFetched.value = true;
					return;
				}
			}

			const { $api } = useNuxtApp();
			const userRepo = userRepository($api);

			const response = await userRepo.getCurrentUser();
			currentUser.value = response.result;
			currentUserFetched.value = true;

			await saveToCache(CACHE_KEY_CURRENT_USER, response.result);
		}
		catch (err) {
			console.error('Error fetching profile:', err);
		}
		finally {
			currentUserLoading.value = false;
		}
	};

	const getCurrentUser = computed(() => currentUser.value);

	const isLoggedIn = computed(() => authStatus.value);

	return {
		isLoggedIn,
		setPassword,
		setAuthCredentials,
		getAuthCredentials,
		generateToken,
		clearAuthCredentials,
		refreshOtcLoading,
		refreshOtc,
		//
		fetchCurrentUser,
		currentUserLoading,
		getCurrentUser,
		currentUser,
	};
});
