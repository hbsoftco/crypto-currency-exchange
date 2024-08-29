<template>
	<div
		dir="ltr"
		class="relative -top-14"
	>
		<UCarousel
			v-slot="{ item }"
			:items="items"
			:ui="{
				item: 'basis-full md:basis-1/3 lg:basis-1/4 snap-start',
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
			<div class="px-4">
				<img
					:src="item"
					class="w-64 h-40 mx-2"
					draggable="false"
				>
			</div>
		</UCarousel>
	</div>
</template>

<script setup lang="ts">
import ImgSlider1 from '~/public/images/delete/slider1.webp';
import ImgSlider2 from '~/public/images/delete/slider2.webp';
import ImgSlider3 from '~/public/images/delete/slider3.webp';
import ImgSlider4 from '~/public/images/delete/slider4.webp';
import ImgSlider5 from '~/public/images/delete/slider5.webp';

const items = [
	ImgSlider1,
	ImgSlider2,
	ImgSlider3,
	ImgSlider4,
	ImgSlider5,
];
</script>
