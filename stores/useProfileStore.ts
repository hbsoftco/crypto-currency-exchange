import { profileRepository } from '~/repositories/profile.repository';
import type { KeyValue } from '~/types/base.types';

export const useProfileStore = defineStore('profile', () => {
	const { $api } = useNuxtApp();
	const profileRepo = profileRepository($api);

	const profile = ref<KeyValue[]>([]);
	const isProfileDataFetched = ref(false);
	const profileLoading = ref<boolean>(false);
	const error = ref<string | null>(null);

	const authStore = useAuthStore();

	const fetchProfile = async () => {
		console.log('------------------>', isProfileDataFetched.value);

		if (profileLoading.value && isProfileDataFetched.value) return;
		console.log('------------------>', isProfileDataFetched.value);

		profileLoading.value = true;
		error.value = null;

		try {
			const response = await profileRepo.getCurrentUser();
			profile.value = response.result;
			isProfileDataFetched.value = true;
		}
		catch (err) {
			console.error('Error fetching profile:', err);
		}
		finally {
			profileLoading.value = false;
		}
	};

	const clearProfile = () => {
		profile.value = [];
		isProfileDataFetched.value = false;
	};

	const userProfile = computed(() => {
		if (authStore.isLoggedIn) {
			return profile.value;
		}
		else {
			return [];
		}
	});

	return {
		profile,
		profileLoading,
		error,
		fetchProfile,
		clearProfile,
		userProfile,
	};
});
