import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetRootListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetLinkListResponse } from '~/types/response/decoration.types';

type DecorationRepository = {
	getLinkList: (params: GetRootListParams) => Promise<GetLinkListResponse>;
};

export const decorationRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): DecorationRepository => ({
	async getLinkList(params: GetRootListParams): Promise<GetLinkListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/decoration/link_list';
		const response = await fetch<GetLinkListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
