import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetLanguageParams, GetPinParams } from '~/types/base.types';
import type { MarketBriefListResponse, CurrencyBriefListResponse } from '~/types/response/brief-list.types';
import type { IconResponse } from '~/types/response/icon.types';
import type { PinListResponse } from '~/types/response/pin-list.types';
import type { GetQuoteParams, QuoteListResponse } from '~/types/response/quote-list.types';
import type { TagResponse } from '~/types/response/tag.types';

type BaseDateRepository = {
	getTagList: (params: GetLanguageParams) => Promise<TagResponse>;
	getPinList: (params: GetPinParams) => Promise<PinListResponse>;
	getQuoteList: (params: GetQuoteParams) => Promise<QuoteListResponse>;
	getMarketBriefList: () => Promise<MarketBriefListResponse>;
	getCurrencyBriefList: (params: GetLanguageParams) => Promise<CurrencyBriefListResponse>;
	getBigIconsList: () => Promise<IconResponse>;
	getIconsList: () => Promise<IconResponse>;
};

export const baseDateRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): BaseDateRepository => ({
	async getTagList({ languageId }: GetLanguageParams): Promise<TagResponse> {
		const query = new URLSearchParams({ languageId: languageId.toString() });
		return fetch<TagResponse>(`/v1/currency/routine/tag_list?${query.toString()}`);
	},
	async getPinList({ languageId, group = '' }: GetPinParams): Promise<PinListResponse> {
		const query = new URLSearchParams({ languageId: languageId.toString(), group });
		return fetch<PinListResponse>(`/v1/routine/decoration/pin_list?${query.toString()}`);
	},
	async getQuoteList({ marketTypeId }: GetQuoteParams): Promise<QuoteListResponse> {
		const query = new URLSearchParams({ marketTypeId: String(marketTypeId) });
		return fetch<QuoteListResponse>(`/v1/market/routine/quote_list?${query.toString()}`,
		);
	},
	async getMarketBriefList(): Promise<MarketBriefListResponse> {
		return fetch<MarketBriefListResponse>(`/v1/market/routine/brief_list`);
	},
	async getCurrencyBriefList({ languageId }: GetLanguageParams): Promise<CurrencyBriefListResponse> {
		const query = new URLSearchParams({ languageId: languageId.toString() });
		return fetch<CurrencyBriefListResponse>(`/v1/currency/routine/brief_list?${query.toString()}`);
	},
	async getBigIconsList(): Promise<IconResponse> {
		return fetch<IconResponse>(`/v1/currency/routine/icons_coingecko`);
	},
	async getIconsList(): Promise<IconResponse> {
		return fetch<IconResponse>(`/v1/currency/routine/icons_cmc`);
	},
});
