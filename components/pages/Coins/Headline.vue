<template>
	<section class="my-12 md:pt-12 md:pb-2">
		<h1 class="text-xl font-bold">
			{{ $t("liveInstantPriceInformation") }}
		</h1>
		<p
			class="text-base font-medium mt-4 text-subtle-text-light dark:text-subtle-text-50"
			dir="ltr"
		>
			{{ headline }}
		</p>
	</section>
</template>

<script setup lang="ts">
interface PropsDefinition {
	headline: string | null;
}

defineProps<PropsDefinition>();
</script>
