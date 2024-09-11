import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetMarketListWithSparkLineChartParams, GetMarketStatusParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { MarketListWithSparkLineChartResponse, MarketStateResponse } from '~/types/response/market.types';

type MarketRepository = {
	getMarketListWithSparkLineChart: (params: GetMarketListWithSparkLineChartParams) => Promise<MarketListWithSparkLineChartResponse>;
	getMostProfitableMarkets: (params: GetMarketStatusParams) => Promise<MarketStateResponse>;
	getHottestMarkets: (params: GetMarketStatusParams) => Promise<MarketStateResponse>;
	getLatestMarkets: (params: GetMarketStatusParams) => Promise<MarketStateResponse>;
};

export const marketRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): MarketRepository => ({
	async getMarketListWithSparkLineChart({ sortMode = '', currencyQuoteId = '', marketTypeId, tagTypeId = '' }: GetMarketListWithSparkLineChartParams): Promise<MarketListWithSparkLineChartResponse> {
		const query = new URLSearchParams({ sortMode, marketTypeId, currencyQuoteId, tagTypeId });
		const url = '/v1/market/routine/l21_f';
		const response = fetch<MarketListWithSparkLineChartResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMostProfitableMarkets({ rowCount }: GetMarketStatusParams): Promise<MarketStateResponse> {
		const query = new URLSearchParams({ rowCount: rowCount.toString() });
		const url = '/v1/market/routine/l41_f';
		const response = await fetch<MarketStateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getLatestMarkets({ rowCount }: GetMarketStatusParams): Promise<MarketStateResponse> {
		const query = new URLSearchParams({ rowCount: rowCount.toString() });
		const url = '/v1/market/routine/l41_f';
		const response = await fetch<MarketStateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getHottestMarkets({ rowCount }: GetMarketStatusParams): Promise<MarketStateResponse> {
		const query = new URLSearchParams({ rowCount: rowCount.toString() });
		const url = '/v1/market/routine/l41_f';
		const response = await fetch<MarketStateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
		} as CustomNitroFetchOptions);

		return response;
	},
});
