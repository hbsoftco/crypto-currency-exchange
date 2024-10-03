import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetStaffParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { SocialNetListResponse, StaffCheckResponse } from '~/types/response/support.types';

type SupportRepository = {
	getSocialNetList: () => Promise<SocialNetListResponse>;
	getStaffCheck: (params: GetStaffParams) => Promise<StaffCheckResponse>;
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
	async getStaffCheck(params: GetStaffParams): Promise<StaffCheckResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = 'v1/routine/support/staff_check';
		const response = await fetch<StaffCheckResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
});
