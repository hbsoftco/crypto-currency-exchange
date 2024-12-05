<template>
	<div
		class="w-full"
		dir="ltr"
	>
		<UCarousel
			v-slot="{ item }"
			:items="tags"
			:ui="{ item: 'snap-start' }"
			:prev-button="{
				variant: 'link',
				icon: 'i-heroicons-chevron-right',
				class: '-left-10 rounded-md',
			}"
			:next-button="{
				variant: 'link',
				icon: 'i-heroicons-chevron-left',
				class: '-right-10 rounded-md',
			}"
			arrows
			class="w-full mx-auto"
		>
			<div
				class="mx-1 text-xs cursor-pointer px-3 py-2 font-medium rounded transition-colors select-none"
				:class="
					selectedItem === item
						? 'bg-primary text-text-light dark:text-text-dark '
						: ''
				"
				@click="selectItem(item)"
			>
				{{ useNumber(item.tag) }}
			</div>
		</UCarousel>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import type { Tag } from '~/types/definitions/tag.types';

interface PropsDefinition {
	tags: Tag[];
}

const props = defineProps<PropsDefinition>();

const emit = defineEmits(['tag-selected']);

const selectedItem = ref<Tag>(props.tags[0]);

const selectItem = (item: Tag) => {
	selectedItem.value = item;
	emit('tag-selected', item);
};
</script>
