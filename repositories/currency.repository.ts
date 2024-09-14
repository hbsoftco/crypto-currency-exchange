import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetCurrencyParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { CurrencyResponse } from '~/types/response/currency.types';

type CurrencyRepository = {
	getCurrencyDetail: (params: GetCurrencyParams) => Promise<CurrencyResponse>;
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
});
