import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetActivitiesListRes, GetAddressListRes, GetBankListResponse,
	GetBestListResponse,
	GetCommissionReceivedList, GetContactListResponse,
	GetDeviceListRes,
	GetDevLinkGenerateRes,
	GetHolderLevelListRes,
	GetHolderRes,
	GetLevelsDataRes,
	GetRewardReceivedListResponse,
	GetStateTradeRes,
	ReferralBriefResponse,
	TwoStepLoginResponse,
	UserProfileResponse } from '../types/response/user.types';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type {
	DeleteAddressListParams,
	DeleteContactListParams,
	getActivitiesListParams,
	GetAddressListParams,
	GetBankParams,
	GetCommissionReceivedListParams,
	GetContactListParams,
	getDeviceListParams,
	GetInvitationParams,
	GetReferralBestListParams,
	GetRewardExposedParams,
	GetRewardReceivedListParams,
	GetTraderBestListParams,
	GetTraderBriefParams,
	getTypeListParams,
	GetUserTraderCommissionListParams } from '~/types/base.types';
import type {
	GetTraderBestListResponse,
	GetTraderBriefResponse,
	GetUserTraderCommissionListResponse } from '~/types/response/trader.types';
import type {
	AddCardBankSetDto,
	AddressSetDto,
	CodeInviteDto,
	ContactSetDto,
	DeleteAccountDto,
	IdentificationResendDto,
	IdentificationSendDto,
	IdentificationSendNewDto,
	NickNameSetDto,
	SetAntiPhishingDto,
	SetBasicDto,
	SetCardPrintDto,
	SetEmailDto,
	SetLiveDto,
	SetMobileDto,
	SetPasswordDto,
	SetPinCodeDto } from '~/types/dto/user.dto';
import type { CommonResponse, GetCountryListRes, IdentificationRes, KeyValueRes, UploadAvatarDto } from '~/types/response/common.types';
import type { GetCommissionRes, GetInvitationListRes } from '~/types/response/referral.types';

type UserRepository = {
	generate2Fa: () => Promise<TwoStepLoginResponse>;
	getProfile: () => Promise<UserProfileResponse>;
	getCommissionReceivedList: (params: GetCommissionReceivedListParams) => Promise<GetCommissionReceivedList>;
	getReferralBrief: (assessmentCurrencyId: string) => Promise<ReferralBriefResponse>;
	getRewardReceivedList: (params: GetRewardReceivedListParams) => Promise<GetRewardReceivedListResponse>;
	getBankAccList: (params: GetBankParams) => Promise<GetBankListResponse>;
	getReferralBestList: (params: GetReferralBestListParams) => Promise<GetBestListResponse>;
	getRewardExposedList: (params: GetRewardExposedParams) => Promise<GetRewardReceivedListResponse>;
	getContactList: (params: GetContactListParams) => Promise<GetContactListResponse>;
	storeContact: (params: ContactSetDto) => Promise<CommonResponse>;
	deleteContact: (params: DeleteContactListParams) => Promise<CommonResponse>;
	getAddressList: (params: GetAddressListParams) => Promise<GetAddressListRes>;
	storeAddress: (params: AddressSetDto) => Promise<CommonResponse>;
	deleteAddress: (params: DeleteAddressListParams) => Promise<CommonResponse>;
	storeNickName: (params: NickNameSetDto) => Promise<CommonResponse>;
	storeBankAccAdd: (params: AddCardBankSetDto) => Promise<CommonResponse>;
	identificationResend: (params: IdentificationResendDto) => Promise<IdentificationRes>;
	getIdentificationCode: (params: IdentificationSendDto) => Promise<IdentificationRes>;
	editCodeInvite: (params: CodeInviteDto) => Promise<CommonResponse>;
	getTraderBestList: (params: GetTraderBestListParams) => Promise<GetTraderBestListResponse>;
	getTraderBrief: (params: GetTraderBriefParams) => Promise<GetTraderBriefResponse>;
	getUserTraderCommissionList: (params: GetUserTraderCommissionListParams) => Promise<GetUserTraderCommissionListResponse>;
	getTraderState: (params: GetTraderBriefParams) => Promise<GetStateTradeRes>;
	getLevelDate: () => Promise<GetLevelsDataRes>;
	getInvitation: (params: GetInvitationParams) => Promise<GetInvitationListRes>;
	getCommissionReceived: (params: GetCommissionReceivedListParams) => Promise<GetCommissionRes>;
	uploadAvatar: (dto: UploadAvatarDto) => Promise<CommonResponse>;
	getDeviceList: (params: getDeviceListParams) => Promise<GetDeviceListRes>;
	deleteAccount: (dto: DeleteAccountDto) => Promise<CommonResponse>;
	storeSetBasic: (dto: SetBasicDto) => Promise<CommonResponse>;
	storeSetLive: (dto: SetLiveDto) => Promise<CommonResponse>;
	getDevLinkGenerate: () => Promise<GetDevLinkGenerateRes>;
	getActivitiesList: (params: getActivitiesListParams) => Promise<GetActivitiesListRes>;
	getTypeList: (params: getTypeListParams) => Promise<KeyValueRes>;
	identificationSendNew: (dto: IdentificationSendNewDto) => Promise<IdentificationRes>;
	setEmail: (dto: SetEmailDto) => Promise<CommonResponse>;
	storeSetMobile: (dto: SetMobileDto) => Promise<CommonResponse>;
	storeSetPassword: (dto: SetPasswordDto) => Promise<CommonResponse>;
	storeSetPinCode: (dto: SetPinCodeDto) => Promise<CommonResponse>;
	storeSetAntiPhishing: (dto: SetAntiPhishingDto) => Promise<CommonResponse>;
	getHolder: (params: GetTraderBriefParams) => Promise<GetHolderRes>;
	getHolderLevelList: () => Promise<GetHolderLevelListRes>;
	storeCardPrint: (dto: SetCardPrintDto) => Promise<CommonResponse>;
	getCountryList: () => Promise<GetCountryListRes>;
};

export const userRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): UserRepository => ({
	async generate2Fa(): Promise<TwoStepLoginResponse> {
		const url = '/v1/user/2fa/generate';
		const response = await fetch<TwoStepLoginResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
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
	async getReferralBrief(assessmentCurrencyId: string = '1'): Promise<ReferralBriefResponse> {
		const query = new URLSearchParams(
			Object.entries({ assessmentCurrencyId })
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/referral/brief';
		const response = await fetch<ReferralBriefResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
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
	async storeBankAccAdd(dto: AddCardBankSetDto): Promise<CommonResponse> {
		const url = `/v1/user/bank/acc_add`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
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
	async storeContact(dto: ContactSetDto): Promise<CommonResponse> {
		const url = `/v1/user/wbl/contact_set`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async deleteContact(params: DeleteContactListParams): Promise<CommonResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = `/v1/user/wbl/contact_delete`;
		const response = await fetch<CommonResponse>(`${url}?${query.toString()}`, {
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
	async storeAddress(dto: AddressSetDto): Promise<CommonResponse> {
		const url = `/v1/user/wbl/address_set`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async deleteAddress(params: DeleteAddressListParams): Promise<CommonResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = `/v1/user/wbl/address_delete`;
		const response = await fetch<CommonResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'DELETE',
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeNickName(dto: NickNameSetDto): Promise<CommonResponse> {
		const url = `/v1/user/profile/set_nickname`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async identificationResend(dto: IdentificationResendDto): Promise<IdentificationRes> {
		const url = `/v1/user/identification/resend`;
		const response = await fetch<IdentificationRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async identificationSendNew(dto: IdentificationSendNewDto): Promise<IdentificationRes> {
		const url = `/v1/user/identification/send_new`;
		const response = await fetch<IdentificationRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getIdentificationCode(dto: IdentificationSendDto): Promise<IdentificationRes> {
		const url = `/v1/user/identification/send`;
		const response = await fetch<IdentificationRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async editCodeInvite(dto: CodeInviteDto): Promise<CommonResponse> {
		const url = `/v1/user/alter/referral_code_set`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
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
	async getTraderBrief(params: GetTraderBriefParams): Promise<GetTraderBriefResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/trader/brief';
		const response = await fetch<GetTraderBriefResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getUserTraderCommissionList(params: GetUserTraderCommissionListParams): Promise<GetUserTraderCommissionListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/trader/commission_list';
		const response = await fetch<GetUserTraderCommissionListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getTraderState(params: GetTraderBriefParams): Promise<GetStateTradeRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/trader/stats';
		const response = await fetch<GetStateTradeRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getLevelDate(): Promise<GetLevelsDataRes> {
		const url = '/v1/user/trader/levels_list';
		const response = await fetch<GetLevelsDataRes>(`${url}`, {
			noAuth: false,
			method: 'GET',
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
	async getCommissionReceived(params: GetCommissionReceivedListParams): Promise<GetCommissionRes> {
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
	async uploadAvatar(dto: UploadAvatarDto): Promise<CommonResponse> {
		const formData = new FormData();
		formData.append('image', dto.image);
		// formData.append('usid', dto.usid);

		const url = `/v1/upload/avatar`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: formData,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getDeviceList(params: getDeviceListParams): Promise<GetDeviceListRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/user/logs/device_list`;
		const response = await fetch<GetDeviceListRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			query: {},
		} as CustomNitroFetchOptions);

		return response;
	},
	async deleteAccount(dto: DeleteAccountDto): Promise<CommonResponse> {
		const url = `/v1/user/account/delete`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeSetBasic(dto: SetBasicDto): Promise<CommonResponse> {
		const url = `/v1/user/profile/set_basic`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeSetLive(dto: SetLiveDto): Promise<CommonResponse> {
		const url = `/v1/user/profile/set_live`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getDevLinkGenerate(): Promise<GetDevLinkGenerateRes> {
		const url = '/v1/user/account/devlink_qrc_generate';
		const response = await fetch<GetDevLinkGenerateRes>(`${url}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getActivitiesList(params: getActivitiesListParams): Promise<GetActivitiesListRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/user/logs/activities_list`;
		const response = await fetch<GetActivitiesListRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			query: {},
		} as CustomNitroFetchOptions);

		return response;
	},
	async getTypeList(params: getTypeListParams): Promise<KeyValueRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/routine/common/type_list`;
		const response = await fetch<KeyValueRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			query: {},
		} as CustomNitroFetchOptions);

		return response;
	},
	async setEmail(dto: SetEmailDto): Promise<CommonResponse> {
		const url = `/v1/user/alter/email_set`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeSetMobile(dto: SetMobileDto): Promise<CommonResponse> {
		const url = `/v1/user/alter/mobile_set`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeSetPassword(dto: SetPasswordDto): Promise<CommonResponse> {
		const url = `/v1/user/alter/password_set`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeSetPinCode(dto: SetPinCodeDto): Promise<CommonResponse> {
		const url = `/v1/user/alter/withdraw_pincode_set`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeSetAntiPhishing(dto: SetAntiPhishingDto): Promise<CommonResponse> {
		const url = `/v1/user/alter/antiphishing_phrase_set`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getHolder(params: GetTraderBriefParams): Promise<GetHolderRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/user/holder/brief`;
		const response = await fetch<GetHolderRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			query: {},
		} as CustomNitroFetchOptions);

		return response;
	},
	async getHolderLevelList(): Promise<GetHolderLevelListRes> {
		const url = '/v1/user/holder/levels_list';
		const response = await fetch<GetHolderLevelListRes>(`${url}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeCardPrint(dto: SetCardPrintDto): Promise<CommonResponse> {
		const url = `/v1/user/holder/card_print_req`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getCountryList(): Promise<GetCountryListRes> {
		const url = '/v1/routine/common/country_list';
		const response = await fetch<GetCountryListRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
