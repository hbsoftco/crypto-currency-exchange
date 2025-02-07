import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetWithdrawParams, WithdrawCoinListParams } from '~/types/base.types';
import type { GetCurrencyInfoResponse, getWithdrawCoinListRes, GetWithdrawResponse } from '~/types/response/withdraw.type';
import type {
	WithdrawCoinFeesParams,
	WithdrawListResponse,
	WithdrawTransactionsParams,
} from '~/types/definitions/withdraw.types';

type WithdrawRepository = {
	getWithdrawCoinFees: (params: WithdrawCoinFeesParams) => Promise<WithdrawListResponse>;
	getWithdrawTransactions: (params: WithdrawTransactionsParams) => Promise<WithdrawListResponse>;
	// Old
	getWithdraw: (params: GetWithdrawParams) => Promise<GetWithdrawResponse>;
	getWithdrawCoinList: (params: WithdrawCoinListParams) => Promise<getWithdrawCoinListRes>;
	getCryptoRequestableList: () => Promise<GetCurrencyInfoResponse>;
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

	// Old
	async getWithdraw(params: GetWithdrawParams): Promise<GetWithdrawResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/withdraw/common/tx_list';
		const response = await fetch<GetWithdrawResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
			queryParams: params,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getWithdrawCoinList(params: WithdrawCoinListParams): Promise<getWithdrawCoinListRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/withdraw/common/coin_list';
		const response = await fetch<getWithdrawCoinListRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);
		return response;
	},
	async getCryptoRequestableList(): Promise<GetCurrencyInfoResponse> {
		const url = '/v1/withdraw/crypto/requestable_list';
		const response = await fetch<GetCurrencyInfoResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
