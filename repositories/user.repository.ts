import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetCommissionReceivedList, GetRewardReceivedListResponse, UserProfileResponse } from '../types/response/user.types';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetCommissionReceivedListParams, GetRewardReceivedListParams } from '~/types/base.types';

type UserRepository = {
	getProfile: () => Promise<UserProfileResponse>;
	getCommissionReceivedList: (params: GetCommissionReceivedListParams) => Promise<GetCommissionReceivedList>;
	getRewardReceivedList: (params: GetRewardReceivedListParams) => Promise<GetRewardReceivedListResponse>;

};

export const userRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): UserRepository => ({
	async getProfile(): Promise<UserProfileResponse> {
		return fetch<UserProfileResponse>('/v1/currency/routine/tag_list');
	},
	async getCommissionReceivedList(params: GetCommissionReceivedListParams): Promise<GetCommissionReceivedList> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/referral/commission_received_list';
		const response = await fetch<GetCommissionReceivedList>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getRewardReceivedList(params: GetRewardReceivedListParams): Promise<GetRewardReceivedListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/reward/received_list';
		const response = await fetch<GetRewardReceivedListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
