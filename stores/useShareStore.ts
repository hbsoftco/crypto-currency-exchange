import { defineStore } from 'pinia';

import { systemRepository } from '~/repositories/system.repository';
import type { Pin } from '~/types/definitions/system.types';
import { Language } from '~/utils/enums/language.enum';

export const useShareStore = defineStore('share', () => {
	const { $api } = useNuxtApp();
	const systemRepo = systemRepository($api);

	const pinUp = ref<Pin>();
	const pinDown = ref<Pin>();
	const pinItems = ref<Pin[]>([]);
	const pinLoading = ref<boolean>(false);
	const fetchPinItems = async () => {
		if (pinLoading.value || !pinItems.value.length) return;
		pinLoading.value = true;

		try {
			const { result } = await systemRepo.getSystemPinList({
				languageId: String(Language.PERSIAN),
				group: 'Home_Pinbar',
			});
			if (result.rows.length) {
				pinItems.value = result.rows as Pin[];

				pinDown.value = pinItems.value.find((pin) => pin.tag === 'down');
				pinUp.value = pinItems.value.find((pin) => pin.tag === 'up');
			}
		}
		catch (error) {
			console.log(error);
		}
		finally {
			pinLoading.value = false;
		}
	};

	return {
		fetchPinItems,
		pinUp,
		pinDown,
		pinLoading,
	};
});
