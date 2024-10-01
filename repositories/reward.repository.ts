import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetExposedListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetExposedListResponse } from '~/types/response/reward.types';

type RewardRepository = {
	getExposedList: (params: GetExposedListParams) => Promise<GetExposedListResponse>;
};

export const rewardRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): RewardRepository => ({
	async getExposedList(params: GetExposedListParams): Promise<GetExposedListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/reward/exposed_list';
		const response = await fetch<GetExposedListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
});
