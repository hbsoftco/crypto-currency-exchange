import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { SocialNetListResponse } from '~/types/response/support.types';

type SupportRepository = {
	getSocialNetList: () => Promise<SocialNetListResponse>;
};

export const supportRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): SupportRepository => ({
	async getSocialNetList(): Promise<SocialNetListResponse> {
		const url = '/v1/routine/support/social_net_list';
		const response = await fetch<SocialNetListResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
});
