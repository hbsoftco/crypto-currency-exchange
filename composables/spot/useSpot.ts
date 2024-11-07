import type { ErrorResponse } from '~/types/response/error.type';
import { spotRepository } from '~/repositories/spot.repository';
import type { GetTradeListParams, GetOrderListParams, SpotDataParams } from '~/types/base.types';

export const useSpot = () => {
	const { $api } = useNuxtApp();
	const spotRepo = spotRepository($api);

	const loading = ref(false);
	const getSpotData = async (params: SpotDataParams) => {
		loading.value = true;
		try {
			const response = await spotRepo.getSpotData(params);
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

	const getTradeList = async (params: GetTradeListParams) => {
		loading.value = true;
		try {
			const response = await spotRepo.getTradeList(params);
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

	const getOrderList = async (params: GetOrderListParams) => {
		loading.value = true;
		try {
			const response = await spotRepo.getOrderList(params);
			return response;
		}
		catch (error) {
			console.log(error);
		}
		finally {
			loading.value = false;
		}
	};

	return {
		getSpotData,
		getTradeList,
		loading,
		getOrderList,
	};
};
