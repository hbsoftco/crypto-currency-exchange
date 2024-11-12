import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetOrderListParams, SpotDataParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetOrderListResponse, GetSpotDataResponse } from '~/types/response/spot.types';
import type {
	KLineParams,
	KLineResponse,
	SpotResponse,
	TradeListParams } from '~/types/definitions/spot.types';

type SpotRepository = {
	getKLine: (params: KLineParams) => Promise<KLineResponse>;
	getTradeList: (params: TradeListParams) => Promise<SpotResponse>;

	getSpotData: (params: SpotDataParams) => Promise<GetSpotDataResponse>;
	getOrderList: (params: GetOrderListParams) => Promise<GetOrderListResponse>;
};

export const spotRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): SpotRepository => ({
	async getKLine(params: KLineParams): Promise<KLineResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/spot/routine/kline';
		const response = await fetch<KLineResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getTradeList(params: TradeListParams): Promise<SpotResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = 'v1/spot/trade/list';
		const response = await fetch<SpotResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},

	async getSpotData(params: SpotDataParams): Promise<GetSpotDataResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = '/v1/spot/routine/snapshot';
		const response = await fetch<GetSpotDataResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},

	async getOrderList(params: GetOrderListParams): Promise<GetOrderListResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = 'v1/spot/order/list';
		const response = await fetch<GetOrderListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
