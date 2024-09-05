import { profileRepository } from '~/repositories/profile.repository';
import type { ErrorResponse } from '~/types/response/error.type';
import { StatusCodes } from '~/utils/constants/status-codes';

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
			const err = error as ErrorResponse;

			if (err && err.response._data.statusCode === StatusCodes.OTC_EXPIRED.fa) {
				const authStore = useAuthStore();

				await authStore.fetchNewOTC();

				await getCurrentUser();
			}

			throw createError({
				statusCode: 500,
				statusMessage: `${err.response._data.message}`,
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
