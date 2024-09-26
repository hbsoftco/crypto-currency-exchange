import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetUserTraderCommissionListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetUserTraderCommissionListResponse } from '~/types/response/trader.types';

type UserTraderRepository = {
	getUserTraderCommissionList: (params: GetUserTraderCommissionListParams) => Promise<GetUserTraderCommissionListResponse>;
};

export const userTraderRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): UserTraderRepository => ({
	async getUserTraderCommissionList(params: GetUserTraderCommissionListParams): Promise<GetUserTraderCommissionListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/trader/commission_list';
		const response = await fetch<GetUserTraderCommissionListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
});
