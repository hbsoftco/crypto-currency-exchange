// stores/auth.ts
import { defineStore } from 'pinia';

interface AuthData {
	otc: string;
	userId: number;
	userSecretKey: number;
}

export const useAuthStore = defineStore('auth', () => {
	const otc = ref<string | null>(null);
	const userId = ref<number | null>(null);
	const userSecretKey = ref<number | null>(null);

	const saveAuthData = ({ otc: newOTC, userId: newUserId, userSecretKey: newUserSecretKey }: AuthData) => {
		otc.value = newOTC;
		userId.value = newUserId;
		userSecretKey.value = newUserSecretKey;

		localStorage.setItem('authData', JSON.stringify({ otc: newOTC, userId: newUserId, userSecretKey: newUserSecretKey }));
	};

	const loadAuthData = () => {
		const authData = localStorage.getItem('authData');
		if (authData) {
			const { otc: storedOTC, userId: storedUserId, userSecretKey: storedUserSecretKey } = JSON.parse(authData);
			otc.value = storedOTC;
			userId.value = storedUserId;
			userSecretKey.value = storedUserSecretKey;
		}
	};

	const clearAuthData = () => {
		otc.value = null;
		userId.value = null;
		userSecretKey.value = null;
		localStorage.removeItem('authData');
	};

	return {
		otc,
		userId,
		userSecretKey,
		saveAuthData,
		loadAuthData,
		clearAuthData,
	};
});
