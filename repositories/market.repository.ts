import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetMarketListWithSparkLineChartParams } from '~/types/base.types';
import type { MarketListWithSparkLineChartResponse } from '~/types/response/market.types';

type MarketRepository = {
	getMarketListWithSparkLineChart: (params: GetMarketListWithSparkLineChartParams) => Promise<MarketListWithSparkLineChartResponse>;
};

export const marketRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): MarketRepository => ({
	async getMarketListWithSparkLineChart({ sortMode = '', currencyQuoteId = '', marketTypeId, tagTypeId = '' }: GetMarketListWithSparkLineChartParams): Promise<MarketListWithSparkLineChartResponse> {
		const query = new URLSearchParams({ sortMode, marketTypeId, currencyQuoteId, tagTypeId });

		return fetch<MarketListWithSparkLineChartResponse>(`/v1/market/routine/l21_f?${query.toString()}`);
	},
});
