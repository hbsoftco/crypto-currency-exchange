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
				v-for="market in items"
				:key="`${title}-${market.id}`"
				class="flex justify-between items-center my-4"
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
import type { MarketState } from '~/types/definitions/market.types';
import { priceFormat } from '~/utils/price-format';
import { splitMarket } from '~/utils/split-market';

interface Props {
	title: string;
	items: MarketState[];
	sortMode: number;
}

const props = defineProps<Props>();

const marketsPageStore = useMarketsPageStore();

const setSortMode = () => {
	marketsPageStore.handleSelectMarketFilter(props.sortMode);
};

const router = useRouter();
</script>
