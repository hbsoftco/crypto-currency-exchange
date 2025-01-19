import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetReasonListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { KeyValueRes } from '~/types/response/common.types';

type HelpRepository = {
	// OLD
	getReasonList: (params: GetReasonListParams) => Promise<KeyValueRes>;

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
});
