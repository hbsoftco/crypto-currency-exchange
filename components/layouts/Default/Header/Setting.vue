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
					<li
						class="flex justify-between pb-2 hover:bg-hover2-light dark:hover:bg-hover2-dark border-b-primary-gray-light dark:border-b-primary-gray-dark border-b-[1px]"
					>
						<p class="text-base font-bold">
							{{ $t("theme") }}
						</p>
						<UiThemeToggleSwitch />
					</li>

					<li
						class="flex justify-between hover:bg-hover2-light dark:hover:bg-hover2-dark pb-2 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
					>
						<p class="text-base font-bold">
							{{ $t("displayNumbers") }}
						</p>
						<UiLangToggle />
					</li>

					<li
						class="relative flex justify-between hover:bg-hover2-light dark:hover:bg-hover2-dark"
						@click="toggleLanguageMenu"
					>
						<div>
							<p class="text-base font-bold">
								{{ $t("language") }}
							</p>
							<p
								class="text-sm text-subtle-text-light dark:text-subtle-text-dark"
							>
								{{ selectedLanguage }}
							</p>
						</div>

						<IconArrowLeft />
					</li>
					<div
						v-if="showLanguageOptions"
						class="mt-2 w-52 absolute -right-48 top-0 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4"
					>
						<ul class="space-y-2">
							<li
								v-for="language in languages"
								:key="language.code"
								class="text-base font-medium pb-1 cursor-pointer hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								@click="changeLanguage(language)"
							>
								{{ language.name }}
							</li>
						</ul>
					</div>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

import IconSetting from '~/assets/svg-icons/menu/setting.svg';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';

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
	{ code: 'fa', name: 'فارسی' },
	{ code: 'en', name: 'انگلیسی' },
	{ code: 'ar', name: 'عربی' },
	{ code: 'fr', name: 'فرانسه' },
]);

const toggleLanguageMenu = () => {
	showLanguageOptions.value = !showLanguageOptions.value;
};

const changeLanguage = (language) => {
	selectedLanguage.value = language.name;
	showLanguageOptions.value = false;
};
</script>
