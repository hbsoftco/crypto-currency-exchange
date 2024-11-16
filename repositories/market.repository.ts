import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { CommonResponse } from '~/types/definitions/common.types';
import type {
	MarketsL21Params,
	MarketsResponse,
	MarketsParams,
	MarketStateParams,
	MarketStateResponse,
	MarketsL47Params,
	MarketDailyPriceChangeResponse,
	FavoriteMarketDto } from '~/types/definitions/market.types';
import type { MarketListResponse } from '~/types/response/market.types';

type MarketRepository = {
	getMarketListL21: (params: MarketsL21Params) => Promise<MarketsResponse>;
	getMarketListL16: (params: MarketsParams) => Promise<MarketsResponse>;
	getMostProfitableMarkets: (params: MarketStateParams) => Promise<MarketStateResponse>;
	getHottestMarkets: (params: MarketStateParams) => Promise<MarketStateResponse>;
	getLatestMarkets: (params: MarketStateParams) => Promise<MarketStateResponse>;
	getMostVoluminous: (params: MarketStateParams) => Promise<MarketStateResponse>;
	getMarketListL31: (params: MarketsParams) => Promise<MarketsResponse>;
	getMarketListL31a: (params: MarketsParams) => Promise<MarketsResponse>;
	getMarketListL51: () => Promise<MarketsResponse>;
	getMarketListL47: (params: MarketsL47Params) => Promise<MarketsResponse>;
	getMarketDailyPriceChange: () => Promise<MarketDailyPriceChangeResponse>;
	likeMarket: (dto: FavoriteMarketDto) => Promise<CommonResponse>;
	dislikeMarket: (dto: FavoriteMarketDto) => Promise<CommonResponse>;

	getMarkets: (params: MarketsParams) => Promise<MarketsResponse>;
	getMarketList: (params: MarketsL47Params) => Promise<MarketListResponse>;
};

export const marketRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): MarketRepository => ({
	async getMarketListL21(params: MarketsL21Params): Promise<MarketsResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = '/v1/market/routine/l21_f';
		const response = fetch<MarketsResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMarketListL16(
		params: MarketsParams): Promise<MarketsResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = '/v1/market/routine/l16_f';
		const response = await fetch<MarketsResponse>(`${url}?${query.toString()}`, {
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
	async getMarketListL31(
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
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMarketListL31a(
		params: MarketsParams): Promise<MarketsResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = '/v1/market/routine/l31_a';
		const response = await fetch<MarketsResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMarketListL51(): Promise<MarketsResponse> {
		const url = '/v1/market/routine/l51_f';
		const response = await fetch<MarketsResponse>(`${url}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMarketListL47(params: MarketsL47Params): Promise<MarketsResponse> {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value.toString().trim() !== '') {
				query.append(key, value);
			}
		});

		const url = '/v1/market/routine/l47_f';
		const response = await fetch<MarketStateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMarketDailyPriceChange(): Promise<MarketDailyPriceChangeResponse> {
		const url = '/v1/market/routine/price_changed_in_24h_list';
		const response = await fetch<MarketDailyPriceChangeResponse>(`${url}`, {
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
		const url = '/v1/user/market/dislike';
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
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
	async getMarketList({ rowCount, marketTypeId }: MarketsL47Params): Promise<MarketListResponse> {
		const query = new URLSearchParams({ rowCount, marketTypeId });
		const url = '/v1/market/routine/l46_f';
		const response = await fetch<MarketListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
