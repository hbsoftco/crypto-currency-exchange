import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { getTradesListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetTradesResponse } from '~/types/response/trade.types';

type TradeRepository = {
	getTradesList: (params: getTradesListParams) => Promise<GetTradesResponse>;
};

export const tradeRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): TradeRepository => ({
	async getTradesList(params: getTradesListParams): Promise<GetTradesResponse> {
		const query = new URLSearchParams({
			marketId: params.marketId || '',
			symbol: params.symbol || '',
			orderSide: params.orderSide,
			orderType: params.orderType || '',
			assetType: params.assetType || '',
			uniqueTag: params.uniqueTag || '',
			from: params.from || '',
			to: params.to || '',
			pageNumber: params.pageNumber || '',
			pageSize: params.pageSize || '',
		});

		const url = '/v1/spot/trade/list';
		const response = await fetch<GetTradesResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
		} as CustomNitroFetchOptions);

		return response;
	},
});
