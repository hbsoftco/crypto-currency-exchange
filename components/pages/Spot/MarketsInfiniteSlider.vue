<template>
	<div
		v-if="marketsLoading"
		class="flex justify-center mt-1"
		dir="ltr"
	>
		<div
			v-for="item in 6"
			:key="item"
			class="flex justify-center items-center border-r dark:border-secondary-gray-50 mt-2 px-4 mr-4"
		>
			<USkeleton
				class="w-5 h-5 bg-primary-gray-light dark:bg-primary-gray-dark"
				:ui="{ rounded: 'rounded-full' }"
			/>

			<USkeleton class="h-2.5 w-10 bg-primary-gray-light dark:bg-primary-gray-dark mx-3" />

			<USkeleton class="h-2.5 w-10 bg-primary-gray-light dark:bg-primary-gray-dark" />
		</div>
	</div>
	<div
		v-else
		class="w-full h-8 bg-background-light dark:bg-background-dark py-1"
		dir="ltr"
	>
		<InfiniteSlideBar
			delay="1s"
			direction="reverse"
			duration="80s"
		>
			<div class="flex">
				<div
					v-for="(item, index) in markets"
					:key="`top-${index}`"
					class="px-0 md:px-4 w-full md:w-auto py-1 pt-2 select-none"
				>
					<div class="flex justify-center items-center">
						<img
							:src="`https://api-bitland.site/media/currency/${item.currency?.cSymbol}.png`"
							:alt="item.currency?.cName"
							class="w-5 h-5 mr-2 rounded-full"
							format="webp"
							densities="x1"
							@error="handleImageError"
						>
						<div class="font-normal text-[11px]">
							<span>{{ item.currency?.cSymbol }}</span>
							<span class="mx-0.5 text-subtle-text-light dark:text-subtle-text-50">/</span>
							<span class="text-subtle-text-light dark:text-subtle-text-50">
								{{ item?.quote?.cSymbol }}
							</span>
						</div>

						<div class="mx-5">
							<UiChangePrice
								classes="text-[11px] font-normal "
								:show-percent="true"
								pl="pl-2"
								:change="parseFloat(String(item?.priceChangePercIn24H))"
								:icon="false"
							/>
						</div>
						<div class="text-[11px] text-subtle-text-light dark:text-subtle-text-50 pr-4 border-r dark:border-secondary-gray-50">
							{{ priceFormat(item?.indexPrice, true) }}
						</div>
					</div>
				</div>
			</div>
		</InfiniteSlideBar>
	</div>
</template>

<script setup lang="ts">
import InfiniteSlideBar from 'vue3-infinite-slide-bar';

import { priceFormat, handleImageError } from '~/utils/helpers';
import { marketRepository } from '~/repositories/market.repository';
import type { MarketL16, MarketsL47Params } from '~/types/definitions/market.types';
import { MarketType } from '~/utils/enums/market.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const worker = useBaseWorker();

const marketsParams = ref<MarketsL47Params>({
	marketTypeId: String(MarketType.SPOT),
	rowCount: '20',
});
const markets = ref<MarketL16[]>([]);
const marketsLoading = ref<boolean>(false);
const getMarkets = async () => {
	try {
		marketsLoading.value = true;
		const { result } = await marketRepo.getMarketListL46(marketsParams.value);

		markets.value = await worker.addCurrencyToMarketsL46(
			useEnv('apiBaseUrl'),
			result.rows as MarketL16[],
		);

		marketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

onMounted(async () => {
	await getMarkets();
});
</script>
