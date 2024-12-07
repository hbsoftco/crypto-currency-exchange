<template>
	<div class="bg-hover-light dark:bg-hover-dark rounded-lg shadow-sm px-2 py-1">
		<div class="flex justify-between px-2 mb-1 py-4">
			<div>
				<span class="text-sm font-bold">{{ title }}</span>
			</div>
			<ULink @click="setSortMode">
				<span class="text-sm font-medium text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('more') }}</span>
			</ULink>
		</div>
		<ul class="px-2">
			<li
				v-for="market in localItems"
				:key="`${title}-${market.id}`"
				:class="{
					[bgClass]: changedItems[market.id],
					'hover:bg-primary-gray-light hover:dark:bg-primary-gray-dark': !changedItems[market.id],
				}"
				class="flex justify-between items-center my-4 pr-1 rounded duration-200 transition-all"
			>
				<div
					class="flex justify-start w-28 text-left items-center cursor-pointer"
					@click="router.push(`/spot/${splitMarket(market?.mSymbol)}`)"
				>
					<img
						:src="`https://api-bitland.site/media/currency/${market?.currency?.cSymbol}.png`"
						:alt="market?.currency?.cName"
						class="w-5 h-5 rounded-full"
						format="webp"
						densities="x1"
					>
					<div class="text-sm font-normal mr-1">
						<span>{{ market?.currency?.cSymbol }}</span>
						<span class="mx-0.5">/</span>
						<span>{{ market?.quote?.cSymbol }}</span>
					</div>
				</div>
				<div class="w-28 text-left">
					<span class="text-sm font-normal">{{ useNumber(priceFormat(market.indexPrice)) }}</span>
				</div>
				<div class="w-24">
					<UiChangeIndicator
						pl="pl-0"
						size="text-sm"
						:change="parseFloat(String(market.priceChangePercIn24H))"
						:icon="false"
					/>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import type { MarketL47Item } from '~/types/definitions/market.types';
import { priceFormat } from '~/utils/helpers';
import { splitMarket } from '~/utils/split-market';

interface Props {
	title: string;
	items: MarketL47Item[];
	sortMode: number;
}

const props = defineProps<Props>();

const marketsPageStore = useMarketsPageStore();
const publicSocketStore = usePublicSocketStore();

const router = useRouter();

const localItems = ref<MarketL47Item[]>([...props.items]);

const setSortMode = () => {
	marketsPageStore.handleSelectMarketFilter(props.sortMode);
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
				const index = localItems.value.findIndex((item) => item.id === marketId);

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

						if (newIndexPrice > prevIndexPrice) {
							bgClass.value = 'bg-[#c8ffc8] dark:bg-[#13241f]';
						}
						else {
							bgClass.value = 'bg-[#ffc8c8] dark:bg-[#2b181c]';
						}

						setTimeout(() => {
							changedItems.value[marketId] = false;
							bgClass.value = '';
						}, 500);

						localItems.value[index] = {
							...localItems.value[index],
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
</script>
