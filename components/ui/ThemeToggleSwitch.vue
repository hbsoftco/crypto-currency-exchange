<template>
	<ClientOnly>
		<UToggle
			:model-value="isDark"
			on-icon="i-heroicons-moon-20-solid"
			off-icon="heroicons:sun-20-solid"
			class="text-hover-light dark:text-hover-dark bg-secondary-gray-light dark:bg-secondary-gray-dark  rounded-full"
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
const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set(value: boolean) {
		colorMode.preference = value ? 'dark' : 'light';
	},
});

const toggleTheme = (value: boolean) => {
	isDark.value = value;
};
</script>
