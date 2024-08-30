import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { SliderResponse } from '~/types/response/slider.types';

type SliderRepository = {
	getSlides: () => Promise<SliderResponse>;
};

export const sliderRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): SliderRepository => ({
	async getSlides(): Promise<SliderResponse> {
		return fetch<SliderResponse>('/v1/routine/decoration/card_list');
	},
});
