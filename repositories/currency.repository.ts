import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { Tag } from '~/types/tag.types';

type CurrencyRepository = {
	getTagList: () => Promise<Tag[]>;
};

export const currencyRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): CurrencyRepository => ({
	async getTagList(): Promise<Tag[]> {
		return fetch<Tag[]>('/v1/currency/routine/tag_list');
	},
});
