import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetCommissionReceivedParams, GetInvitationParams, GetReferralParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetCommissionRes, GetInvitationListRes, GetReferralRes } from '~/types/response/referral.types';

type ReferralRepository = {
	getReferral: (params: GetReferralParams) => Promise<GetReferralRes>;
	getInvitation: (params: GetInvitationParams) => Promise<GetInvitationListRes>;
	getCommissionReceived: (params: GetCommissionReceivedParams) => Promise<GetCommissionRes>;
};

export const referralRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): ReferralRepository => ({
	async getReferral(params: GetReferralParams): Promise<GetReferralRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/user/referral/brief`;
		const response = await fetch<GetReferralRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			query: {},
		} as CustomNitroFetchOptions);

		return response;
	},
	async getInvitation(params: GetInvitationParams): Promise<GetInvitationListRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/user/referral/invitation_list`;
		const response = await fetch<GetInvitationListRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			query: {},
		} as CustomNitroFetchOptions);

		return response;
	},
	async getCommissionReceived(params: GetCommissionReceivedParams): Promise<GetCommissionRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/user/referral/commission_received_list`;
		const response = await fetch<GetCommissionRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			query: {},
		} as CustomNitroFetchOptions);

		return response;
	},
});
