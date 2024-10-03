import { defineStore } from 'pinia';

export const useSettingsStore = defineStore(' settings', () => {
	const isOpenSidebarSettingsSpot = ref<boolean>(false);

	// Actions
	const toggleSidebarSettingsSpot = (value: boolean) => {
		isOpenSidebarSettingsSpot.value = value;
	};

	return {
		// States
		isOpenSidebarSettingsSpot,

		// Actions
		toggleSidebarSettingsSpot,
	};
});
