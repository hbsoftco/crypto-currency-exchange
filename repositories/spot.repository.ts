import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { getKlineParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetKlineResponse } from '~/types/response/spot.types';

type SpotRepository = {
	getKline: (params: getKlineParams) => Promise<GetKlineResponse>;
};

export const spotRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): SpotRepository => ({
	async getKline(params: getKlineParams): Promise<GetKlineResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/spot/routine/kline';
		const response = await fetch<GetKlineResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
});
