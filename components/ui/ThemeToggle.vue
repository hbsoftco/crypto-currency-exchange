<template>
	<ClientOnly>
		<UButton
			:icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun'"
			color="white"
			variant="ghost"
			size="lg"
			class="text-secondary-gray-dark dark:text-secondary-gray-light"
			aria-label="Theme"
			@click="isDark = !isDark"
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
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	},
});
</script>
