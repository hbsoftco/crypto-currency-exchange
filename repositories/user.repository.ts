import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { UserProfileResponse } from '../types/response/user.types';

type UserRepository = {
	getProfile: () => Promise<UserProfileResponse>;
};

export const userRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): UserRepository => ({
	async getProfile(): Promise<UserProfileResponse> {
		return fetch<UserProfileResponse>('/v1/currency/routine/tag_list');
	},
});
