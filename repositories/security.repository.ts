import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { CommonResponse, KeyValueResponse } from '~/types/definitions/common.types';
import type {
	ActivitiesListParams,
	AntiPhishingDto,
	ChangeEmailDto,
	ChangePhoneDto,
	DeleteAccountDto,
	DeviceListParams,
	Disable2faDto,
	Enable2faDto,
	FreezeAccountDto,
	IdentificationDto,
	IdentificationResendDto,
	NoticeListParams,
	SecurityListResponse,
	SecurityResponse,
	SetPasswordDto,
	TypeListParams,
	WhiteListIPsDto,
	WithdrawPinCodeDto,
} from '~/types/definitions/security.types';

type SecurityRepository = {
	// Logs
	getNoticeList: (params: NoticeListParams) => Promise<SecurityListResponse>;
	getNoticeTypeList: () => Promise<KeyValueResponse>;
	noticeReadAll: () => Promise<CommonResponse>;
	noticeDeleteAll: () => Promise<CommonResponse>;
	getTypeList: (params: TypeListParams) => Promise<KeyValueResponse>;
	// 2fa
	generate2fa: () => Promise<SecurityResponse>;
	enable2fa: (dto: Enable2faDto) => Promise<CommonResponse>;
	disable2fa: (dto: Disable2faDto) => Promise<CommonResponse>;
	// Identification
	identificationSend: (dto: IdentificationDto) => Promise<SecurityResponse>;
	identificationSendNew: (dto: IdentificationDto) => Promise<SecurityResponse>;
	identificationResend: (dto: IdentificationResendDto) => Promise<SecurityResponse>;
	// Changes user data
	changePhone: (dto: ChangePhoneDto) => Promise<CommonResponse>;
	changeEmail: (dto: ChangeEmailDto) => Promise<CommonResponse>;
	storeSetPassword: (dto: SetPasswordDto) => Promise<CommonResponse>;
	// Security
	storeWithdrawPinCode: (dto: WithdrawPinCodeDto) => Promise<CommonResponse>;
	freezeAccount: (dto: FreezeAccountDto) => Promise<CommonResponse>;
	deleteAccount: (dto: DeleteAccountDto) => Promise<CommonResponse>;
	storeAntiPhishing: (dto: AntiPhishingDto) => Promise<CommonResponse>;
	getWhiteListIPs: () => Promise<SecurityResponse>;
	storeWhiteListIPs: (dto: WhiteListIPsDto) => Promise<CommonResponse>;
	getActivitiesList: (params: ActivitiesListParams) => Promise<SecurityListResponse>;
	// list-device
	getDeviceList: (params: DeviceListParams) => Promise<SecurityListResponse>;
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
	async getTypeList(params: TypeListParams): Promise<KeyValueResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/system/common/type_list`;
		const response = await fetch<KeyValueResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
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
	async disable2fa(dto: Disable2faDto): Promise<CommonResponse> {
		const url = `/v1/security/2fa/disable`;
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
	// Changes user data
	async changePhone(dto: ChangePhoneDto): Promise<CommonResponse> {
		const url = `/v1/security/alter/mobile_set`;
		const { v2FACode, ...rest } = dto;
		const body = v2FACode ? dto : rest;

		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body,
		} as CustomNitroFetchOptions);

		return response;
	},
	async changeEmail(dto: ChangeEmailDto): Promise<CommonResponse> {
		const url = `/v1/security/alter/email_set`;
		const { v2FACode, ...rest } = dto;
		const body = v2FACode ? dto : rest;

		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeSetPassword(dto: SetPasswordDto): Promise<CommonResponse> {
		const url = `/v1/security/alter/password_set`;
		const { v2FACode, rePasswordNew, ...rest } = dto;
		const body = v2FACode ? dto : rest;

		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body,
		} as CustomNitroFetchOptions);

		return response;
	},
	// Security
	async storeWithdrawPinCode(dto: WithdrawPinCodeDto): Promise<CommonResponse> {
		const url = `/v1/security/alter/withdraw_pincode_set`;
		const { v2FACode, ...rest } = dto;
		const body = v2FACode ? dto : rest;

		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body,
		} as CustomNitroFetchOptions);

		return response;
	},
	async freezeAccount(dto: FreezeAccountDto): Promise<CommonResponse> {
		const url = `/v1/security/account/freez`;

		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async deleteAccount(dto: DeleteAccountDto): Promise<CommonResponse> {
		const url = `/v1/security/account/delete`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeAntiPhishing(dto: AntiPhishingDto): Promise<CommonResponse> {
		const url = `/v1/security/alter/antiphishing_phrase_set`;
		const { v2FACode, ...rest } = dto;
		const body = v2FACode ? dto : rest;

		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getWhiteListIPs(): Promise<SecurityResponse> {
		const url = `/v1/security/wbl/ips_get`;
		const result = await fetch<SecurityResponse>(`${url}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return result;
	},
	async storeWhiteListIPs(dto: WhiteListIPsDto): Promise<CommonResponse> {
		const url = `/v1/security/wbl/ips_set`;
		const { v2FACode, ...rest } = dto;
		const body = v2FACode ? dto : rest;

		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getActivitiesList(params: ActivitiesListParams): Promise<SecurityListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/security/logs/activities_list`;
		const response = await fetch<SecurityListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	// list-device
	async getDeviceList(params: DeviceListParams): Promise<SecurityListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/security/logs/device_list`;
		const response = await fetch<SecurityListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
