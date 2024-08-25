<template>
	<div>
		<div
			class="flex group relative items-center space-x-2 mr-6"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<IconSetting
				class="text-2xl hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark"
			/>
		</div>
		<div
			v-if="hover"
			class="absolute left-10 p-4 opacity-100 transition-opacity duration-200 z-10"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<div class="w-56 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4">
				<ul class="flex flex-col space-y-2">
					<li class="flex justify-between">
						<p class="text-base font-bold">
							{{ $t("theme") }}
						</p>
						<UiThemeToggleSwitch />
					</li>

					<li>
						<p class="text-base font-bold">
							{{ $t("displayNumbers") }}
						</p>
						<UiLangToggle />
					</li>

					<li @click="toggleLanguageMenu">
						<p class="text-base font-bold">
							{{ $t("language") }}
						</p>
						<p>{{ selectedLanguage }}</p>
						<div
							v-if="showLanguageOptions"
							class="mt-2 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-2"
						>
							<ul class="space-y-2">
								<li
									v-for="language in languages"
									:key="language.code"
									class="cursor-pointer hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark"
									@click="changeLanguage(language)"
								>
									{{ language.name }}
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

import IconSetting from '~/assets/svg-icons/menu/setting.svg';

const hover = ref(false);
let timeout = null;

const showMenu = () => {
	if (timeout) clearTimeout(timeout);
	hover.value = true;
};

const hideMenu = () => {
	timeout = setTimeout(() => {
		hover.value = false;
	}, 300);
};

const selectedLanguage = ref('English');
const showLanguageOptions = ref(false);
const languages = ref([
	{ code: 'en', name: 'English' },
	{ code: 'fa', name: 'فارسی' },
	{ code: 'ar', name: 'العربية' },
	{ code: 'fr', name: 'Français' },
]);

const toggleLanguageMenu = () => {
	showLanguageOptions.value = !showLanguageOptions.value;
};

const changeLanguage = (language) => {
	selectedLanguage.value = language.name;
	showLanguageOptions.value = false;
};
</script>
