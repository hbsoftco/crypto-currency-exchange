<template>
	<div
		class="flex flex-col items-center space-y-4"
		:dir="direction"
	>
		<div
			:class="[
				'flex items-center w-11 h-6 p-0.5 bg-secondary-gray-light dark:bg-secondary-gray-dark rounded-full cursor-pointer transition-colors relative',
			]"
			@click="toggleSwitch"
		>
			<span
				v-if="!isToggled"
				class="absolute ltr:right-1 rtl:left-1 text-[0.7rem] text-subtle-text-50 font-bold pl-0.5"
			>
				FA
			</span>
			<span
				v-if="isToggled"
				class="absolute ltr:left-1 rtl:right-1 text-[0.7rem] text-subtle-text-50 font-bold"
			>
				EN
			</span>
			<span
				:class="[
					'text-[0.7rem]',
					'w-5 h-5 font-bold text-gray-400 dark:text-primary-yellow-dark bg-white dark:bg-primary-gray-dark rounded-full shadow-md transform transition-transform flex items-center justify-center',
					isToggled ? (direction === 'rtl' ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0',
				]"
			>
				<slot>{{ isToggled ? 'FA' : 'EN' }}</slot>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
const { setLanguage, getLanguage } = useChangeNumber();

const isToggled = ref(false);
const direction = ref('rtl');

const toggleSwitch = () => {
	isToggled.value = !isToggled.value;
	setLanguage(isToggled.value ? 'fa' : 'en');
	applyFontFeature(getLanguage());
};

const applyFontFeature = (languageCode: string) => {
	const body = document.body;
	if (languageCode === 'fa') {
		body.style.fontFeatureSettings = '"ss03"';
	}
	else {
		body.style.fontFeatureSettings = '';
	}
};

onMounted(() => {
	isToggled.value = getLanguage() === 'fa';
	applyFontFeature(getLanguage());
});
</script>
