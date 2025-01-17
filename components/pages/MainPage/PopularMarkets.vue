<template>
	<div
		v-if="marketsLoading"
		class="mt-8"
	>
		<h1 class="text-sm font-bold mb-4">
			{{ $t('popularMarkets') }}
		</h1>

		<div class="flex space-x-4 items-center overflow-x-auto whitespace-nowrap">
			<USkeleton class="h-32 w-[8.5rem] bg-primary-gray-light dark:bg-primary-gray-dark ml-4" />
			<USkeleton class="h-32 w-[8.5rem] bg-primary-gray-light dark:bg-primary-gray-dark ml-4" />
		</div>
	</div>
	<div
		v-else
		class="mt-8"
	>
		<h1 class="text-sm font-bold mb-4">
			{{ $t('popularMarkets') }}
		</h1>

		<div
			class="flex items-center overflow-x-auto whitespace-nowrap space-x-4 rtl:space-x-reverse"
			style="
				scrollbar-width: none;
				-ms-overflow-style: none;
			"
		>
			<div
				v-for="(item, index) in markets"
				:key="index"
				class="relative rounded inline-block w-[8.5rem] py-3 pl-4 pr-3 after:absolute after:top-10 after:-left-4 after:h-8 after:w-4 after:bg-primary-yellow-light after:dark:bg-primary-yellow-dark "
				:class="{
					[bgClass]: changedItems[item.id],
					'bg-hover-light dark:bg-hover-dark': !changedItems[item.id],
				}"
				style="-webkit-scrollbar: none;"
			>
				<ULink :to="`/coins/${item?.currency?.cSymbol}`">
					<div class="flex items-center w-32 mb-1.5">
						<span class="text-xs font-medium text-subtle-text-light dark:text-subtle-text-dark">
							{{ item.currency?.cName }}
						</span>
						<span class="text-xs font-medium mx-0.5">/</span>
						<span class="text-xs font-medium">{{ item.quote?.cSymbol }}</span>
					</div>
					<div>
						<span class="text-sm font-medium">
							{{ priceFormat(item.indexPrice, true) }}
						</span>
					</div>
					<div>
						<UiChangeIndicator
							:change="parseFloat(item.priceChangePercIn24H)"
							pl="pl-0"
							:icon="false"
							:bg-color="false"
							class="mr-0 relative -right-2.5"
							size="text-sm"
						/>
					</div>
				</ULink>
				<ULink
					:to="`/spot/${splitMarket(item.mSymbol)}`"
					class="flex items-center pt-1"
				>
					<span class="text-sm font-medium ml-2">
						{{ $t('trade') }}
					</span>
					<IconArrowLeft class="text-sm" />
				</ULink>
			</div>

			<div class="relative top-[-0.3rem]">
				<ULink
					to="/markets"
					class="flex items-center px-2 py-1 h-8 bg-primary-yellow-light dark:bg-primary-yellow-dark text-text-light dark:text-text-dark mr-0 rounded-l"
				>
					<span class="text-sm font-bold ml-1">
						{{ $t('moreItem') }}
					</span>
					<IconArrowLeft class="text-base" />
				</ULink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { priceFormat } from '~/utils/helpers';
import { splitMarket } from '~/utils/split-market';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left-qr.svg';
import type { MarketState } from '~/types/definitions/market.types';
import { marketRepository } from '~/repositories/market.repository';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const worker = useBaseWorker();

const publicSocketStore = usePublicSocketStore();
const socketMarketIds = ref<number[]>([]);

const markets = ref<MarketState[]>([]);
const marketsLoading = ref<boolean>(true);
const getHottestMarkets = async () => {
	try {
		marketsLoading.value = true;
		const { result } = await marketRepo.getHottestMarkets({ rowCount: '10' });

		markets.value = await worker.addCurrencyToMarketStates(useEnv('apiBaseUrl'), result.rows as MarketState[]);

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

const changedItems = ref<{ [key: string]: boolean }>({});
const prevData = ref<{ [key: string]: { indexPrice: number; priceChangePercIn24H: number } }>({});
const bgClass = ref<string>('');

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
						changedItems.value[marketId] = true;

						bgClass.value
							= newIndexPrice > prevIndexPrice
								? 'bg-[#c8ffc8] dark:bg-[#13241f]'
								: 'bg-[#ffc8c8] dark:bg-[#2b181c]';

						setTimeout(() => {
							changedItems.value[marketId] = false;
							bgClass.value = '';
						}, 500);

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
	await getHottestMarkets();
});
</script>
