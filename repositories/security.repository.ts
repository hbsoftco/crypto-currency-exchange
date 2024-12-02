import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { CommonResponse, KeyValueResponse } from '~/types/definitions/common.types';
import type { NoticeListParams, SecurityResponse } from '~/types/definitions/security.types';

type SecurityRepository = {
	// Logs
	getNoticeList: (params: NoticeListParams) => Promise<SecurityResponse>;
	getNoticeTypeList: () => Promise<KeyValueResponse>;
	noticeReadAll: () => Promise<CommonResponse>;
	noticeDeleteAll: () => Promise<CommonResponse>;
};

export const securityRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): SecurityRepository => ({
	// Logs
	async getNoticeList(params: NoticeListParams): Promise<SecurityResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = `/v1/security/logs/notice_list`;
		const result = await fetch<SecurityResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return result;
	},
	async getNoticeTypeList(): Promise<KeyValueResponse> {
		const url = `/v1/security/logs/notice_type_list`;
		const result = await fetch<KeyValueResponse>(url, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return result;
	},
	async noticeReadAll(): Promise<CommonResponse> {
		const url = `/v1/security/logs/notice_read_all`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
		} as CustomNitroFetchOptions);

		return response;
	},
	async noticeDeleteAll(): Promise<CommonResponse> {
		const url = `/v1/security/logs/notice_del_all`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'DELETE',
		} as CustomNitroFetchOptions);

		return response;
	},
});
