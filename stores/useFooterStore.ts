import { defineStore } from 'pinia';

import { decorationRepository } from '~/repositories/decoration.repository';
import type { GetRootListParams } from '~/types/base.types';
import type { LinkListResult } from '~/types/response/decoration.types';
import { CACHE_KEY_FOOTER_ITEMS } from '~/utils/constants/common';
import { Language } from '~/utils/enums/language.enum';

export const useFooterStore = defineStore('footer', () => {
	const linkList = ref<LinkListResult>();
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
			const cachedData: LinkListResult | null = await loadFromCache(CACHE_KEY_FOOTER_ITEMS) || null;
			if (cachedData) {
				footerFetched.value = true;
				return;
			}
			const response = await decorationRepo.getLinkList(RootListParams.value);

			if (response.result) {
				linkList.value = response.result;
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
		linkList,
	};
});
