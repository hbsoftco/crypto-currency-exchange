import { profileRepository } from '~/repositories/profile.repository';

export const useProfile = () => {
	const { $api } = useNuxtApp();
	const profile = profileRepository($api);

	const loading = ref(false);

	const getCurrentUser = async () => {
		loading.value = true;
		try {
			const profileResponse = await profile.getCurrentUser();

			return profileResponse;
		}
		catch (error: unknown) {
			throw createError({
				statusCode: 500,
				statusMessage: `${error}`,
			});
		}
		finally {
			loading.value = false;
		}
	};

	return {
		getCurrentUser,
	};
};
