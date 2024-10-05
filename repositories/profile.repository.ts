import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { ProfileResponse } from '~/types/response/profile.types';

type ProfileRepository = {
	// Profile
	getCurrentUser: () => Promise<ProfileResponse>;
};

export const profileRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): ProfileRepository => ({
	// Profile
	async getCurrentUser(): Promise<ProfileResponse> {
		const url = `/v1/user/profile/get`;
		const response = await fetch<ProfileResponse>(url, {
			noAuth: false,
			apiName: url,
			query: {},
		} as CustomNitroFetchOptions);

		return response;
	},
});
