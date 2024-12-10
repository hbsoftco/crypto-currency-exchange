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
			<template #item="{ item }">
				<p
					class="text-sm font-normal px-4 py-3 bg-hover-light dark:bg-hover-dark hover:bg-hover-light hover:dark:bg-hover-dark text-black dark:text-white"
				>
					{{ item.content }}
				</p>
			</template>
		</UAccordion>
	</div>
</template>

<script setup lang="ts">
import type { KeyValue } from '~/types/definitions/common.types';

interface AccordionItem {
	label: string;
	content: string;
}

interface PropsDefinition {
	items: KeyValue[];
	direction?: boolean;
}

const props = defineProps<PropsDefinition>();

const items: AccordionItem[] = props.items.map((item) => ({
	label: item.key,
	content: item.value,
}));
</script>
