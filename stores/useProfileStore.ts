import { profileRepository } from '~/repositories/profile.repository';
import type { ProfilePair } from '~/types/response/profile.types';

export const useProfileStore = defineStore('profile', () => {
	const profile = ref<ProfilePair[] | null>(null);
	const isProfileDataFetched = ref(false);
	const loading = ref(false);
	const error = ref<string | null>(null);

	const { $api } = useNuxtApp();
	const profileRepo = profileRepository($api);

	const fetchProfile = async () => {
		if (isProfileDataFetched.value || loading.value) return;

		loading.value = true;
		error.value = null;

		try {
			const response = await profileRepo.getCurrentUser();
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
		profile.value = null;
		isProfileDataFetched.value = false;
	};

	const userProfile = computed(async () => {
		if (!profile.value) {
			await fetchProfile();
		}
		return profile.value;
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
