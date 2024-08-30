import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { Tag } from '~/types/tag.types';

type BaseDateRepository = {
	getTagList: () => Promise<Tag[]>;
};

export const baseDateRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): BaseDateRepository => ({
	async getTagList(): Promise<Tag[]> {
		return fetch<Tag[]>('/v1/currency/routine/tag_list');
	},
});
