import { tradeRepository } from '~/repositories/trade.repository';
import type { ErrorResponse } from '~/types/response/error.type';
import type { getTradesListParams } from '~/types/base.types';

export const useFastTrade = () => {
	const { $api } = useNuxtApp();
	const trade = tradeRepository($api);

	const loading = ref(false);

	const getTradesList = async (params: getTradesListParams) => {
		loading.value = true;
		try {
			const response = await trade.getTradesList(params);
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
		getTradesList,
		loading,
	};
};
