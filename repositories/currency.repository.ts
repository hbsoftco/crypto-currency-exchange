import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetCurrencyParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { CurrencyResponse, NetBlockchainListResponse } from '~/types/response/currency.types';

type CurrencyRepository = {
	getCurrencyDetail: (params: GetCurrencyParams) => Promise<CurrencyResponse>;
	getNetBlockchainList: () => Promise<NetBlockchainListResponse>;
};

export const currencyRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): CurrencyRepository => ({
	async getCurrencyDetail(params: GetCurrencyParams): Promise<CurrencyResponse> {
		const query = new URLSearchParams({
			id: params.id,
			languageId: params.languageId,
		});
		const url = '/v1/currency/routine/info';
		const response = await fetch<CurrencyResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getNetBlockchainList(): Promise<NetBlockchainListResponse> {
		const url = 'v1/currency/routine/net_blockchain_list';
		const response = await fetch<NetBlockchainListResponse>(`${url}`, {
			noAuth: true,
		} as CustomNitroFetchOptions);

		return response;
	},
});
