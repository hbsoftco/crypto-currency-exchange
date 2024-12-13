<template>
	<div class="mx-7 mb-14">
		<InfiniteLooper
			:speed="30"
			direction="right"
		>
			<template
				v-for="item in items"
				:key="item.id"
			>
				<MarketCategory
					class="mx-3"
					:tag="item.tag"
					:markets="item.markets"
				/>
			</template>
		</InfiniteLooper>
	</div>
</template>

<script setup lang="ts">
import InfiniteLooper from '../../MainPage/NewCurrencies/InfiniteLooper.vue';

import MarketCategory from '~/components/pages/Market/Statistics/MarketCategory.vue';
import type { MarketL51 } from '~/types/definitions/market.types';

interface PropsDefinition {
	items: MarketL51[];
}

defineProps<PropsDefinition>();

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

onMounted(() => {
	startCarousel();
});

onBeforeUnmount(() => {
	pauseCarousel();
});
</script>
