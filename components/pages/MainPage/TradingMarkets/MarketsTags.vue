<template>
	<div
		class="w-full"
		dir="ltr"
	>
		<UCarousel
			v-slot="{ item }"
			:items="marketsPageStore.tagItems"
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
				class="mx-0 min-w-20 text-xs cursor-pointer px-1 py-2 font-medium rounded transition-colors select-none"
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

const marketsPageStore = useMarketsPageStore();

const selectedItem = ref(marketsPageStore.tagItems[0]);

const selectItem = (item: Tag) => {
	selectedItem.value = item;
	marketsPageStore.tradingMarketsParams.tagTypeId = String(item.id);
};
</script>
