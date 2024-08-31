import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { GetSlidesParams, SliderResponse } from '~/types/response/slider.types';

type SliderRepository = {
	getSlides: (params: GetSlidesParams) => Promise<SliderResponse>;
};

export const sliderRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): SliderRepository => ({
	async getSlides({ languageId, group = '' }: GetSlidesParams): Promise<SliderResponse> {
		const query = new URLSearchParams({ languageId: languageId.toString(), group });
		return fetch<SliderResponse>(`/v1/routine/decoration/card_list?${query.toString()}`);
	},
});
