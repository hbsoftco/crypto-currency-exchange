<template>
	<div class="w-full">
		<ul>
			<li
				v-for="market in markets"
				:key="`market-state-${market.id}`"
				class="flex justify-between items-center px-2 py-3 hover:bg-primary-gray-light hover:dark:bg-primary-gray-dark rounded duration-200 transition-all"
			>
				<ULink
					class="flex justify-between"
					:to="`/spot/${splitMarket(market?.mSymbol)}`"
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
							{{ market?.currency?.cSymbol }}
						</span>
					</div>
				</ULink>
				<div>
					<div>
						<span class="text-sm font-normal mr-1">{{ useNumber(priceFormat(market?.indexPrice)) }}</span>
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
import { useNumber } from '~/composables/useNumber';
import type { MarketState } from '~/types/definitions/market.types';
import { priceFormat } from '~/utils/price-format';

interface Props {
	markets: MarketState[];
}

defineProps<Props>();
</script>
