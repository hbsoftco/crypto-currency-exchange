<!-- eslint-disable vue/no-v-html -->
<template>
	<div>
		<UAccordion
			:items="items"
			:ui="{
				default: {
					class: 'text-base font-bold px-4 py-3 mt-2 bg-hover-light dark:bg-hover-dark hover:bg-hover-light hover:dark:bg-hover-dark text-black dark:text-white',
				},
			}"
		>
			<template #default="{ item, open }">
				<UButton
					color="gray"
					variant="ghost"
					class="text-base font-bold px-4 py-3 mt-2 bg-hover-light dark:bg-hover-dark hover:bg-hover-light hover:dark:bg-hover-dark text-black dark:text-white"
					:ui="{ padding: { sm: 'p-3' } }"
				>
					<span
						class="text-justify text-sm md:text-base font-medium"
						v-html="sanitizedHtml(formatTextWithLineBreaks(item.label))"
					/>

					<template #trailing>
						<UIcon
							name="i-heroicons-chevron-left-20-solid"
							class="w-5 h-5 ms-auto transform transition-transform duration-200 flex-shrink-0"
							:class="[open && '-rotate-90']"
						/>
					</template>
				</UButton>
			</template>

			<template #item="{ item }">
				<p
					class="text-sm rounded font-normal px-4 py-3 bg-hover-light dark:bg-hover-dark hover:bg-hover-light hover:dark:bg-hover-dark text-black dark:text-white text-justify"
					v-html="sanitizedHtml(formatTextWithLineBreaks(item.content))"
				/>
			</template>
		</UAccordion>
	</div>
</template>

<script setup lang="ts">
import { sanitizedHtml, formatTextWithLineBreaks } from '~/utils/helpers';
import type { KeyValue } from '~/types/definitions/common.types';

interface AccordionItem {
	label: string;
	content: string;
}

interface PropsDefinition {
	items: KeyValue[];
}

const props = defineProps<PropsDefinition>();

const items: AccordionItem[] = props.items.map((item) => ({
	label: item.key,
	content: item.value,
}));
</script>
