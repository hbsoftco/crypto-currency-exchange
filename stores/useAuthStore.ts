import { defineStore } from 'pinia';

import { authRepository } from '~/repositories/auth.repository';

export const useAuthStore = defineStore('auth', () => {
	const setAuthCredentials = (_otc: string, _userId: number, _userSecretKey: number) => {
		localStorage.setItem('otc', _otc);
		localStorage.setItem('userId', String(_userId));
		localStorage.setItem('userSecretKey', String(_userSecretKey));
	};

	const setPassword = (_password: string) => {
		localStorage.setItem('password', md5WithUtf16LE(_password));
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

		getAuthCredentials();
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
		}
		catch (error) {
			return error;
		}
		finally {
			refreshOtcLoading.value = false;
		}
	};

	const isLoggedIn = computed(() => {
		const result = getAuthCredentials();
		if (result) return true;
		return false;
	});

	return {
		isLoggedIn,
		setPassword,
		setAuthCredentials,
		getAuthCredentials,
		generateToken,
		clearAuthCredentials,
		refreshOtcLoading,
		refreshOtc,
	};
});
