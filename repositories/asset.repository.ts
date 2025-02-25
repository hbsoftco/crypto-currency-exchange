import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetInternalReceiveParams } from '~/types/base.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { GetAssetListResponse, GetInternalReceiveListResponse } from '~/types/response/asset.types';
import type {
	AssetBoxBriefParams,
	AssetInOutTotalParams,
	AssetInterBoxOptionsParams,
	AssetListParams,
	AssetListResponse,
	AssetRecentListParams,
	AssetResponse,
	AssetSpotPnlAggListParams,
	AssetSpotPnlListParams,
	AssetSpotPnlTotalParams,
	AssetTotalParams,
	MiscellaneousListParams,
	TransferBalanceDto,
} from '~/types/definitions/asset.types';
import type { CommonResponse } from '~/types/definitions/common.types';

type AssetRepository = {
	getAssetList: (params: AssetListParams) => Promise<AssetListResponse>;
	getAssetTotal: (params: AssetTotalParams) => Promise<AssetResponse>;
	getAssetBoxBrief: (params: AssetBoxBriefParams) => Promise<AssetResponse>;
	getAssetRecentList: (params: AssetRecentListParams) => Promise<AssetListResponse>;
	getAssetSpotPnlTotal: (params: AssetSpotPnlTotalParams) => Promise<AssetResponse>;
	getAssetInOutTotal: (params: AssetInOutTotalParams) => Promise<AssetResponse>;
	getAssetSpotPnlAggList: (params: AssetSpotPnlAggListParams) => Promise<AssetListResponse>;
	getAssetSpotPnlList: (params: AssetSpotPnlListParams) => Promise<AssetListResponse>;
	getMiscellaneousList: (params: MiscellaneousListParams) => Promise<AssetListResponse>;
	getAssetInterBoxOptions: (params: AssetInterBoxOptionsParams) => Promise<AssetResponse>;
	transferBalance: (dto: TransferBalanceDto) => Promise<CommonResponse>;
	//
	getInternalReceiveList: (params: GetInternalReceiveParams) => Promise<GetInternalReceiveListResponse>;
};

export const assetRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): AssetRepository => ({
	async getAssetList(params: AssetListParams): Promise<AssetListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/box/asset_list';
		const response = await fetch<GetAssetListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getAssetTotal(params: AssetTotalParams): Promise<AssetResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/box/asset_total';
		const response = await fetch<AssetResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getAssetBoxBrief(params: AssetBoxBriefParams): Promise<AssetResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/box/brief';
		const response = await fetch<AssetResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getAssetRecentList(params: AssetRecentListParams): Promise<AssetListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/common/tx_recent_list';
		const response = await fetch<AssetListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getAssetSpotPnlTotal(params: AssetSpotPnlTotalParams): Promise<AssetResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/spot/pnl_total';
		const response = await fetch<AssetResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getAssetInOutTotal(params: AssetInOutTotalParams): Promise<AssetResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/common/inout_total';
		const response = await fetch<AssetResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getAssetSpotPnlAggList(params: AssetSpotPnlAggListParams): Promise<AssetListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/spot/pnl_agg_list';
		const response = await fetch<AssetListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getAssetSpotPnlList(params: AssetSpotPnlListParams): Promise<AssetListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/spot/pnl_list';
		const response = await fetch<AssetListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getMiscellaneousList(params: MiscellaneousListParams): Promise<AssetListResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/common/miscellaneous_list';
		const response = await fetch<AssetListResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async getAssetInterBoxOptions(params: AssetInterBoxOptionsParams): Promise<AssetResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/asset/interbox/options_list';
		const response = await fetch<AssetResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async transferBalance(dto: TransferBalanceDto): Promise<CommonResponse> {
		const url = `/v1/asset/interbox/transfer`;
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},

	// OLD
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
});
