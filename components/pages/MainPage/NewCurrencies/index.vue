<template>
	<div class="py-6 md:py-20">
		<h3 class="mb-6 md:mb-14 text-center">
			<span class="text-2xl md:text-[2.5rem] font-black">{{ $t("latestCurrencies") }}</span>
		</h3>

		<div
			v-if="firstHalf?.length"
			dir="ltr"
			class="mb-6"
			@mouseenter="firstPaused=true"
			@mouseleave="firstPaused=false"
		>
			<InfiniteSlideBar
				:style="{ 'animation-play-state': 'paused !important' }"
				delay="1s"
				direction="reverse"
				duration="30s"
				:paused="firstPaused"
			>
				<div class="flex">
					<Currency
						v-for="(item, index) in firstHalf"
						:key="`top-${index}`"
						class="mx-3"
						:market="item"
						:data="item"
					/>
				</div>
			</InfiniteSlideBar>
		</div>

		<div
			v-if="firstHalf?.length"
			dir="ltr"
			class="mb-6"
			@mouseenter="secondPaused=true"
			@mouseleave="secondPaused=false"
		>
			<InfiniteSlideBar
				delay="1s"
				direction="normal"
				duration="30s"
				:paused="secondPaused"
			>
				<div class="flex">
					<Currency
						v-for="(item, index) in secondHalf"
						:key="`top-${index}`"
						class="mx-3"
						:market="item"
						:data="item"
					/>
				</div>
			</InfiniteSlideBar>
		</div>

		<UiSeeMore
			link="/"
			text="tradeStart"
			class="mt-4 md:mt-12 block mx-auto"
		/>
	</div>
</template>

<script setup lang="ts">
import Currency from './Currency.vue';

import { marketRepository } from '~/repositories/market.repository';
import type { MarketL21 } from '~/types/definitions/market.types';
import { MarketType, SortMode } from '~/utils/enums/market.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const secondPaused = ref<boolean>(false);
const firstPaused = ref<boolean>(false);

const currencyWorker = useBaseWorker();

const params = ref({
	sortMode: String(SortMode.BY_NEWEST_COINS),
	currencyQuoteId: '3',
	marketTypeId: String(MarketType.SPOT),
	tagTypeId: '',
});

const markets = ref<MarketL21[]>([]);

const repeatArray = (array: MarketL21[], times: number): MarketL21[] => {
	return Array(times).fill(array).flat();
};

const firstHalf = computed(() => {
	const half = markets.value.slice(0, Math.ceil(markets.value.length / 2));
	return repeatArray(half, 1);
});

const secondHalf = computed(() => {
	const half = markets.value.slice(Math.ceil(markets.value.length / 2));
	return repeatArray(half, 1);
});

const marketsLoading = ref<boolean>(false);
const getMarketListL11 = async () => {
	try {
		marketsLoading.value = true;
		const { result } = await marketRepo.getMarketListL11(params.value);

		markets.value = await currencyWorker.addCurrencyToMarkets(
			result.rows as MarketL21[],
			Number(params.value.currencyQuoteId),
			useEnv('apiBaseUrl'),
			MarketType.SPOT,
		);

		marketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

onMounted(async () => {
	await getMarketListL11();
});
</script>

<style scoped>
@keyframes move-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes move-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-move-left {
  animation: move-left 50s linear infinite;
  animation-play-state: running;
}

.animate-move-right {
  animation: move-right 50s linear infinite;
  animation-play-state: running;
}

.animate-move-left:hover,
.animate-move-right:hover {
  animation-play-state: paused;
}
</style>
