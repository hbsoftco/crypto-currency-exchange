<template>
	<div class="w-full h-[26rem]">
		<!-- :src="`https://tv.hosseinbajan.ir/global?theme=${isDark? 'dark': 'light'}`" -->
		<iframe
			:src="`http://localhost:5173/global?theme=${isDark? 'dark': 'light'}`"
			class="w-full h-full"
			frameborder="0"
			allowfullscreen
		/>
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
