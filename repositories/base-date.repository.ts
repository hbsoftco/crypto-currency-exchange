import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetPinParams } from '~/types/base.types';
import type { PinListResponse } from '~/types/response/pin-list.types';
import type { GetTagParams, TagResponse } from '~/types/response/tag.types';

type BaseDateRepository = {
	getTagList: (params: GetTagParams) => Promise<TagResponse>;
	getPinList: (params: GetPinParams) => Promise<PinListResponse>;
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
});
