import { marketRepository } from '~/repositories/market.repository';
import type { ErrorResponse } from '~/types/response/error.type';
import type { GetMarketStatusParams } from '~/types/base.types';

export const useMarketStatus = () => {
	const { $api } = useNuxtApp();
	const market = marketRepository($api);

	const loading = ref(false);

	const getMostProfitableMarkets = async (params: GetMarketStatusParams) => {
		loading.value = true;
		try {
			const response = await market.getMostProfitableMarkets(params);
			return response;
		}
		catch (error: unknown) {
			const err = error as ErrorResponse;
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
		getMostProfitableMarkets,
		loading,
	};
};
