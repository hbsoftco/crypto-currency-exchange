<template>
	<div class="w-full h-[26rem]">
		<iframe
			:src="`https://tv.hosseinbajan.ir/global?theme=${isDark? 'dark': 'light'}&symbol=${spotStore.symbol}`"
			class="w-full h-full"
			frameborder="0"
			allowfullscreen
		/>
	</div>
</template>

<script setup lang="ts">
const spotStore = useSpotStore();

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
