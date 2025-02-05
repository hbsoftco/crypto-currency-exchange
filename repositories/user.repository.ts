import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetBestListResponse } from '../types/response/user.types';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type {
	GetReferralBestListParams,
	// GetRewardReceivedListParams,
	GetTraderBestListParams } from '~/types/base.types';
import type {
	GetTraderBestListResponse } from '~/types/response/trader.types';
import type {
	CodeInviteDto,
	SetEmailDto,
	SetMobileDto } from '~/types/dto/user.dto';
import type {
	ApiDto,
	ApiKeyParams,
	ApiParams,
	AppendTicketDto,
	AssetTypeParams,
	BankAccountDto,
	BankAccountListParams,
	DeleteBankAccountParams,
	InvitationListParams,
	InviteCommissionParams,
	ReferralBriefParams,
	ResultResponse,
	RewardParams,
	SetBasicDto,
	SetCardPrintDto,
	SetLiveDto,
	SetNicknameDto,
	StoreTicketDto,
	TicketListParams,
	TicketResponse,
	TraderCommissionListParams,
	UploadAvatarDto,
	UserResponse } from '~/types/definitions/user.types';
import type { CommonResponse, KeyValueResponse } from '~/types/definitions/common.types';

type UserRepository = {
	// Trader
	getTraderCommissionList: (params: TraderCommissionListParams) => Promise<UserResponse>;
	getLevelsList: () => Promise<UserResponse>;
	getTraderBrief: (params: AssetTypeParams) => Promise<ResultResponse>;
	getTraderState: (params: AssetTypeParams) => Promise<ResultResponse>;

	// Profile
	setNickname: (dto: SetNicknameDto) => Promise<CommonResponse>;
	getCurrentUser: () => Promise<KeyValueResponse>;
	uploadAvatar: (dto: UploadAvatarDto) => Promise<CommonResponse>;

	// Ticket
	getTicketList: (params: TicketListParams) => Promise<UserResponse>;
	getTicketTypes: () => Promise<KeyValueResponse>;
	storeTicket: (dto: StoreTicketDto) => Promise<TicketResponse>;
	uploadTicketFile: (file: File) => Promise<CommonResponse>;
	getTicketDetail: (id: string) => Promise<TicketResponse>;
	closeTicket: (id: string) => Promise<CommonResponse>;
	appendTicket: (dto: AppendTicketDto) => Promise<TicketResponse>;

	// Id-Auth
	storeSetBasic: (dto: SetBasicDto) => Promise<CommonResponse>;
	storeSetLive: (dto: SetLiveDto) => Promise<CommonResponse>;
	uploadIdCard: (image: File) => Promise<CommonResponse>;
	uploadSelfy1: (image: File) => Promise<CommonResponse>;
	uploadSelfy2: (image: File) => Promise<CommonResponse>;

	// Referral
	getReferralBrief: (params: ReferralBriefParams) => Promise<ResultResponse>;
	getInvitationList: (params: InvitationListParams) => Promise<UserResponse>;
	getInvitationCommission: (params: InviteCommissionParams) => Promise<UserResponse>;

	// Others
	getHolderBrief: (params: AssetTypeParams) => Promise<ResultResponse>;
	getHolderLevelList: () => Promise<UserResponse>;
	getRewardList: (params: RewardParams) => Promise<UserResponse>;

	// Manage API
	getApiList: (params: ApiParams) => Promise<UserResponse>;
	getApiPermissionList: () => Promise<KeyValueResponse>;
	storeApiPoint: (dto: ApiDto) => Promise<ResultResponse>;
	editApiPoint: (dto: ApiDto) => Promise<ResultResponse>;
	deleteApi: (params: ApiKeyParams) => Promise<CommonResponse>;

	// Assets
	getBankAccountList: (params: BankAccountListParams) => Promise<UserResponse>;
	storeBankAccount: (params: BankAccountDto) => Promise<CommonResponse>;
	deleteBankAccount: (params: DeleteBankAccountParams) => Promise<CommonResponse>;

	// OLD
	// getRewardReceivedList: (params: GetRewardReceivedListParams) => Promise<GetRewardReceivedListResponse>;
	getReferralBestList: (params: GetReferralBestListParams) => Promise<GetBestListResponse>;
	editCodeInvite: (params: CodeInviteDto) => Promise<CommonResponse>;
	getTraderBestList: (params: GetTraderBestListParams) => Promise<GetTraderBestListResponse>;
	setEmail: (dto: SetEmailDto) => Promise<CommonResponse>;
	storeSetMobile: (dto: SetMobileDto) => Promise<CommonResponse>;
	storeCardPrint: (dto: SetCardPrintDto) => Promise<CommonResponse>;
};

export const userRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): UserRepository => ({
	// Trader
	async getTraderCommissionList(params: TraderCommissionListParams): Promise<UserResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/trader/commission_list';
		const response = await fetch<UserResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getLevelsList(): Promise<UserResponse> {
		const url = '/v1/user/trader/levels_list';
		const response = await fetch<UserResponse>(`${url}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getTraderBrief(params: AssetTypeParams): Promise<ResultResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/trader/brief';
		const response = await fetch<ResultResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getTraderState(params: AssetTypeParams): Promise<ResultResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/trader/stats';
		const response = await fetch<ResultResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
	// Profile
	async setNickname(dto: SetNicknameDto): Promise<CommonResponse> {
		const url = `/v1/user/profile/set_nickname`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getCurrentUser(): Promise<KeyValueResponse> {
		const url = `/v1/user/profile/get`;
		const response = await fetch<KeyValueResponse>(url, {
			noAuth: false,
		} as CustomNitroFetchOptions);

		return response;
	},
	async uploadAvatar(dto: UploadAvatarDto): Promise<CommonResponse> {
		const formData = new FormData();
		formData.append('image', dto.image);

		const url = `/v1/upload/avatar`;
		const response = await fetch<CommonResponse>(`${url}?wloId=1`, {
			noAuth: false,
			method: 'POST',
			body: formData,
		} as CustomNitroFetchOptions);

		return response;
	},
	// Ticket
	async getTicketList(params: TicketListParams): Promise<UserResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/ticketing/list';
		const response = await fetch<UserResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getTicketTypes(): Promise<KeyValueResponse> {
		const url = '/v1/user/ticketing/type_list';
		const response = await fetch<KeyValueResponse>(`${url}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeTicket(dto: StoreTicketDto): Promise<TicketResponse> {
		const url = `/v1/user/ticketing/create`;
		const response = await fetch<TicketResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async uploadTicketFile(file: File): Promise<CommonResponse> {
		const formData = new FormData();
		formData.append('data', file);

		const url = `/v1/upload/ticket`;

		const response = await fetch<CommonResponse>(`${url}?wloId=1`, {
			noAuth: false,
			method: 'POST',
			body: formData,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getTicketDetail(id: string): Promise<TicketResponse> {
		const query = new URLSearchParams(
			Object.entries({ id })
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/ticketing/get';
		const response = await fetch<TicketResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async closeTicket(id: string): Promise<CommonResponse> {
		const url = `v1/user/ticketing/close`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: { id },
		} as CustomNitroFetchOptions);

		return response;
	},
	async appendTicket(dto: AppendTicketDto): Promise<TicketResponse> {
		const url = `/v1/user/ticketing/append`;
		const response = await fetch<TicketResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	// Id-auth
	async storeSetBasic(dto: SetBasicDto): Promise<CommonResponse> {
		const url = `/v1/user/profile/set_basic`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeSetLive(dto: SetLiveDto): Promise<CommonResponse> {
		const url = `/v1/user/profile/set_live`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async uploadIdCard(image: File): Promise<CommonResponse> {
		const formData = new FormData();
		formData.append('image', image);

		const url = `/v1/upload/idcard`;

		const response = await fetch<CommonResponse>(`${url}?wloId=1`, {
			noAuth: false,
			method: 'POST',
			body: formData,
		} as CustomNitroFetchOptions);

		return response;
	},
	async uploadSelfy1(image: File): Promise<CommonResponse> {
		const formData = new FormData();
		formData.append('image', image);

		const url = `/v1/upload/selfy1`;

		const response = await fetch<CommonResponse>(`${url}?wloId=1`, {
			noAuth: false,
			method: 'POST',
			body: formData,
		} as CustomNitroFetchOptions);

		return response;
	},
	async uploadSelfy2(image: File): Promise<CommonResponse> {
		const formData = new FormData();
		formData.append('image', image);

		const url = `/v1/upload/selfy2`;

		const response = await fetch<CommonResponse>(`${url}?wloId=1`, {
			noAuth: false,
			method: 'POST',
			body: formData,
		} as CustomNitroFetchOptions);

		return response;
	},
	// Referral
	async getReferralBrief(params: ReferralBriefParams): Promise<ResultResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/referral/brief';
		const response = await fetch<ResultResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getInvitationList(params: InvitationListParams): Promise<UserResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/user/referral/invitation_list`;
		const response = await fetch<UserResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getInvitationCommission(params: InviteCommissionParams): Promise<UserResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/user/referral/commission_received_list`;
		const response = await fetch<UserResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			query: {},
		} as CustomNitroFetchOptions);

		return response;
	},
	// Others
	async getHolderBrief(params: AssetTypeParams): Promise<ResultResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/user/holder/brief`;
		const response = await fetch<ResultResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getHolderLevelList(): Promise<UserResponse> {
		const url = '/v1/user/holder/levels_list';
		const response = await fetch<UserResponse>(`${url}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getRewardList(params: RewardParams): Promise<UserResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/reward/exposed_list';
		const response = await fetch<UserResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	// Manage API
	async getApiList(params: ApiParams): Promise<UserResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = `/v1/user/apiexch/list`;
		const response = await fetch<UserResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			query: {},
		} as CustomNitroFetchOptions);

		return response;
	},
	async getApiPermissionList(): Promise<KeyValueResponse> {
		const url = `/v1/user/apiexch/perm_type_list`;
		const response = await fetch<KeyValueResponse>(`${url}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeApiPoint(dto: ApiDto): Promise<ResultResponse> {
		const url = `/v1/user/apiexch/add`;
		const response = await fetch<ResultResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async editApiPoint(dto: ApiDto): Promise<ResultResponse> {
		const url = `/v1/user/apiexch/edit`;
		const response = await fetch<ResultResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async deleteApi(params: ApiKeyParams): Promise<CommonResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = `/v1/user/apiexch/delete`;
		const response = await fetch<CommonResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'DELETE',
		} as CustomNitroFetchOptions);

		return response;
	},
	// Assets
	async getBankAccountList(params: BankAccountListParams): Promise<UserResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/user/bank/acc_list';
		const response = await fetch<UserResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeBankAccount(dto: BankAccountDto): Promise<CommonResponse> {
		const url = `/v1/user/bank/acc_add`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async deleteBankAccount(params: DeleteBankAccountParams): Promise<CommonResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = `/v1/user/bank/acc_delete`;
		const response = await fetch<CommonResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'DELETE',
		} as CustomNitroFetchOptions);

		return response;
	},
	// Old
	// async getRewardReceivedList(params: GetRewardReceivedListParams): Promise<GetRewardReceivedListResponse> {
	// 	const query = new URLSearchParams(
	// 		Object.entries(params)
	// 			.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
	// 	);

	// 	const url = '/v1/user/reward/received_list';
	// 	const response = await fetch<GetRewardReceivedListResponse>(`${url}?${query.toString()}`, {
	// 		noAuth: false,
	// 		apiName: url,
	// 		queryParams: params,
	// 		method: 'GET',
	// 	} as CustomNitroFetchOptions);

	// 	return response;
	// },
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
});
