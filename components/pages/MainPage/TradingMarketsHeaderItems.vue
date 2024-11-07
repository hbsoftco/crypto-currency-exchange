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
				class="mx-0 min-w-24 text-xs cursor-pointer px-2 py-2 font-medium rounded transition-colors select-none"
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
import type { Tag } from '~/types/response/tag.types';

const emit = defineEmits(['tag-selected']);

const baseDataStore = useBaseDataStore();

await baseDataStore.fetchTagItems();

const tags = baseDataStore.tagItems;

const selectedItem = ref(tags[0]);

const selectItem = (item: Tag) => {
	selectedItem.value = item;
	emit('tag-selected', item.id);
};
</script>
