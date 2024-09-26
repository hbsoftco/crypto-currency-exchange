import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetAssetListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetAssetListResponse } from '~/types/response/asset.types';

type AssetRepository = {
	getAssetList: (params: GetAssetListParams) => Promise<GetAssetListResponse>;
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
		} as CustomNitroFetchOptions);

		return response;
	},
});
