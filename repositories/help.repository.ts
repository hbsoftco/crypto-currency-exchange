import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetHowBuyListParams, getMiniRoutineParams, GetReasonListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetMiniRoutineRes, KeyValueRes } from '~/types/response/common.types';
import type { GetHowToBuyListResponse } from '~/types/response/help.types';

type HelpRepository = {
	// OLD
	getBuyList: (params: GetHowBuyListParams) => Promise<GetHowToBuyListResponse>;
	getReasonList: (params: GetReasonListParams) => Promise<KeyValueRes>;
	getMiniRoutine: (params: getMiniRoutineParams) => Promise<GetMiniRoutineRes>;

};

export const helpRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): HelpRepository => ({
	// OLD
	async getBuyList(params: GetHowBuyListParams): Promise<GetHowToBuyListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/help/how_to_buy_list';
		const response = await fetch<GetHowToBuyListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getReasonList(params: GetReasonListParams): Promise<KeyValueRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/common/reason_list';
		const response = await fetch<KeyValueRes>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMiniRoutine(params: getMiniRoutineParams): Promise<GetMiniRoutineRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/help/mini_routine';
		const response = await fetch<GetMiniRoutineRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
