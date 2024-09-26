import { useProfile } from '~/composables/profile/useProfile';
import type { ProfilePair } from '~/types/response/profile.types';

export const useAssetStore = defineStore('asset', () => {
	const profile = ref<ProfilePair[]>([]);
	const isProfileDataFetched = ref(false);
	const loading = ref(false);
	const error = ref<string | null>(null);

	const authStore = useAuthStore();

	const fetchProfile = async () => {
		if (isProfileDataFetched.value || loading.value) return;

		loading.value = true;
		error.value = null;

		try {
			const { getCurrentUser } = useProfile();
			const response = await getCurrentUser();
			profile.value = response.result;
			isProfileDataFetched.value = true;
		}
		catch (err) {
			error.value = 'Failed to fetch profile data';
			console.error('Error fetching profile:', err);
		}
		finally {
			loading.value = false;
		}
	};

	const clearProfile = () => {
		profile.value = [];
		isProfileDataFetched.value = false;
	};

	const userProfile = computed(async () => {
		if (authStore.isLoggedIn) {
			if (!profile.value.length) {
				await fetchProfile();
			}
			return profile.value;
		}
		else {
			return [];
		}
	});

	return {
		profile,
		loading,
		error,
		fetchProfile,
		clearProfile,
		userProfile,
	};
});
