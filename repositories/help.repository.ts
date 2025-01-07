import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { getMiniRoutineParams, GetReasonListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetMiniRoutineRes, KeyValueRes } from '~/types/response/common.types';

type HelpRepository = {
	// OLD
	getReasonList: (params: GetReasonListParams) => Promise<KeyValueRes>;
	getMiniRoutine: (params: getMiniRoutineParams) => Promise<GetMiniRoutineRes>;

};

export const helpRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): HelpRepository => ({
	// OLD
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
