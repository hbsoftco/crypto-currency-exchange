import { defineStore } from 'pinia';

import { authRepository } from '~/repositories/auth.repository';
import { userRepository } from '~/repositories/user.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { UserLevel } from '~/types/definitions/user.types';
import { CACHE_KEY_COMMISSION_LIST, CACHE_KEY_CURRENT_USER, CACHE_KEY_USER_LEVELS } from '~/utils/constants/common';
import { removeFromCache } from '~/utils/indexeddb';

export const useAuthStore = defineStore('auth', () => {
	const router = useRouter();

	const authStatus = ref<boolean>((!!(localStorage.getItem('otc')
		&& localStorage.getItem('userId')
		&& localStorage.getItem('password')
		&& localStorage.getItem('userSecretKey')) || false));

	const setAuthCredentials = (_otc: string, _userId: number, _userSecretKey: number) => {
		localStorage.setItem('otc', _otc);
		localStorage.setItem('userId', String(_userId));
		localStorage.setItem('userSecretKey', String(_userSecretKey));

		authStatus.value = true;
	};

	const setPassword = (_password: string, withMD5 = true) => {
		if (withMD5) {
			localStorage.setItem('password', md5WithUtf16LE(_password));
		}
		else {
			localStorage.setItem('password', _password);
		}
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

		stopRefreshInterval();

		removeFromCache(CACHE_KEY_CURRENT_USER);
		removeFromCache(CACHE_KEY_COMMISSION_LIST);

		currentUser.value = [];

		router.push('/');

		authStatus.value = false;
	};

	const generateToken = (): Record<string, string> | null => {
		try {
			const result = getAuthCredentials();
			if (result) {
				const { otc, password, userId, userSecretKey } = result;
				if (otc && password && userId && userSecretKey) {
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
			if (otc) {
				localStorage.setItem('otc', otc);
			}

			authStatus.value = true;
		}
		catch (error) {
			return error;
		}
		finally {
			refreshOtcLoading.value = false;
		}
	};

	const levelsListLoading = ref<boolean>(false);
	const levelsList = ref<UserLevel[]>();
	const levelsListFetched = ref(false);
	const getLevelsList = async () => {
		try {
			if (levelsListLoading.value && levelsListFetched.value) return;

			const cachedData: UserLevel[] = await loadFromCache(CACHE_KEY_USER_LEVELS) || [];

			if (cachedData.length) {
				levelsList.value = cachedData;
				levelsListFetched.value = true;
				return;
			}

			const { $api } = useNuxtApp();
			const userRepo = userRepository($api);

			const response = await userRepo.getLevelsList();
			levelsList.value = response.result.rows as UserLevel[];
			levelsListFetched.value = true;

			await saveToCache(CACHE_KEY_USER_LEVELS, response.result.rows);
		}
		catch (error) {
			console.log(error);
		}
		finally {
			levelsListLoading.value = false;
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

					await getLevelsList();

					return;
				}
			}

			const { $api } = useNuxtApp();
			const userRepo = userRepository($api);

			const response = await userRepo.getCurrentUser();
			currentUser.value = response.result;
			currentUserFetched.value = true;

			await saveToCache(CACHE_KEY_CURRENT_USER, response.result);

			await getLevelsList();
		}
		catch (err) {
			console.error('Error fetching profile:', err);
		}
		finally {
			currentUserLoading.value = false;
		}
	};

	const getCurrentUser = computed(() => currentUser.value);
	const getUserLevelIndicator = computed(() => getValueByKey(currentUser.value, 'TRD_LVL_ID'));
	const login2faStatus = computed(() => getValueByKey(currentUser.value, '2FA_ENABLED') === '1' ? true : false);
	const withdrawPinCodeStatus = computed(() => getValueByKey(currentUser.value, 'WTH_PINCODE_ENABLED') === '1' ? true : false);
	const antiPhishingStatus = computed(() => getValueByKey(currentUser.value, 'ANTIPHISHING_ENABLED') === '1' ? true : false);

	const isLoggedIn = computed(() => authStatus.value);

	const userLevel = computed(() => levelsList.value?.find((level) => level.indicator === Number(getUserLevelIndicator.value)));

	let refreshInterval: NodeJS.Timeout | undefined | null;
	const firstCallRefreshToken = ref<boolean>(true);

	const startRefreshInterval = () => {
		if (isLoggedIn) {
			if (firstCallRefreshToken.value) {
				refreshOtc();
				firstCallRefreshToken.value = false;
			}

			if (!refreshInterval) {
				refreshInterval = setInterval(() => {
					refreshOtc();
				}, 20000);
			}
		}
		else {
			stopRefreshInterval();
		}
	};

	const stopRefreshInterval = () => {
		if (refreshInterval) {
			clearInterval(refreshInterval);
			refreshInterval = null;
		}
	};

	watch(isLoggedIn, (newVal) => {
		if (newVal) {
			startRefreshInterval();
		}
		else {
			stopRefreshInterval();
		}
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
		startRefreshInterval,
		//
		fetchCurrentUser,
		currentUserLoading,
		getCurrentUser,
		getUserLevelIndicator,
		currentUser,
		userLevel,
		login2faStatus,
		withdrawPinCodeStatus,
		antiPhishingStatus,
	};
});
