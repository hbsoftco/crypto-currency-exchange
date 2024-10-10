<template>
	<div class="relative">
		<NuxtImg
			src="/images/svg/site/cover.svg"
			alt="bg-cover"
			class="w-full"
		/>
		<div
			class="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-full max-w-screen-2xl"
			:class="cssClass"
		>
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
interface PropsDefinition {
	cssClass?: string;
}

withDefaults(defineProps<PropsDefinition>(), {
	cssClass: 'px-4 sm:px-6 lg:px-8',
});
</script>
