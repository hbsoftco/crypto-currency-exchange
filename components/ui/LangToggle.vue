<template>
	<ClientOnly>
		<UToggle
			:model-value="isFa"
			:on-icon="IconArrowUp"
			:off-icon="IconArrowDown"
			class="text-hover-light dark:text-hover-dark bg-secondary-gray-light dark:bg-secondary-gray-dark rounded-full"
			size="lg"
			aria-label="Theme"
			@update:model-value="toggleTheme"
		/>

		<template #fallback>
			<div class="w-8 h-8" />
		</template>
	</ClientOnly>
</template>

<script setup lang="ts">
import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';

const loadNumberFormat = () => {
	const savedFormat = localStorage.getItem('number-type');
	return savedFormat === 'fa' ? true : false;
};

const isFa = ref(loadNumberFormat());

const toggleTheme = (value: boolean) => {
	isFa.value = value;
	localStorage.setItem('number-type', value ? 'fa' : 'en');
};
</script>

  <style scoped>
  </style>
