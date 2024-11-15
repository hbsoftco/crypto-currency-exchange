import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { SpotDataParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetSpotDataResponse } from '~/types/response/spot.types';
import type {
	KLineParams,
	KLineResponse,
	OrderListParams,
	SpotResponse,
	StoreOrderInstantDto,
	StoreOrderMarketDto,
	TradeListParams } from '~/types/definitions/spot.types';
import type { CommonResponse } from '~/types/definitions/common.types';

type SpotRepository = {
	getKLine: (params: KLineParams) => Promise<KLineResponse>;
	getTradeList: (params: TradeListParams) => Promise<SpotResponse>;
	getOrderList: (params: OrderListParams) => Promise<SpotResponse>;
	storeOrderMarket: (dto: StoreOrderMarketDto) => Promise<CommonResponse>;
	storeOrderInstant: (dto: StoreOrderInstantDto) => Promise<CommonResponse>;

	getSpotData: (params: SpotDataParams) => Promise<GetSpotDataResponse>;
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
	async getOrderList(params: OrderListParams): Promise<SpotResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = 'v1/spot/order/list';
		const response = await fetch<SpotResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeOrderMarket(dto: StoreOrderMarketDto): Promise<CommonResponse> {
		const url = `/v1/spot/order/market`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeOrderInstant(dto: StoreOrderInstantDto): Promise<CommonResponse> {
		const url = `/v1/spot/order/instant`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
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

});
