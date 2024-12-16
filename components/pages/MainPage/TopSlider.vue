<template>
	<div
		v-if="!sliderLoading"
		dir="ltr"
		class="relative top-4 md:-top-16 2xl:-top-28"
		@mouseenter="pauseCarousel"
		@mouseleave="startCarousel"
	>
		<UCarousel
			ref="carouselRef"
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
				<ULink
					:to="item.url"
					target="_blank"
				>
					<img
						:src="item.mediaUrl"
						densities="x1"
						:alt="item.header"
						class="w-full md:w-64 h-40 mx-0 md:mx-2 shadow-sm rounded-md"
					>
				</ULink>
			</div>
		</UCarousel>
	</div>
</template>

<script setup lang="ts">
import { systemRepository } from '~/repositories/system.repository';
import type { Card, SliderItem } from '~/types/definitions/system.types';
import { Language } from '~/utils/enums/language.enum';

const { $api } = useNuxtApp();
const systemRepo = systemRepository($api);

const slides = ref<SliderItem[]>([]);
const sliderLoading = ref<boolean>(false);
const fetchSlides = async () => {
	sliderLoading.value = true;

	try {
		const { result } = await systemRepo.getSystemCardList({
			languageId: String(Language.PERSIAN),
			group: 'Home_Slider',
		});
		const slideItems = result.rows as Card[];
		if (slideItems.length) {
			slides.value = slideItems.map((slide) => ({
				mediaUrl: slide.mediaUrl,
				url: slide.url,
				header: slide.info[0]?.header || '',
			}));
		}
	}
	catch (error) {
		console.log(error);
	}
	finally {
		sliderLoading.value = false;
	}
};

const carouselRef = ref();
let interval: ReturnType<typeof setInterval> | null = null;

const startCarousel = () => {
	if (interval) return;
	interval = setInterval(() => {
		if (!carouselRef.value) return;

		if (carouselRef.value.page === carouselRef.value.pages) {
			return carouselRef.value.select(0);
		}

		carouselRef.value.next();
	}, 3000);
};

const pauseCarousel = () => {
	if (interval) {
		clearInterval(interval);
		interval = null;
	}
};

onMounted(async () => {
	startCarousel();

	await fetchSlides();
});

onBeforeUnmount(() => {
	pauseCarousel();
});
</script>
