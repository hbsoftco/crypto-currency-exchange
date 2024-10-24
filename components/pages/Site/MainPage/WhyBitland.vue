<template>
	<div>
		<UContainer>
			<div class="text-center mb-16">
				<span class="text-[2.5rem] font-black">{{ $t('whyBitland') }}</span>
				<p class="text-base font-medium mt-14 leading-loose">
					{{ $t('successfulInvestment') }}
				</p>
			</div>
			<div>
				<img
					:src="isDark ? '/images/why-bitland-black.webp' : '/images/why-bitland.webp'"
					alt="platform"
					class="w-full mt-14"
				>
			</div>
		</UContainer>
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
