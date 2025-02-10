import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type {
	ConvertMiniAssetDto,
	DeleteOpenOrderDto,
	KLineParams,
	KLineResponse,
	OrderListParams,
	SnapshotParams,
	SnapshotResponse,
	SpotResponse,
	StoreCoinToCoinDto,
	StoreOrderInstantDto,
	StoreOrderLimitDto,
	StoreOrderMarketDto,
	StoreOrderStopInstantDto,
	StoreOrderStopLimitDto,
	StoreOrderStopMarketDto,
	TradeListParams } from '~/types/definitions/spot.types';
import type { CommonResponse } from '~/types/definitions/common.types';

type SpotRepository = {
	getKLine: (params: KLineParams) => Promise<KLineResponse>;
	getTradeList: (params: TradeListParams) => Promise<SpotResponse>;
	getOrderList: (params: OrderListParams) => Promise<SpotResponse>;
	storeOrderMarket: (dto: StoreOrderMarketDto) => Promise<CommonResponse>;
	storeOrderInstant: (dto: StoreOrderInstantDto) => Promise<CommonResponse>;
	storeOrderLimit: (dto: StoreOrderLimitDto) => Promise<CommonResponse>;
	storeOrderStopLimit: (dto: StoreOrderStopLimitDto) => Promise<CommonResponse>;
	storeCoinToCoin: (dto: StoreCoinToCoinDto) => Promise<CommonResponse>;
	deleteOpenOrder: (dto: DeleteOpenOrderDto) => Promise<CommonResponse>;
	getSnapshot: (params: SnapshotParams) => Promise<SnapshotResponse>;
	storeOrderStopMarket: (dto: StoreOrderStopMarketDto) => Promise<CommonResponse>;
	storeOrderStopInstant: (dto: StoreOrderStopInstantDto) => Promise<CommonResponse>;
	convertMiniAsset: (dto: ConvertMiniAssetDto) => Promise<CommonResponse>;
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
	async storeOrderLimit(dto: StoreOrderLimitDto): Promise<CommonResponse> {
		const url = `/v1/spot/order/limit`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeOrderStopLimit(dto: StoreOrderStopLimitDto): Promise<CommonResponse> {
		const url = `/v1/spot/order/stop_limit`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeCoinToCoin(dto: StoreCoinToCoinDto): Promise<CommonResponse> {
		const url = `/v1/spot/order/coin2coin`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async deleteOpenOrder(dto: DeleteOpenOrderDto): Promise<CommonResponse> {
		const url = `/v1/spot/order/cancel`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSnapshot(params: SnapshotParams): Promise<SnapshotResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = '/v1/spot/routine/snapshot';
		const response = await fetch<SnapshotResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeOrderStopMarket(dto: StoreOrderStopMarketDto): Promise<CommonResponse> {
		const url = `/v1/spot/order/stop_market`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeOrderStopInstant(dto: StoreOrderStopInstantDto): Promise<CommonResponse> {
		const url = `/v1/spot/order/stop_instant`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async convertMiniAsset(dto: ConvertMiniAssetDto): Promise<CommonResponse> {
		const url = `/v1/spot/order/miniasset`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
});
