import type { ErrorResponse } from '~/types/response/error.type';
import { spotRepository } from '~/repositories/spot.repository';
import type { getKlineParams } from '~/types/base.types';

export const useSpot = () => {
	const { $api } = useNuxtApp();
	const spotRepo = spotRepository($api);

	const loading = ref(false);

	const getChartKline = async (params: getKlineParams) => {
		loading.value = true;
		try {
			const response = await spotRepo.getKline(params);
			return response;
		}
		catch (error: unknown) {
			const err = error as ErrorResponse;
			throw createError({
				statusCode: 500,
				statusMessage: `${err.response?._data?.message || 'Unknown error'}`,
			});
		}
		finally {
			loading.value = false;
		}
	};

	return {
		getChartKline,
		loading,
	};
};
