import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { BaseLangGroupParams, BaseLangIdParams, CommonResponse, KeyValueResponse, SearchListParams } from '~/types/definitions/common.types';
import type { FAQListParams, MiniRoutineParams, StaffParams, SystemListResponse, SystemResponse } from '~/types/definitions/system.types';

type SystemRepository = {
	getSystemHelp: (params: BaseLangIdParams) => Promise<SystemResponse>;
	getSystemLinkList: (params: BaseLangGroupParams) => Promise<SystemResponse>;
	getSystemPinList: (params: BaseLangGroupParams) => Promise<SystemListResponse>;
	getSystemCardList: (params: BaseLangGroupParams) => Promise<SystemListResponse>;
	getSystemMiniRoutine: (params: MiniRoutineParams) => Promise<SystemResponse>;
	getSystemRootList: (params: BaseLangGroupParams) => Promise<SystemListResponse>;
	getSystemShortList: (params: BaseLangGroupParams) => Promise<SystemListResponse>;
	getSystemTreeList: (params: BaseLangGroupParams) => Promise<SystemListResponse>;
	getSearchList: (params: SearchListParams) => Promise<SystemListResponse>;
	getSocialNetList: () => Promise<KeyValueResponse>;
	getStaffCheck: (params: StaffParams) => Promise<CommonResponse>;
	getSubjectList: (params: BaseLangGroupParams) => Promise<SystemListResponse>;
	getFAQList: (params: FAQListParams) => Promise<SystemListResponse>;
	getBuyList: (params: FAQListParams) => Promise<SystemListResponse>;
};

export const systemRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): SystemRepository => ({
	async getSystemHelp(params: BaseLangIdParams): Promise<SystemResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/system/help/get';
		const response = await fetch<SystemResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSystemLinkList(params: BaseLangGroupParams): Promise<SystemResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/system/decoration/link_list';
		const response = await fetch<SystemResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSystemPinList(params: BaseLangGroupParams): Promise<SystemListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/system/decoration/pin_list';
		const response = await fetch<SystemListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSystemCardList(params: BaseLangGroupParams): Promise<SystemListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/system/decoration/card_list';
		const response = await fetch<SystemListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSystemMiniRoutine(params: MiniRoutineParams): Promise<SystemResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/system/help/mini_routine';
		const response = await fetch<SystemResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSystemRootList(params: BaseLangGroupParams): Promise<SystemListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/system/help/root_list';
		const response = await fetch<SystemListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSystemShortList(params: BaseLangGroupParams): Promise<SystemListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/system/help/shortcut_list';
		const response = await fetch<SystemListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSystemTreeList(params: BaseLangGroupParams): Promise<SystemListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/system/help/tree_list';
		const response = await fetch<SystemListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSearchList(params: SearchListParams): Promise<SystemListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/system/help/search_list';
		const response = await fetch<SystemListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSocialNetList(): Promise<KeyValueResponse> {
		const url = '/v1/system/support/social_net_list';
		const response = await fetch<KeyValueResponse>(`${url}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getStaffCheck(params: StaffParams): Promise<CommonResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = '/v1/system/support/staff_check';
		const response = await fetch<CommonResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSubjectList(params: BaseLangGroupParams): Promise<SystemListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/system/help/before_live_chat_list';
		const response = await fetch<SystemListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getFAQList(params: FAQListParams): Promise<SystemListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/system/faq/before_live_chat_list';
		const response = await fetch<SystemListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getBuyList(params: FAQListParams): Promise<SystemListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/system/help/how_to_buy_list';
		const response = await fetch<SystemListResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
