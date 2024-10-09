import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetDepositAddressParams, GetDepositParams } from '~/types/base.types';
import type { DepositResult, GetAddressListResponse } from '~/types/response/deposit.types';

type DepositRepository = {
	getDeposit: (params: GetDepositParams) => Promise<DepositResult>;
	getDepositAddress: (params: GetDepositAddressParams) => Promise<GetAddressListResponse>;
};

export const depositRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): DepositRepository => ({
	async getDeposit(params: GetDepositParams): Promise<DepositResult> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/deposit/common/tx_list';
		const response = await fetch<DepositResult>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
			queryParams: params,
		} as CustomNitroFetchOptions);

		return response;
	},
	async getDepositAddress(params: GetDepositAddressParams): Promise<GetAddressListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/deposit/crypto/address_list';
		const response = await fetch<GetAddressListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			method: 'GET',
			queryParams: params,
		} as CustomNitroFetchOptions);

		return response;
	},
});
