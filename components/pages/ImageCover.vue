<template>
	<div class="relative">
		<NuxtImg
			:src="`/images/svg/site/cover.svg`"
			alt="bg-cover"
			class="w-full"
		/>
		<div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
</script>
