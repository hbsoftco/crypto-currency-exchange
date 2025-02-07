<template>
	<div dir="ltr">
		<div
			class="w-full px-12 pb-2 mb-2 border-b border-primary-gray-light dark:border-primary-gray-dark"
			dir="ltr"
		>
			<UCarousel
				ref="carouselRef"
				v-slot="{ item }"
				:items="tags"
				:ui="{
					item: 'snap-start md:snap-start',
					default: {
						prevButton: {
							color: 'black',
						},
						nextButton: {
							color: 'black',
						},
					},
				}"
				:prev-button="{
					variant: 'link',
					icon: 'i-heroicons-chevron-right',
					class: '-left-12 rounded-md',
				}"
				:next-button="{
					variant: 'link',
					icon: 'i-heroicons-chevron-left',
					class: '-right-12 rounded-md',
				}"
				arrows
				class="w-full mx-auto"
			>
				<span
					class="mx-1 h-7 text-center text-xs cursor-pointer px-1.5 py-1 pt-1.5 font-medium rounded transition-colors select-none text-nowrap"
					:class="
						selectedTagItem === item
							? 'bg-primary text-text-light dark:text-text-dark '
							: ''
					"
					@click="selectTagItem(item)"
				>
					{{ useNumber(item.tag) }}
				</span>
			</UCarousel>
		</div>
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

const selectedTagItem = ref<Tag>(props.tags[0]);

const selectTagItem = (item: Tag) => {
	selectedTagItem.value = item;
	emit('tag-selected', item);
};
</script>
