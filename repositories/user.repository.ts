import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetAddressListRes, GetBankListResponse,
	GetBestListResponse,
	GetCommissionReceivedList, GetContactListResponse,
	GetRewardReceivedListResponse,
	UserProfileResponse } from '../types/response/user.types';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { DeleteAddressListParams, DeleteContactListParams, GetAddressListParams, GetBankParams,
	GetCommissionReceivedListParams,
	GetContactListParams,
	GetReferralBestListParams,
	GetRewardExposedParams,
	GetRewardReceivedListParams,
	GetTraderBestListParams } from '~/types/base.types';
import type { GetTraderBestListResponse } from '~/types/response/trader.types';
import type { AddressSetDto, ContactSetDto } from '~/types/dto/user.dto';
import type { CommonRes } from '~/types/response/common.types';

type UserRepository = {
	getProfile: () => Promise<UserProfileResponse>;
	getCommissionReceivedList: (params: GetCommissionReceivedListParams) => Promise<GetCommissionReceivedList>;
	getRewardReceivedList: (params: GetRewardReceivedListParams) => Promise<GetRewardReceivedListResponse>;
	getBankAccList: (params: GetBankParams) => Promise<GetBankListResponse>;
	getReferralBestList: (params: GetReferralBestListParams) => Promise<GetBestListResponse>;
	getRewardExposedList: (params: GetRewardExposedParams) => Promise<GetRewardReceivedListResponse>;
	getTraderBestList: (params: GetTraderBestListParams) => Promise<GetTraderBestListResponse>;	getContactList: (params: GetContactListParams) => Promise<GetContactListResponse>;
	storeContact: (params: ContactSetDto) => Promise<CommonRes>;
	deleteContact: (params: DeleteContactListParams) => Promise<CommonRes>;
	getAddressList: (params: GetAddressListParams) => Promise<GetAddressListRes>;
	storeAddress: (params: AddressSetDto) => Promise<CommonRes>;
	deleteAddress: (params: DeleteAddressListParams) => Promise<CommonRes>;
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
	async getBankAccList(params: GetBankParams): Promise<GetBankListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/bank/acc_list';
		const response = await fetch<GetBankListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getReferralBestList(params: GetReferralBestListParams): Promise<GetBestListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/referral/best_list';
		const response = await fetch<GetBestListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getRewardExposedList(params: GetRewardExposedParams): Promise<GetRewardReceivedListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/reward/exposed_list';
		const response = await fetch<GetRewardReceivedListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getTraderBestList(params: GetTraderBestListParams): Promise<GetTraderBestListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/trader/best_list';
		const response = await fetch<GetTraderBestListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getContactList(params: GetContactListParams): Promise<GetContactListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/wbl/contact_list';
		const response = await fetch<GetContactListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeContact(dto: ContactSetDto): Promise<CommonRes> {
		const url = `/v1/user/wbl/contact_set`;
		const response = await fetch<CommonRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async deleteContact(params: DeleteContactListParams): Promise<CommonRes> {
		const url = `/v1/user/wbl/contact_delete`;
		const response = await fetch<CommonRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'DELETE',
			queryParams: params,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getAddressList(params: GetAddressListParams): Promise<GetAddressListRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/wbl/address_list';
		const response = await fetch<GetAddressListRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeAddress(dto: AddressSetDto): Promise<CommonRes> {
		const url = `/v1/user/wbl/address_set`;
		const response = await fetch<CommonRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async deleteAddress(params: DeleteAddressListParams): Promise<CommonRes> {
		const url = `/v1/user/wbl/address_delete`;
		const response = await fetch<CommonRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'DELETE',
			queryParams: params,
		} as CustomNitroFetchOptions);

		return response;
	},
});
