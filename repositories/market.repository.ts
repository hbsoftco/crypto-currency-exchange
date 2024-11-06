import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetMarketListByCategoryParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { FavoriteMarketDto } from '~/types/dto/market.dto';
import type { CommonResponse } from '~/types/response/common.types';
import type {
	MarketsL21Params,
	MarketsL21Response,
	MarketsParams,
	MarketsL16Response,
	MarketStateParams,
	MarketStateResponse } from '~/types/definitions/market.types';
import type {
	MarketCurrencyCategoriesResponse,
	MarketListByCategoryResponse,
	MarketListResponse,
	MarketsResponse,
	MarketStatisticsChartsResponse } from '~/types/response/market.types';

type MarketRepository = {
	getMarketListL21: (params: MarketsL21Params) => Promise<MarketsL21Response>;
	getMarketListL16: (params: MarketsParams) => Promise<MarketsL16Response>;
	getMostProfitableMarkets: (params: MarketStateParams) => Promise<MarketStateResponse>;
	getHottestMarkets: (params: MarketStateParams) => Promise<MarketStateResponse>;
	getLatestMarkets: (params: MarketStateParams) => Promise<MarketStateResponse>;
	getMostVoluminous: (params: MarketStateParams) => Promise<MarketStateResponse>;

	getMarkets: (params: MarketsParams) => Promise<MarketsResponse>;
	getMarketStatisticsCharts: () => Promise<MarketStatisticsChartsResponse>;
	getMarketCurrencyCategories: () => Promise<MarketCurrencyCategoriesResponse>;
	getMarketListByCategory: (params: GetMarketListByCategoryParams) => Promise<MarketListByCategoryResponse>;
	getMarketList: (params: GetMarketListByCategoryParams) => Promise<MarketListResponse>;
	likeMarket: (dto: FavoriteMarketDto) => Promise<CommonResponse>;
	dislikeMarket: (dto: FavoriteMarketDto) => Promise<CommonResponse>;
};

export const marketRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): MarketRepository => ({
	async getMarketListL21(params: MarketsL21Params): Promise<MarketsL21Response> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = '/v1/market/routine/l21_f';
		const response = fetch<MarketsL21Response>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMarketListL16(
		params: MarketsParams): Promise<MarketsL16Response> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = '/v1/market/routine/l16_f';
		const response = await fetch<MarketsL16Response>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMostProfitableMarkets(params: MarketStateParams): Promise<MarketStateResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = '/v1/market/routine/l42_f';
		const response = await fetch<MarketStateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getLatestMarkets(params: MarketStateParams): Promise<MarketStateResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = '/v1/market/routine/l43_f';
		const response = await fetch<MarketStateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getHottestMarkets(params: MarketStateParams): Promise<MarketStateResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = '/v1/market/routine/l41_f';
		const response = await fetch<MarketStateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMostVoluminous(params: MarketStateParams): Promise<MarketStateResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = '/v1/market/routine/l44_f';
		const response = await fetch<MarketStateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},

	async getMarkets(
		params: MarketsParams): Promise<MarketsResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = '/v1/market/routine/l31_f';
		const response = await fetch<MarketsResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMarketStatisticsCharts(): Promise<MarketStatisticsChartsResponse> {
		const url = '/v1/market/routine/price_changed_in_24h_list';
		const response = await fetch<MarketStatisticsChartsResponse>(`${url}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMarketCurrencyCategories(): Promise<MarketCurrencyCategoriesResponse> {
		const url = '/v1/market/routine/l51_f';
		const response = await fetch<MarketCurrencyCategoriesResponse>(`${url}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMarketListByCategory({ rowCount, marketTypeId }: GetMarketListByCategoryParams): Promise<MarketListByCategoryResponse> {
		const query = new URLSearchParams({ rowCount, marketTypeId });
		const url = '/v1/market/routine/l47_f';
		const response = await fetch<MarketListByCategoryResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMarketList({ rowCount, marketTypeId }: GetMarketListByCategoryParams): Promise<MarketListResponse> {
		const query = new URLSearchParams({ rowCount, marketTypeId });
		const url = '/v1/market/routine/l46_f';
		const response = await fetch<MarketListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async likeMarket(dto: FavoriteMarketDto): Promise<CommonResponse> {
		const url = '/v1/user/market/like';
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async dislikeMarket(dto: FavoriteMarketDto): Promise<CommonResponse> {
		const url = '/v1/user/market/like';
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
});
