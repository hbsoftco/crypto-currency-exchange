import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetRootListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetLinkListRes } from '~/types/response/decoration.types';

type DecorationRepository = {
	getLinkList: (params: GetRootListParams) => Promise<GetLinkListRes>;
};

export const decorationRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): DecorationRepository => ({
	async getLinkList(params: GetRootListParams): Promise<GetLinkListRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/decoration/link_list';
		const response = await fetch<GetLinkListRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
