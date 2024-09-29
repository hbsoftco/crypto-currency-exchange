<template>
	<div
		dir="ltr"
		class="relative top-4 md:-top-14"
	>
		<UCarousel
			v-slot="{ item }"
			:items="slides"
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
			<div class="px-0 md:px-5 mb-2 w-full md:w-auto">
				<CurrencySlide :slide="item" />
			</div>
		</UCarousel>
	</div>
</template>

<script setup lang="ts">
import CurrencySlide from './CurrencySlide.vue';

const slides = [1, 2, 3, 4, 5, 6, 7];
</script>
