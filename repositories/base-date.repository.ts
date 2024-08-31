import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetPinParams } from '~/types/base.types';
import type { PinListResponse } from '~/types/response/pin-list.types';
import type { Tag } from '~/types/tag.types';

type BaseDateRepository = {
	getTagList: () => Promise<Tag[]>;
	getPinList: (params: GetPinParams) => Promise<PinListResponse>;
};

export const baseDateRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): BaseDateRepository => ({
	async getTagList(): Promise<Tag[]> {
		return fetch<Tag[]>('/v1/currency/routine/tag_list');
	},
	async getPinList({ languageId, group = '' }: GetPinParams): Promise<PinListResponse> {
		const query = new URLSearchParams({ languageId: languageId.toString(), group });
		return fetch<PinListResponse>(`/v1/routine/decoration/pin_list?${query.toString()}`);
	},
});
