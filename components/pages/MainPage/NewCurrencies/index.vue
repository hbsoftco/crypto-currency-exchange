<template>
	<div class="py-6 md:py-20">
		<h3 class="mb-6 md:mb-14 text-center">
			<span class="text-2xl md:text-[2.5rem] font-black">{{ $t("latestCurrencies") }}</span>
		</h3>

		<div
			v-if="marketData?.length"
			class="currency-row overflow-hidden"
		>
			<div
				class="flex gap-4 animate-move-left"
				dir="ltr"
			>
				<Currency
					v-for="(item, index) in [...marketData]"
					:key="`top-${index}`"
					:currency="item"
					:data="item"
				/>
				<Currency
					v-for="(item, index) in [...marketData]"
					:key="`top-duplicate-${index}`"
					:currency="item"
					:data="item"
				/>
				<Currency
					v-for="(item, index) in [...marketData]"
					:key="`top2-duplicate-${index}`"
					:currency="item"
					:data="item"
				/>
			</div>
		</div>
		<div
			v-if="marketData?.length"
			class="currency-row overflow-hidden mt-4"
		>
			<div class="flex gap-4 animate-move-right">
				<Currency
					v-for="(item, index) in [...marketData]"
					:key="`bottom-${index}`"
					:currency="item"
					:data="item"
				/>
				<Currency
					v-for="(item, index) in [...marketData]"
					:key="`bottom-duplicate-${index}`"
					:currency="item"
					:data="item"
				/>
				<Currency
					v-for="(item, index) in [...marketData]"
					:key="`bottom2-duplicate-${index}`"
					:currency="item"
					:data="item"
				/>
			</div>
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

import type { MarketListWithSparkLineChartItem } from '~/types/response/market.types';
import type { ErrorResponse } from '~/types/response/error.type';
import { MarketType, SortMode } from '~/utils/enums/market.enum';

const marketStore = useMarketStore();

const params = ref({
	sortMode: String(SortMode.BY_NEWEST_COINS),
	currencyQuoteId: '3',
	marketTypeId: String(MarketType.SPOT),
	tagTypeId: '1',
});

const marketData = ref<MarketListWithSparkLineChartItem[]>();

onMounted(async () => {
	try {
		const response = await marketStore.fetchMarketListWithSparkLineChart(params.value);
		marketData.value = response;
	}
	catch (error: unknown) {
		const err = error as ErrorResponse;
		throw createError({
			statusCode: 500,
			statusMessage: `${err.response._data.message}`,
		});
	}
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
