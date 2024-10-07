import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetWithdrawParams } from '~/types/base.types';
import type { GetWithdrawResponse } from '~/types/response/withdraw.type';

type WithdrawRepository = {
	getWithdraw: (params: GetWithdrawParams) => Promise<GetWithdrawResponse>;
};

export const withdrawRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): WithdrawRepository => ({
	async getWithdraw(params: GetWithdrawParams): Promise<GetWithdrawResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/withdraw/common/tx_list';
		const response = await fetch<GetWithdrawResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
			queryParams: params,
		} as CustomNitroFetchOptions);

		return response;
	},
});
