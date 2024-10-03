import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetRootListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetRootListResponse, GetShortListResponse } from '~/types/response/help.types';

type HelpRepository = {
	getRootList: (params: GetRootListParams) => Promise<GetRootListResponse>;
	getShortList: (params: GetRootListParams) => Promise<GetShortListResponse>;
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
		} as CustomNitroFetchOptions);

		return response;
	},
});
