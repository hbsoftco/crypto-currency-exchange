import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type {
	WithdrawCoinFeesParams,
	WithdrawCoinListParams,
	WithdrawCryptoRequestDto,
	WithdrawFiatRequestDto,
	WithdrawListResponse,
	WithdrawResponse,
	WithdrawTransactionsParams,
} from '~/types/definitions/withdraw.types';

type WithdrawRepository = {
	getWithdrawCoinFees: (params: WithdrawCoinFeesParams) => Promise<WithdrawListResponse>;
	getWithdrawTransactions: (params: WithdrawTransactionsParams) => Promise<WithdrawListResponse>;
	getWithdrawCryptoNetworks: () => Promise<WithdrawListResponse>;
	getWithdrawFiatNetworks: () => Promise<WithdrawListResponse>;
	getWithdrawCoinList: (params: WithdrawCoinListParams) => Promise<WithdrawListResponse>;
	storeWithdrawFiatRequest: (dto: WithdrawFiatRequestDto) => Promise<WithdrawResponse>;
	storeWithdrawCryptoRequest: (dto: WithdrawCryptoRequestDto) => Promise<WithdrawResponse>;

};

export const withdrawRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): WithdrawRepository => ({
	async getWithdrawCoinFees(params: WithdrawCoinFeesParams): Promise<WithdrawListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/withdraw/crypto/coin_agg_list';
		const response = await fetch<WithdrawListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return response;
	},
	async getWithdrawTransactions(params: WithdrawTransactionsParams): Promise<WithdrawListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/withdraw/common/tx_list';
		const response = await fetch<WithdrawListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getWithdrawCryptoNetworks(): Promise<WithdrawListResponse> {
		const url = '/v1/withdraw/crypto/requestable_list';
		const response = await fetch<WithdrawListResponse>(`${url}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getWithdrawFiatNetworks(): Promise<WithdrawListResponse> {
		const url = '/v1/withdraw/fiat/requestable_list';
		const response = await fetch<WithdrawListResponse>(`${url}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getWithdrawCoinList(params: WithdrawCoinListParams): Promise<WithdrawListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/withdraw/common/coin_list';
		const response = await fetch<WithdrawListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return response;
	},
	async storeWithdrawFiatRequest(dto: WithdrawFiatRequestDto): Promise<WithdrawResponse> {
		const url = `/v1/withdraw/fiat/request_out`;
		const response = await fetch<WithdrawResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async storeWithdrawCryptoRequest(dto: WithdrawCryptoRequestDto): Promise<WithdrawResponse> {
		const url = `/v1/withdraw/crypto/request_out`;
		const response = await fetch<WithdrawResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
});
