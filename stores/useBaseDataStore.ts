import { defineStore } from 'pinia';

import { sliderRepository } from '~/repositories/slider.repository';
import { Language } from '~/utils/enums/language.enum';
import type { SliderItem } from '~/types/response/slider.types';
import type { PinListRow } from '~/types/response/pin-list.types';
import { baseDateRepository } from '~/repositories/base-date.repository';
import type { Tag } from '~/types/response/tag.types';
import type { QuoteListResponse } from '~/types/response/quote-list.types';
import type { BriefItem } from '~/types/response/brief-list.types';

export const useBaseDataStore = defineStore('baseData', () => {
	const { $api } = useNuxtApp();

	const slides = ref<SliderItem[]>([]);
	const isSliderDataFetched = ref(false);

	const fetchSlides = async () => {
		if (isSliderDataFetched.value) return;

		const slider = sliderRepository($api);

		try {
			const response = await slider.getSlides({ languageId: Language.PERSIAN, group: 'Home_Slider' });
			if (response.result?.rows) {
				slides.value = response.result.rows.map((row) => ({
					mediaUrl: row.mediaUrl,
					header: row.info[0]?.header || '',
				}));
				isSliderDataFetched.value = true;
			}
		}
		catch (error) {
			throw Error(String(error));
		}
	};

	const tagItems = ref<Tag[]>([]);
	const isTagDataFetched = ref(false);

	const fetchTagItems = async () => {
		if (isTagDataFetched.value) return;

		const api = baseDateRepository($api);

		try {
			const response = await api.getTagList({ languageId: Language.PERSIAN });
			if (response.result) {
				tagItems.value = response.result;
				isTagDataFetched.value = true;
			}
		}
		catch (error) {
			throw Error(String(error));
		}
	};

	const pinItems = ref<PinListRow[]>([]);
	const isPinDataFetched = ref(false);

	const fetchPinItems = async () => {
		if (isPinDataFetched.value) return;

		const api = baseDateRepository($api);

		try {
			const response = await api.getPinList({ languageId: Language.PERSIAN, group: 'Home_Pinbar' });
			if (response.result?.rows) {
				pinItems.value = response.result.rows;
				isPinDataFetched.value = true;
			}
		}
		catch (error) {
			throw Error(String(error));
		}
	};

	const quoteItems = ref<QuoteListResponse['result']>([]);
	const isQuoteDataFetched = ref(false);

	const fetchQuoteItems = async (marketTypeId: number) => {
		if (isQuoteDataFetched.value) return;

		const api = baseDateRepository($api);

		try {
			const response = await api.getQuoteList({ marketTypeId });
			if (response.result) {
				quoteItems.value = response.result;
				isQuoteDataFetched.value = true;
			}
		}
		catch (error) {
			throw Error(String(error));
		}
	};

	const briefItems = ref<BriefItem[]>([]);
	const isBriefDataFetched = ref(false);

	const fetchBriefItems = async () => {
		if (isBriefDataFetched.value) return;

		const api = baseDateRepository($api);

		try {
			const response = await api.getBriefList();
			if (response.result) {
				briefItems.value = response.result;
				isBriefDataFetched.value = true;
			}
		}
		catch (error) {
			throw Error(String(error));
		}
	};

	return {
		slides, fetchSlides,
		pinItems, fetchPinItems,
		tagItems, fetchTagItems,
		quoteItems, fetchQuoteItems,
		briefItems, fetchBriefItems,
	};
});
