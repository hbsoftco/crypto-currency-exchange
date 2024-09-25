import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetAssetListResponse } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';

type AssetRepository = {
	getAssetList: (params: GetAssetListResponse) => Promise<GetAssetListResponse>;
};

export const tradeRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): AssetRepository => ({
	async getAssetList(params: GetAssetListResponse): Promise<GetAssetListResponse> {
		const query = new URLSearchParams({
			statement: params.boxMode || '',
			assessmentCurrencyId: params.boxMode || '',
			assetType: params.boxMode || '',
			boxMode: params.boxMode || '',
			boxSortMode: params.boxSortMode || '',
			miniAssetMode: params.miniAssetMode || '',
			currencyIDs: params.currencyIDs || '',
			pageSize: params.pageSize || '',
			pageNumber: params.pageNumber || '',
		});

		const url = '/v1/asset/box/asset_list';
		const response = await fetch<GetAssetListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
		} as CustomNitroFetchOptions);

		return response;
	},
});
