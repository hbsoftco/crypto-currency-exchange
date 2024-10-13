import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetDepositAddressParams, GetDepositParams } from '~/types/base.types';
import type { DepositResult, GetAddressListResponse, GetAddressRevokeRes } from '~/types/response/deposit.types';
import type { ClaimDto } from '~/types/dto/deposit.dto';
import type { CommonRes } from '~/types/response/common.types';

type DepositRepository = {
	getDeposit: (params: GetDepositParams) => Promise<DepositResult>;
	getDepositAddress: (params: GetDepositAddressParams) => Promise<GetAddressListResponse>;
	getDepositAddressRevoke: (id: string) => Promise<GetAddressRevokeRes>;
	getDepositAddressExtend: (id: string) => Promise<GetAddressRevokeRes>;
	storeDepositClaim: (dto: ClaimDto) => Promise<CommonRes>;

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
	async storeDepositClaim(dto: ClaimDto): Promise<CommonRes> {
		const url = ` /v1/deposit/crypto/claim`;
		const response = await fetch<CommonRes>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
});
