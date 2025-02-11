import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type {
	DepositClaimDto,
	DepositCoinFeesParams,
	DepositCoinListParams,
	DepositCryptoAddressParams,
	DepositListResponse,
	DepositTransactionsParams,
	RevokeDepositAddressParams,
} from '~/types/definitions/deposit.types';
import type { CommonResponse } from '~/types/definitions/common.types';

type DepositRepository = {
	getDepositCoinFees: (params: DepositCoinFeesParams) => Promise<DepositListResponse>;
	getDepositCryptoAddress: (params: DepositCryptoAddressParams) => Promise<DepositListResponse>;
	getDepositTransactions: (params: DepositTransactionsParams) => Promise<DepositListResponse>;
	storeDepositClaim: (dto: DepositClaimDto) => Promise<CommonResponse>;
	revokeDepositAddress: (params: RevokeDepositAddressParams) => Promise<DepositListResponse>;
	extendDepositAddress: (params: RevokeDepositAddressParams) => Promise<DepositListResponse>;
	getDepositCoinList: (params: DepositCoinListParams) => Promise<DepositListResponse>;
	getDepositCryptoNetworks: () => Promise<DepositListResponse>;
	getDepositFiatNetworks: () => Promise<DepositListResponse>;
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
	async storeDepositClaim(dto: DepositClaimDto): Promise<CommonResponse> {
		const url = `/v1/deposit/crypto/claim`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async revokeDepositAddress(params: RevokeDepositAddressParams): Promise<DepositListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/deposit/crypto/address_revoke';
		const response = await fetch<DepositListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return response;
	},
	async extendDepositAddress(params: RevokeDepositAddressParams): Promise<DepositListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/deposit/crypto/address_extend';
		const response = await fetch<DepositListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return response;
	},
	async getDepositCoinList(params: DepositCoinListParams): Promise<DepositListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/deposit/common/coin_list';
		const response = await fetch<DepositListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return response;
	},
	async getDepositCryptoNetworks(): Promise<DepositListResponse> {
		const url = '/v1/deposit/crypto/requestable_list';
		const response = await fetch<DepositListResponse>(`${url}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getDepositFiatNetworks(): Promise<DepositListResponse> {
		const url = '/v1/deposit/fiat/requestable_list';
		const response = await fetch<DepositListResponse>(`${url}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
