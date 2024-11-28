<template>
	<section class="mt-36 md:mt-12 mb-12 md:pt-12 md:pb-2">
		<h1 class="text-xl font-bold">
			{{ $t("liveInstantPriceInformation") }}
		</h1>
		<p
			class="text-base font-medium mt-4 text-subtle-text-light dark:text-subtle-text-50"
			dir="ltr"
		>
			{{ useNumber(headline) }}
		</p>
	</section>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';

interface PropsDefinition {
	headline: string | null;
}

defineProps<PropsDefinition>();
</script>
