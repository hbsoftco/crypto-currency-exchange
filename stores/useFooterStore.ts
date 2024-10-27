import { defineStore } from 'pinia';

import { decorationRepository } from '~/repositories/decoration.repository';
import type { GetRootListParams } from '~/types/base.types';
import type { Section } from '~/types/response/decoration.types';
import { CACHE_KEY_FOOTER_ITEMS } from '~/utils/constants/common';
import { Language } from '~/utils/enums/language.enum';

export const useFooterStore = defineStore('footer', () => {
	const sectionList = ref<Section[]>();
	const footerFetched = ref(false);
	const footerLoading = ref<boolean>(false);
	const RootListParams = ref<GetRootListParams>({
		languageId: String(Language.PERSIAN),
		group: 'Footer',
	});

	const fetchFooter = async () => {
		if (footerFetched.value || footerLoading.value) return;

		const { $api } = useNuxtApp();
		const decorationRepo = decorationRepository($api);

		footerLoading.value = true;

		try {
			const cachedData: Section[] = await loadFromCache(CACHE_KEY_FOOTER_ITEMS) || [];

			if (cachedData.length) {
				footerFetched.value = true;
				return;
			}
			const response = await decorationRepo.getLinkList(RootListParams.value);

			if (response.result) {
				sectionList.value = response.result.sections;

				for (const section of sectionList.value) {
					section.links = response.result.links.filter((link) => link.sectionId === section.id);
				}
				footerFetched.value = true;

				await saveToCache(CACHE_KEY_FOOTER_ITEMS, response.result);
			}
		}
		catch (error) {
			throw Error(String(error));
		}
		finally {
			footerLoading.value = false;
		}
	};

	return {
		fetchFooter,
		sectionList,
	};
});
