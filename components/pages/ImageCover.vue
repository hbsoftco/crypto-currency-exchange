<template>
	<div class="relative">
		<NuxtImg
			:src="`/images/bg/${isDark? 'dark.webp': 'light.webp'}`"
			alt="bg-cover"
			class="w-full"
		/>
		<div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
			<slot />
		</div>
	</div>
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
