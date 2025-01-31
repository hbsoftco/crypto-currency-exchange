import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { CurrencyInfoParams, CurrencyResponse } from '~/types/definitions/currency.types';

type CurrencyRepository = {
	getCurrencyInfo: (params: CurrencyInfoParams) => Promise<CurrencyResponse>;
	getNetBlockchainList: () => Promise<CurrencyResponse>;
};

export const currencyRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): CurrencyRepository => ({
	async getCurrencyInfo(params: CurrencyInfoParams): Promise<CurrencyResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/currency/routine/info';
		const response = await fetch<CurrencyResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getNetBlockchainList(): Promise<CurrencyResponse> {
		const url = 'v1/currency/routine/net_blockchain_list';
		const response = await fetch<CurrencyResponse>(`${url}`, {
			noAuth: true,
		} as CustomNitroFetchOptions);

		return response;
	},
});
