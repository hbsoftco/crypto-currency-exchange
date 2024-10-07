import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetAssetListParams, GetInternalReceiveParams, GetMiscellaneousListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetAssetListResponse, GetInternalReceiveListResponse, GetMiscellaneousListResponse } from '~/types/response/asset.types';

type AssetRepository = {
	getAssetList: (params: GetAssetListParams) => Promise<GetAssetListResponse>;
	getInternalReceiveList: (params: GetInternalReceiveParams) => Promise<GetInternalReceiveListResponse>;
	getMiscellaneousList: (params: GetMiscellaneousListParams) => Promise<GetMiscellaneousListResponse>;
};

export const assetRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): AssetRepository => ({
	async getAssetList(params: GetAssetListParams): Promise<GetAssetListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/box/asset_list';
		const response = await fetch<GetAssetListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getInternalReceiveList(params: GetInternalReceiveParams): Promise<GetInternalReceiveListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/common/internal_send_receive_list';
		const response = await fetch<GetInternalReceiveListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMiscellaneousList(params: GetMiscellaneousListParams): Promise<GetMiscellaneousListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/common/miscellaneous_list';
		const response = await fetch<GetMiscellaneousListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
