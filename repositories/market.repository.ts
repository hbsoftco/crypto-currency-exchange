import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetMarketListByCategoryParams, GetMarketListWithSparkLineChartParams, GetMarketsParams, GetMarketStatusParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { FavoriteMarketDto } from '~/types/dto/market.dto';
import type { CommonResponse } from '~/types/response/common.types';
import type {
	MarketCurrencyCategoriesResponse,
	MarketListByCategoryResponse,
	MarketListResponse,
	MarketListWithSparkLineChartResponse,
	MarketsResponse,
	MarketStateResponse,
	MarketStatisticsChartsResponse } from '~/types/response/market.types';

type MarketRepository = {
	getMarketListWithSparkLineChart: (params: GetMarketListWithSparkLineChartParams) => Promise<MarketListWithSparkLineChartResponse>;
	getMostProfitableMarkets: (params: GetMarketStatusParams) => Promise<MarketStateResponse>;
	getHottestMarkets: (params: GetMarketStatusParams) => Promise<MarketStateResponse>;
	getLatestMarkets: (params: GetMarketStatusParams) => Promise<MarketStateResponse>;
	getMostVoluminous: (params: GetMarketStatusParams) => Promise<MarketStateResponse>;
	getMarkets: (params: GetMarketsParams) => Promise<MarketsResponse>;
	getMarketStatisticsCharts: () => Promise<MarketStatisticsChartsResponse>;
	getMarketCurrencyCategories: () => Promise<MarketCurrencyCategoriesResponse>;
	getMarketListByCategory: (params: GetMarketListByCategoryParams) => Promise<MarketListByCategoryResponse>;
	getMarketList: (params: GetMarketListByCategoryParams) => Promise<MarketListResponse>;
	likeMarket: (dto: FavoriteMarketDto) => Promise<CommonResponse>;
	dislikeMarket: (dto: FavoriteMarketDto) => Promise<CommonResponse>;
};

export const marketRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): MarketRepository => ({
	async getMarketListWithSparkLineChart({ sortMode = '', currencyQuoteId = '', marketTypeId, tagTypeId = '' }: GetMarketListWithSparkLineChartParams): Promise<MarketListWithSparkLineChartResponse> {
		const query = new URLSearchParams({ sortMode, marketTypeId, currencyQuoteId, tagTypeId });
		const url = '/v1/market/routine/l21_f';
		const response = fetch<MarketListWithSparkLineChartResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMostProfitableMarkets({ rowCount }: GetMarketStatusParams): Promise<MarketStateResponse> {
		const query = new URLSearchParams({ rowCount: rowCount.toString() });
		const url = '/v1/market/routine/l42_f';
		const response = await fetch<MarketStateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getLatestMarkets({ rowCount }: GetMarketStatusParams): Promise<MarketStateResponse> {
		const query = new URLSearchParams({ rowCount: rowCount.toString() });
		const url = '/v1/market/routine/l43_f';
		const response = await fetch<MarketStateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getHottestMarkets({ rowCount }: GetMarketStatusParams): Promise<MarketStateResponse> {
		const query = new URLSearchParams({ rowCount: rowCount.toString() });
		const url = '/v1/market/routine/l41_f';
		const response = await fetch<MarketStateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMostVoluminous({ rowCount }: GetMarketStatusParams): Promise<MarketStateResponse> {
		const query = new URLSearchParams({ rowCount: rowCount.toString() });
		const url = '/v1/market/routine/l44_f';
		const response = await fetch<MarketStateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMarkets(
		{
			sortMode = '',
			currencyQuoteId = '',
			marketTypeId,
			tagTypeId = '',
			searchStatement = '',
			pageNumber = '',
			pageSize = '',

		}: GetMarketsParams): Promise<MarketsResponse> {
		const query = new URLSearchParams({
			sortMode,
			currencyQuoteId,
			marketTypeId,
			tagTypeId,
			searchStatement,
			pageNumber,
			pageSize,
		});
		const url = '/v1/market/routine/l31_f';
		const response = await fetch<MarketsResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
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
