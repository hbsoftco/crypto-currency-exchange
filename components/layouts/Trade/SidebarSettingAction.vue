<template>
	<div>
		<div
			class="flex group relative items-center space-x-2 mr-6"
		>
			<div
				class="cursor-pointer"
				@click="toggleSidebar"
			>
				<IconSetting
					class="text-2xl block group-hover:hidden group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
				<IconSettingFill
					class="text-2xl hidden group-hover:block text-primary-yellow-light dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconSetting from '~/assets/svg-icons/menu/setting.svg';
import IconSettingFill from '~/assets/svg-icons/menu/setting-fill.svg';

const settingsStore = useSettingsStore();

const toggleSidebar = () => {
	settingsStore.toggleSidebarSettingsSpot(!settingsStore.isOpenSidebarSettingsSpot);
};
</script>
