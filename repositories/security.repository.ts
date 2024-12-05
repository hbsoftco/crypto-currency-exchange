import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { CommonResponse, KeyValueResponse } from '~/types/definitions/common.types';
import type {
	ChangePhoneDto,
	Enable2faDto,
	IdentificationDto,
	IdentificationResendDto,
	NoticeListParams,
	SecurityListResponse,
	SecurityResponse,
} from '~/types/definitions/security.types';

type SecurityRepository = {
	// Logs
	getNoticeList: (params: NoticeListParams) => Promise<SecurityListResponse>;
	getNoticeTypeList: () => Promise<KeyValueResponse>;
	noticeReadAll: () => Promise<CommonResponse>;
	noticeDeleteAll: () => Promise<CommonResponse>;
	// 2fa
	generate2fa: () => Promise<SecurityResponse>;
	enable2fa: (dto: Enable2faDto) => Promise<CommonResponse>;
	disable2fa: (dto: Enable2faDto) => Promise<CommonResponse>;
	// Identification
	identificationSend: (dto: IdentificationDto) => Promise<SecurityResponse>;
	identificationSendNew: (dto: IdentificationDto) => Promise<SecurityResponse>;
	identificationResend: (dto: IdentificationResendDto) => Promise<SecurityResponse>;
	// Change Phone
	changePhone: (dto: ChangePhoneDto) => Promise<CommonResponse>;

};

export const securityRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): SecurityRepository => ({
	// Logs
	async getNoticeList(params: NoticeListParams): Promise<SecurityListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = `/v1/security/logs/notice_list`;
		const result = await fetch<SecurityListResponse>(`${url}?${query.toString()}`, {
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
	// 2fa
	async generate2fa(): Promise<SecurityResponse> {
		const url = '/v1/security/2fa/generate';
		const response = await fetch<SecurityResponse>(`${url}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async enable2fa(dto: Enable2faDto): Promise<CommonResponse> {
		const url = `/v1/security/2fa/enable`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async disable2fa(dto: Enable2faDto): Promise<CommonResponse> {
		const url = `/v1/security/2fa/enable`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	// Identification
	async identificationSend(dto: IdentificationDto): Promise<SecurityResponse> {
		const url = `/v1/security/identification/send`;
		const response = await fetch<SecurityResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async identificationSendNew(dto: IdentificationDto): Promise<SecurityResponse> {
		const url = `/v1/security/identification/send_new`;
		const response = await fetch<SecurityResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async identificationResend(dto: IdentificationResendDto): Promise<SecurityResponse> {
		const url = `/v1/security/identification/resend`;
		const response = await fetch<SecurityResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	// Change Phone
	async changePhone(dto: ChangePhoneDto): Promise<CommonResponse> {
		const url = `/v1/security/alter/mobile_set`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
});
