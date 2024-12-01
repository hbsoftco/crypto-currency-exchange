import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { BaseLangGroupParams, BaseLangIdParams } from '~/types/definitions/common.types';
import type { SystemListResponse, SystemResponse } from '~/types/definitions/system.types';

type SystemRepository = {
	getSystemHelp: (params: BaseLangIdParams) => Promise<SystemResponse>;
	getSystemLinkList: (params: BaseLangGroupParams) => Promise<SystemResponse>;
	getSystemPinList: (params: BaseLangGroupParams) => Promise<SystemListResponse>;
	getSystemCardList: (params: BaseLangGroupParams) => Promise<SystemListResponse>;
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
});
