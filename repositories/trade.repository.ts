import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { getTradesListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetTradesResponse } from '~/types/response/trade.types';

type TradeRepository = {
	getTradesList: (params: getTradesListParams) => Promise<GetTradesResponse>;
};

export const tradeRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): TradeRepository => ({
	async getTradesList(params: getTradesListParams): Promise<GetTradesResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/spot/trade/list';
		const response = await fetch<GetTradesResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
});
