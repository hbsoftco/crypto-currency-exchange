<template>
	<div
		dir="ltr"
		class="relative top-14 md:-top-14"
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
			indicators
			class="rounded-lg overflow-hidden pb-10"
		>
			<div class="px-0 md:px-4 mb-2 w-full md:w-auto">
				<img
					:src="item.mediaUrl"
					:alt="item.header"
					class="w-full md:w-64 h-40 mx-0 md:mx-2 shadow-sm rounded-md"
					draggable="false"
				>
			</div>
		</UCarousel>
	</div>
</template>

<script setup lang="ts">
const baseDataStore = useBaseDataStore();

await baseDataStore.fetchSlides();

const slides = baseDataStore.slides;
</script>
