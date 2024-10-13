import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetAssetBoxParams, GetAssetListParams, GetAssetTotalParams, GetInternalReceiveParams, GetMiscellaneousListParams, GetPanelListParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetAssetListResponse, GetAssetTotalResponse, GetBoxRes, GetInternalReceiveListResponse, GetMiscellaneousListResponse, GetPortfolioRes } from '~/types/response/asset.types';

type AssetRepository = {
	getAssetList: (params: GetAssetListParams) => Promise<GetAssetListResponse>;
	getInternalReceiveList: (params: GetInternalReceiveParams) => Promise<GetInternalReceiveListResponse>;
	getMiscellaneousList: (params: GetMiscellaneousListParams) => Promise<GetMiscellaneousListResponse>;
	getAssetTotal: (params: GetAssetTotalParams) => Promise<GetAssetTotalResponse>;
	getSpotPanelList: (params: GetPanelListParams) => Promise<GetPortfolioRes>;
	getSpotBox: (params: GetAssetBoxParams) => Promise<GetBoxRes>;
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
	async getAssetTotal(params: GetAssetTotalParams): Promise<GetAssetTotalResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/box/asset_total';
		const response = await fetch<GetAssetTotalResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSpotPanelList(params: GetPanelListParams): Promise<GetPortfolioRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/spot/pnl_list';
		const response = await fetch<GetPortfolioRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getSpotBox(params: GetAssetBoxParams): Promise<GetBoxRes> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/box/brief';
		const response = await fetch<GetBoxRes>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
