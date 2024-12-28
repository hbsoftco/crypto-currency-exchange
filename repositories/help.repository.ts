import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetFAQListParams, GetHowBuyListParams, getMiniRoutineParams, GetReasonListParams, GetSubjectLiveChatParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { BaseLangGroupParams } from '~/types/definitions/common.types';
import type { GetMiniRoutineRes, KeyValueRes } from '~/types/response/common.types';
import type { GetHowToBuyListResponse, GetLiveChatListResponse, GetRootListResponse, GetSearchListResponse, GetShortListResponse, GetTreeListRes } from '~/types/response/help.types';

type HelpRepository = {
	// OLD
	getBuyList: (params: GetHowBuyListParams) => Promise<GetHowToBuyListResponse>;
	getSubjectList: (params: GetSubjectLiveChatParams) => Promise<GetLiveChatListResponse>;
	getReasonList: (params: GetReasonListParams) => Promise<KeyValueRes>;
	getMiniRoutine: (params: getMiniRoutineParams) => Promise<GetMiniRoutineRes>;
	getFAQList: (params: GetFAQListParams) => Promise<GetLiveChatListResponse>;

};

export const helpRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): HelpRepository => ({
	// OLD
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
	async getReasonList(params: GetReasonListParams): Promise<KeyValueRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/common/reason_list';
		const response = await fetch<KeyValueRes>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMiniRoutine(params: getMiniRoutineParams): Promise<GetMiniRoutineRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/help/mini_routine';
		const response = await fetch<GetMiniRoutineRes>(`${url}?${query.toString()}`, {
			noAuth: false,
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
});
