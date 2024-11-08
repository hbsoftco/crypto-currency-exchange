import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetLanguageParams, GetTagListParams } from '~/types/base.types';
import type { MarketBriefListResponse, CurrencyBriefListResponse } from '~/types/response/brief-list.types';
import type { IconResponse } from '~/types/response/icon.types';
import type { GetQuoteParams, QuoteListResponse } from '~/types/response/quote-list.types';
import type { TagResponse } from '~/types/response/tag.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { TagMenuResponse } from '~/types/response/tag-menu.types';

type BaseDateRepository = {
	getTagList: (params: GetLanguageParams) => Promise<TagResponse>;
	getQuoteList: (params: GetQuoteParams) => Promise<QuoteListResponse>;
	getMarketBriefList: () => Promise<MarketBriefListResponse>;
	getCurrencyBriefList: (params: GetLanguageParams) => Promise<CurrencyBriefListResponse>;
	getBigIconsList: () => Promise<IconResponse>;
	getIconsList: () => Promise<IconResponse>;
	getTagMenuList: (params: GetTagListParams) => Promise<TagMenuResponse>;

};

export const baseDateRepository = (
	fetch: $Fetch<unknown, NitroFetchRequest>,
): BaseDateRepository => ({
	async getTagList({ languageId }: GetLanguageParams): Promise<TagResponse> {
		const query = new URLSearchParams({ languageId: languageId.toString() });
		return fetch<TagResponse>(
      `/v1/currency/routine/tag_list?${query.toString()}`,
      { noAuth: true } as CustomNitroFetchOptions,
		);
	},
	async getQuoteList({ marketTypeId }: GetQuoteParams): Promise<QuoteListResponse> {
		const query = new URLSearchParams({ marketTypeId: String(marketTypeId) });
		return fetch<QuoteListResponse>(
      `/v1/market/routine/quote_list?${query.toString()}`,
      { noAuth: true } as CustomNitroFetchOptions,
		);
	},
	async getMarketBriefList(): Promise<MarketBriefListResponse> {
		return fetch<MarketBriefListResponse>(
      `/v1/market/routine/brief_list`,
      { noAuth: true } as CustomNitroFetchOptions,
		);
	},
	async getCurrencyBriefList({ languageId }: GetLanguageParams): Promise<CurrencyBriefListResponse> {
		const query = new URLSearchParams({ languageId: languageId.toString() });
		return fetch<CurrencyBriefListResponse>(
      `/v1/currency/routine/brief_list?${query.toString()}`,
      { noAuth: true } as CustomNitroFetchOptions,
		);
	},
	async getBigIconsList(): Promise<IconResponse> {
		return fetch<IconResponse>(
      `/v1/currency/routine/icons_coingecko`,
      { noAuth: true } as CustomNitroFetchOptions,
		);
	},
	async getIconsList(): Promise<IconResponse> {
		return fetch<IconResponse>(
      `/v1/currency/routine/icons_cmc`,
      { noAuth: true } as CustomNitroFetchOptions,
		);
	},
	async getTagMenuList(params: GetTagListParams): Promise<TagMenuResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/routine/common/tag_list';
		const response = await fetch<TagMenuResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);
		return response;
	},
});
