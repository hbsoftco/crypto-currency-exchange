import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetCurrencyParams, GetFAQListParams, GetHowBuyListParams, GetRootListParams, GetSubjectLiveChatParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetFaqRes, GetHowToBuyListResponse, GetLiveChatListResponse, GetRootListResponse, GetShortListResponse } from '~/types/response/help.types';

type HelpRepository = {
	getRootList: (params: GetRootListParams) => Promise<GetRootListResponse>;
	getShortList: (params: GetRootListParams) => Promise<GetShortListResponse>;
	getBuyList: (params: GetHowBuyListParams) => Promise<GetHowToBuyListResponse>;
	getFAQList: (params: GetFAQListParams) => Promise<GetLiveChatListResponse>;
	getSubjectList: (params: GetSubjectLiveChatParams) => Promise<GetLiveChatListResponse>;
	getHelpData: (params: GetCurrencyParams) => Promise<GetFaqRes>;
};

export const helpRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): HelpRepository => ({
	async getRootList(params: GetRootListParams): Promise<GetRootListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/help/root_list';
		const response = await fetch<GetRootListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getShortList(params: GetRootListParams): Promise<GetShortListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/help/shortcut_list';
		const response = await fetch<GetShortListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getBuyList(params: GetHowBuyListParams): Promise<GetHowToBuyListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/help/how_to_buy_list';
		const response = await fetch<GetHowToBuyListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getFAQList(params: GetFAQListParams): Promise<GetLiveChatListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/faq/before_live_chat_list';
		const response = await fetch<GetLiveChatListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSubjectList(params: GetSubjectLiveChatParams): Promise<GetLiveChatListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/help/before_live_chat_list';
		const response = await fetch<GetLiveChatListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getHelpData(params: GetCurrencyParams): Promise<GetFaqRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/help/get';
		const response = await fetch<GetFaqRes>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
