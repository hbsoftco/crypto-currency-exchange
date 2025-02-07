import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { DepositCoinListParams } from '~/types/base.types';
import type { GetAddressRevokeRes, getDepositCoinListRes } from '~/types/response/deposit.types';
import type { ClaimDto } from '~/types/dto/deposit.dto';
import type { CommonResponse } from '~/types/response/common.types';
import type {
	DepositCoinFeesParams,
	DepositCryptoAddressParams,
	DepositListResponse,
	DepositTransactionsParams,
} from '~/types/definitions/deposit.types';

type DepositRepository = {
	getDepositCoinFees: (params: DepositCoinFeesParams) => Promise<DepositListResponse>;
	getDepositCryptoAddress: (params: DepositCryptoAddressParams) => Promise<DepositListResponse>;
	getDepositTransactions: (params: DepositTransactionsParams) => Promise<DepositListResponse>;

	// Old
	getDepositCoinList: (params: DepositCoinListParams) => Promise<getDepositCoinListRes>;
	getDepositAddressRevoke: (id: string) => Promise<GetAddressRevokeRes>;
	getDepositAddressExtend: (id: string) => Promise<GetAddressRevokeRes>;
	storeDepositClaim: (dto: ClaimDto) => Promise<CommonResponse>;

};

export const depositRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): DepositRepository => ({
	async getDepositCoinFees(params: DepositCoinFeesParams): Promise<DepositListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/deposit/crypto/coin_agg_list';
		const response = await fetch<DepositListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return response;
	},
	async getDepositCryptoAddress(params: DepositCryptoAddressParams): Promise<DepositListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/deposit/crypto/address_list';
		const response = await fetch<DepositListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getDepositTransactions(params: DepositTransactionsParams): Promise<DepositListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/deposit/common/tx_list';
		const response = await fetch<DepositListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},

	// Old
	async getDepositCoinList(params: DepositCoinListParams): Promise<getDepositCoinListRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/deposit/common/coin_list';
		const response = await fetch<getDepositCoinListRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return response;
	},
	//
	async getDepositAddressRevoke(id: string): Promise<GetAddressRevokeRes> {
		const query = new URLSearchParams(
			Object.entries({ id })
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/deposit/crypto/address_revoke';
		const response = await fetch<GetAddressRevokeRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return response;
	},
	async getDepositAddressExtend(id: string): Promise<GetAddressRevokeRes> {
		const query = new URLSearchParams(
			Object.entries({ id })
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/deposit/crypto/address_extend';
		const response = await fetch<GetAddressRevokeRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return response;
	},
	async storeDepositClaim(dto: ClaimDto): Promise<CommonResponse> {
		const url = ` /v1/deposit/crypto/claim`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
});
