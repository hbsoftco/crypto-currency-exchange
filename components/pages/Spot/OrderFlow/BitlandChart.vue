<template>
	<div class="w-full h-[26rem]">
		<iframe
			:src="`https://tv.hosseinbajan.ir/datafeed/spot/BTCUSDT?templateId=${isDark? 'dark': 'light'}&interval=1hour`"
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
