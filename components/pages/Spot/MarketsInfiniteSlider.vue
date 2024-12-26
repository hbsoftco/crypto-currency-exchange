<template>
	<div
		v-if="marketsLoading"
		class="flex justify-center mt-1"
		dir="ltr"
	>
		<div
			v-for="item in 6"
			:key="item"
			class="flex justify-center items-center mt-2 px-4 mr-4"
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
			duration="160s"
		>
			<div class="flex">
				<div
					v-for="(item, index) in markets"
					:key="`top-${index}`"
					class="px-0 md:px-1 w-full md:w-auto py-1 pt-2 select-none"
				>
					<ULink
						class="flex justify-center items-center rounded"
						:to="`/spot/${splitMarket(item.market?.mSymbol)}`"
					>
						<img
							:src="`https://api-bitland.site/media/currency/${item.currency?.cSymbol}.png`"
							:alt="item.currency?.cName"
							class="w-5 h-5 mr-2"
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

						<div class="px-3 border-r border-primary-gray-100 dark:border-primary-gray-800 mr-1">
							<UiChangePrice
								classes="text-[11px] font-normal "
								:show-percent="true"
								pl="pl-2"
								:change="parseFloat(String(item?.priceChangePercIn24H))"
								:icon="false"
							/>
						</div>
					</ULink>
				</div>
			</div>
		</InfiniteSlideBar>
	</div>
</template>

<script setup lang="ts">
import InfiniteSlideBar from 'vue3-infinite-slide-bar';

import { splitMarket } from '~/utils/split-market';
import { handleImageError } from '~/utils/helpers';
import { marketRepository } from '~/repositories/market.repository';
import type { MarketL16, MarketsL47Params } from '~/types/definitions/market.types';
import { MarketType } from '~/utils/enums/market.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const publicSocketStore = usePublicSocketStore();

const worker = useBaseWorker();

const socketMarketIds = ref<number[]>([]);

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

		if (socketMarketIds.value.length) {
			await publicSocketStore.removeMarketIds(socketMarketIds.value);
		}
		socketMarketIds.value = markets.value.map((item) => item.id);
		await publicSocketStore.addMarketIds(socketMarketIds.value);

		markets.value.forEach((item) => {
			prevData.value[item.id] = {
				indexPrice: parseFloat(item.indexPrice),
				priceChangePercIn24H: parseFloat(item.priceChangePercIn24H),
			};
		});

		marketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

const prevData = ref<{ [key: string]: { indexPrice: number; priceChangePercIn24H: number } }>({});

watch(
	() => publicSocketStore.latestMarketData,
	(newData) => {
		if (newData) {
			newData.forEach((updatedMarket) => {
				const marketId = updatedMarket.data.mi;
				const index = markets.value.findIndex((item) => item.id === marketId);

				if (index !== -1) {
					const newIndexPrice = parseFloat(updatedMarket.data.i);
					const newPriceChangePercIn24H = parseFloat(updatedMarket.data.p);

					const prevIndexPrice = prevData.value[marketId]?.indexPrice;
					const prevPriceChangePercIn24H = prevData.value[marketId]?.priceChangePercIn24H;

					if (
						newIndexPrice !== prevIndexPrice
						|| newPriceChangePercIn24H !== prevPriceChangePercIn24H
					) {
						markets.value[index] = {
							...markets.value[index],
							indexPrice: String(newIndexPrice),
							priceChangePercIn24H: String(newPriceChangePercIn24H),
						};

						prevData.value[marketId] = {
							indexPrice: newIndexPrice,
							priceChangePercIn24H: newPriceChangePercIn24H,
						};
					}
				}
			});
		}
	},
	{ deep: true },
);

onMounted(async () => {
	await getMarkets();
});
</script>
