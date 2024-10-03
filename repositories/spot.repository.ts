import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetKlineParams, GetTradeListParams, GetOrderListParams, SpotDataParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetKlineResponse, GetOrderListResponse, GetSpotDataResponse, GetTradeListResponse } from '~/types/response/spot.types';

type SpotRepository = {
	getKline: (params: GetKlineParams) => Promise<GetKlineResponse>;
	getSpotData: (params: SpotDataParams) => Promise<GetSpotDataResponse>;
	getTradeList: (params: GetTradeListParams) => Promise<GetTradeListResponse>;
	getOrderList: (params: GetOrderListParams) => Promise<GetOrderListResponse>;
};

export const spotRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): SpotRepository => ({
	async getKline(params: GetKlineParams): Promise<GetKlineResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/spot/routine/kline';
		const response = await fetch<GetKlineResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSpotData(params: SpotDataParams): Promise<GetSpotDataResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/spot/routine/snapshot';
		const response = await fetch<GetSpotDataResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getTradeList(params: GetTradeListParams): Promise<GetTradeListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = 'v1/spot/trade/list';
		const response = await fetch<GetTradeListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getOrderList(params: GetOrderListParams): Promise<GetOrderListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = 'v1/spot/order/list';
		const response = await fetch<GetOrderListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
});
