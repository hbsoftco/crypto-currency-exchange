<template>
	<div
		dir="ltr"
		class="relative"
	>
		<UCarousel
			ref="carouselRef"
			v-slot="{ item }"
			:items="items"
			:ui="{
				item: 'basis-full md:basis-1/3 lg:basis-1/4 snap-center md:snap-start',
				indicators: {
					wrapper: 'flex items-center justify-center gap-3 inset-x-0',
					base: 'rounded h-2 w-4',
					active: 'bg-primary-yellow-light dark:bg-primary-yellow-dark h-2 w-8',
					inactive: 'bg-secondary-gray-light dark:bg-secondary-gray-dark',
				},
			}"
			:prev-button="{
				color: 'gray',
				icon: 'i-heroicons-arrow-right-20-solid',
				class: 'left-0.5',
			}"
			:next-button="{
				color: 'gray',
				icon: 'i-heroicons-arrow-left-20-solid',
				class: 'right-0.5',
			}"
			arrows
			class="rounded-lg overflow-hidden pb-10"
		>
			<div class="px-0 md:px-4 mb-2 w-full md:w-auto">
				<MarketCategory
					:key="item.id"
					:tag="item.tag"
					:markets="item.markets"
				/>
			</div>
		</UCarousel>
	</div>
</template>

<script setup lang="ts">
import MarketCategory from '~/components/pages/Market/Statistics/MarketCategory.vue';
import type { MarketL51 } from '~/types/definitions/market.types';

interface PropsDefinition {
	items: MarketL51[];
}

defineProps<PropsDefinition>();

const carouselRef = ref();

onMounted(() => {
	setInterval(() => {
		if (!carouselRef.value) return;

		if (carouselRef.value.page === carouselRef.value.pages) {
			return carouselRef.value.select(0);
		}

		carouselRef.value.next();
	}, 3000);
});
</script>
