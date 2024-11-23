import { defineStore } from 'pinia';

import { decorationRepository } from '~/repositories/decoration.repository';
import type { BaseLangGroupParams } from '~/types/definitions/common.types';
import type { FooterLinkSection } from '~/types/response/decoration.types';
import { Language } from '~/utils/enums/language.enum';

export const useFooterStore = defineStore('footer', () => {
	const footerLinkSection = ref<FooterLinkSection[]>();
	const footerFetched = ref(false);
	const footerLoading = ref<boolean>(false);
	const footerParams = ref<BaseLangGroupParams>({
		languageId: String(Language.PERSIAN),
		group: 'Footer',
	});

	const fetchFooter = async () => {
		if (footerFetched.value || footerLoading.value) return;
		footerLoading.value = true;

		try {
			const { $api } = useNuxtApp();
			const decorationRepo = decorationRepository($api);
			const { result } = await decorationRepo.getLinkList(footerParams.value);
			if (result) {
				const items = await result.sections.map((section) => {
					return {
						id: section.id,
						title: section.info[0].title,
						links: result.links.filter((link) => link.sectionId === section.id),
					};
				});

				footerLinkSection.value = items;
				footerFetched.value = true;
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
		footerLinkSection,
		footerLoading,
	};
});
