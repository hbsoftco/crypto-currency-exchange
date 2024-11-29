<template>
	<div class="w-full">
		<ul>
			<li
				v-for="market in localMarkets"
				:key="`market-state-${market.id}`"
				:class="{
					[bgClass]: changedItems[market.id],
					'hover:bg-primary-gray-light hover:dark:bg-primary-gray-dark': !changedItems[market.id],
				}"
				class="flex cursor-pointer justify-between items-center px-2 py-3 hover:bg-primary-gray-light hover:dark:bg-primary-gray-dark rounded duration-200 transition-all"
				@click="router.push(`/spot/${splitMarket(market?.mSymbol)}`)"
			>
				<div
					class="flex justify-between"
				>
					<img
						:src="`https://api-bitland.site/media/currency/${market?.currency?.cSymbol}.png`"
						:alt="market?.currency?.cName"
						class="w-8 h-8 rounded-full"
						format="webp"
						densities="x1"
					>
					<div class="flex flex-col mr-2">
						<span class="text-sm font-normal">{{ market?.mSymbol }}</span>
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ market?.currency?.cName }}
						</span>
					</div>
				</div>
				<div>
					<div>
						<span class="text-sm font-normal mr-1">{{ priceFormat(market?.indexPrice) }}</span>
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ market?.quote?.cSymbol }}
						</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { splitMarket } from '~/utils/split-market';
import type { MarketL47Item } from '~/types/definitions/market.types';
import { priceFormat } from '~/utils/price-format';

interface Props {
	markets: MarketL47Item[];
}

const props = defineProps<Props>();

const router = useRouter();

const publicSocketStore = usePublicSocketStore();

const localMarkets = ref<MarketL47Item[]>([...props.markets]);

const changedItems = ref<{ [key: string]: boolean }>({});
const prevData = ref<{ [key: string]: { indexPrice: number; priceChangePercIn24H: number } }>({});
const bgClass = ref<string>('');

watch(
	() => publicSocketStore.latestMarketData,
	(newData) => {
		if (newData) {
			newData.forEach((updatedMarket) => {
				const marketId = updatedMarket.data.mi;
				const index = localMarkets.value.findIndex((item) => item.id === marketId);

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

						localMarkets.value[index] = {
							...localMarkets.value[index],
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
