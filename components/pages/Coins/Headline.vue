<!-- eslint-disable vue/no-v-html -->
<template>
	<section
		v-if="headline"
		class="mt-4 md:mt-12 mb-12 md:pt-12 md:pb-2"
	>
		<h1 class="text-base md:text-xl font-bold">
			{{ $t("liveInstantPriceInformation") }}
		</h1>
		<p
			class="text-sm md:text-base font-medium mt-4 text-subtle-text-light dark:text-subtle-text-50 text-justify"
			dir="rtl"
			v-html="sanitizedHtml(formatTextWithLineBreaks(headline))"
		/>
	</section>
</template>

<script setup lang="ts">
import { sanitizedHtml, formatTextWithLineBreaks } from '~/utils/helpers';

interface PropsDefinition {
	headline: string | null;
}

defineProps<PropsDefinition>();
</script>
