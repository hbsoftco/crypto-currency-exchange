<template>
	<div class="py-6 md:py-20">
		<h3 class="mb-6 md:mb-14 text-center">
			<span class="text-2xl md:text-[2.5rem] font-black">{{ $t("latestCurrencies") }}</span>
		</h3>

		<div
			v-if="markets?.length"
			class="currency-row overflow-hidden"
		>
			<div
				class="flex gap-4 animate-move-left"
				dir="ltr"
			>
				<Currency
					v-for="(item, index) in [...markets]"
					:key="`top-${index}`"
					:market="item"
					:data="item"
				/>
				<Currency
					v-for="(item, index) in [...markets]"
					:key="`top-duplicate-${index}`"
					:market="item"
					:data="item"
				/>
				<Currency
					v-for="(item, index) in [...markets]"
					:key="`top2-duplicate-${index}`"
					:market="item"
					:data="item"
				/>
			</div>
		</div>
		<div
			v-if="markets?.length"
			class="currency-row overflow-hidden mt-4"
		>
			<div class="flex gap-4 animate-move-right">
				<Currency
					v-for="(item, index) in [...markets]"
					:key="`bottom-${index}`"
					:market="item"
					:data="item"
				/>
				<Currency
					v-for="(item, index) in [...markets]"
					:key="`bottom-duplicate-${index}`"
					:market="item"
					:data="item"
				/>
				<Currency
					v-for="(item, index) in [...markets]"
					:key="`bottom2-duplicate-${index}`"
					:market="item"
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

import { marketRepository } from '~/repositories/market.repository';
import type { MarketL21 } from '~/types/definitions/market.types';
import { MarketType, SortMode } from '~/utils/enums/market.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const currencyWorker = useBaseWorker();

const params = ref({
	sortMode: String(SortMode.BY_NEWEST_COINS),
	currencyQuoteId: '3',
	marketTypeId: String(MarketType.SPOT),
	tagTypeId: '',
});

const markets = ref<MarketL21[]>([]);
const marketsLoading = ref<boolean>(false);
const getMarketListL21 = async () => {
	try {
		marketsLoading.value = true;
		const { result } = await marketRepo.getMarketListL21(params.value);

		markets.value = await currencyWorker.addCurrencyToMarkets(
			result.rows as MarketL21[],
			Number(params.value.currencyQuoteId),
			useEnv('apiBaseUrl'), MarketType.SPOT,
		);

		marketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

onMounted(async () => {
	await getMarketListL21();
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
