<template>
	<div
		class="w-full"
		dir="ltr"
	>
		<UCarousel
			v-slot="{ item, index }"
			:items="marketsPageStore.tagItems"
			:ui="{ item: 'flex-none snap-start' }"
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
				ref="carouselItems"
				class="carousel-item mx-2 px-2 text-xs cursor-pointer py-2 font-medium rounded transition-colors select-none"
				:class="[
					selectedItem === item
						? 'bg-primary text-text-light dark:text-text-dark '
						: '',
					getItemStyle(item, index),
				]

				"
				@click="selectItem(item)"
			>
				{{ item.tag }}
			</div>
		</UCarousel>
	</div>
</template>

<script setup lang="ts">
import type { Tag } from '~/types/definitions/tag.types';

const marketsPageStore = useMarketsPageStore();
const selectedItem = ref(marketsPageStore.tagItems[0]);
const carouselItems = ref<HTMLElement[]>([]);
const itemWidths = ref<Record<number, number>>({});

const selectItem = (item: Tag) => {
	selectedItem.value = item;
	marketsPageStore.tradingMarketsParams.tagTypeId = String(item.id);
};

const calculateWidths = () => {
	const items = document.querySelectorAll('.carousel-item') as NodeListOf<HTMLElement>;
	items.forEach((item, index) => {
		const width = item.getBoundingClientRect().width;
		itemWidths.value[index] = width;
	});
};

const getItemStyle = (item: Tag, index: number) => {
	const width = itemWidths.value[index] || 0;

	if (width && item) {
		if (width <= 36) {
			return 'min-w-9';
		}
		else if (width > 36 && width <= 44) {
			return 'min-w-11';
		}
		else if (width > 44 && width <= 48) {
			return 'min-w-12';
		}
		else if (width > 48 && width <= 56) {
			return 'min-w-14';
		}
		else if (width > 56 && width <= 64) {
			return 'min-w-16';
		}
		else if (width > 64 && width <= 80) {
			return 'min-w-20';
		}
		else if (width > 80 && width <= 96) {
			return 'min-w-24';
		}
	}
};

watch(
	() => marketsPageStore.tagItems,
	async () => {
		await nextTick();
		calculateWidths();
	},
	{ immediate: true },
);

onMounted(async () => {
	await nextTick();

	carouselItems.value = Array.from(
		document.querySelectorAll('.carousel-item'),
	) as HTMLElement[];

	calculateWidths();
});
</script>
