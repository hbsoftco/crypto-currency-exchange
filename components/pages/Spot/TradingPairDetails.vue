<template>
	<div
		class="w-full h-8 bg-background-light dark:bg-background-dark px-20 py-1"
		dir="ltr"
	>
		<UCarousel
			v-slot="{ item }"
			:items="markets"
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
				variant: 'link',
				icon: 'i-heroicons-chevron-right',
				class: '-left-10',
			}"
			:next-button="{
				variant: 'link',
				icon: 'i-heroicons-chevron-left',
				class: '-right-10',
			}"
			arrows
			class="w-full mx-auto"
		>
			<div>{{ item }}</div>
		</UCarousel>
	</div>
</template>

<script setup lang="ts">
const markets = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4];
</script>
