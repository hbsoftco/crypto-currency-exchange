import { tradeRepository } from '~/repositories/trade.repository';
import type { ErrorResponse } from '~/types/response/error.type';
import type { GetAssetListParams, getTradesListParams, GetUserTraderCommissionListParams } from '~/types/base.types';
import { userTraderRepository } from '~/repositories/trader.repository';
import { assetRepository } from '~/repositories/asset.repository';

export const useFastTrade = () => {
	const { $api } = useNuxtApp();
	const tradeRepo = tradeRepository($api);
	const userTraderRepo = userTraderRepository($api);
	const assetRepo = assetRepository($api);

	const loading = ref(false);

	const getTradesList = async (params: getTradesListParams) => {
		loading.value = true;
		try {
			const response = await tradeRepo.getTradesList(params);
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

	const getUserTraderCommissionList = async (params: GetUserTraderCommissionListParams) => {
		loading.value = true;
		try {
			const response = await userTraderRepo.getUserTraderCommissionList(params);
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

	const getAssetList = async (params: GetAssetListParams) => {
		loading.value = true;
		try {
			const response = await assetRepo.getAssetList(params);
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
		getAssetList,
		getTradesList,
		getUserTraderCommissionList,
		loading,
	};
};
