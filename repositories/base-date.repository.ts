import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetPinParams } from '~/types/base.types';
import type { BriefListResponse } from '~/types/response/brief-list.types';
import type { PinListResponse } from '~/types/response/pin-list.types';
import type { GetQuoteParams, QuoteListResponse } from '~/types/response/quote-list.types';
import type { GetTagParams, TagResponse } from '~/types/response/tag.types';

type BaseDateRepository = {
	getTagList: (params: GetTagParams) => Promise<TagResponse>;
	getPinList: (params: GetPinParams) => Promise<PinListResponse>;
	getQuoteList: (params: GetQuoteParams) => Promise<QuoteListResponse>;
	getBriefList: () => Promise<BriefListResponse>;
};

export const baseDateRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): BaseDateRepository => ({
	async getTagList({ languageId }: GetTagParams): Promise<TagResponse> {
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
	async getBriefList(): Promise<BriefListResponse> {
		return fetch<BriefListResponse>(`/v1/market/routine/brief_list`);
	},
});
