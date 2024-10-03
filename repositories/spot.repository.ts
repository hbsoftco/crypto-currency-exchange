import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetKlineParams, SpotDataParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetKlineResponse, GetSpotDataResponse } from '~/types/response/spot.types';

type SpotRepository = {
	getKline: (params: GetKlineParams) => Promise<GetKlineResponse>;
	getSpotData: (params: SpotDataParams) => Promise<GetSpotDataResponse>;
};

export const spotRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): SpotRepository => ({
	async getKline(params: GetKlineParams): Promise<GetKlineResponse> {
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
	async getSpotData(params: SpotDataParams): Promise<GetSpotDataResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/spot/routine/snapshot';
		const response = await fetch<GetSpotDataResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
});
