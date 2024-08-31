import { defineStore } from 'pinia';

import { sliderRepository } from '~/repositories/slider.repository';
import { Language } from '~/utils/enums/language.enum';
import type { SliderItem } from '~/types/response/slider.types';

export const useBaseDataStore = defineStore('baseData', () => {
	const slides = ref<SliderItem[]>([]);
	const isFetched = ref(false);

	const fetchSlides = async () => {
		if (isFetched.value) return;

		const { $api } = useNuxtApp();
		const slider = sliderRepository($api);

		try {
			const response = await slider.getSlides({ languageId: Language.PERSIAN, group: 'Home_Slider' });
			if (response.result?.rows) {
				slides.value = response.result.rows.map((row) => ({
					mediaUrl: row.mediaUrl,
					header: row.info[0]?.header || '',
				}));
				isFetched.value = true;
			}
		}
		catch (error) {
			throw Error(String(error));
		}
	};

	return { slides, fetchSlides };
});
