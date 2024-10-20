<template>
	<div class="w-full">
		<ul>
			<li
				v-for="market in items"
				:key="`market-state-${market.id}`"
				class="flex justify-between items-center my-3 mx-2"
			>
				<ULink
					class="flex justify-between"
					:to="`/spot/${market?.marketBriefItem?.currencyBriefItem?.cSymbol}`"
				>
					<NuxtImg
						:src="`https://api-bitland.site/media/currency/${market?.marketBriefItem?.currencyBriefItem?.cSymbol}.png`"
						:alt="market?.marketBriefItem?.currencyBriefItem?.cName"
						class="w-8 h-8 rounded-full"
						format="webp"
						densities="x1"
					/>
					<div class="flex flex-col mr-2">
						<span class="text-sm font-normal">{{ market?.marketBriefItem?.mSymbol }}</span>
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ market?.marketBriefItem?.currencyBriefItem?.cSymbol }}
						</span>
					</div>
				</ULink>
				<div>
					<div>
						<span class="text-sm font-normal mr-1">{{ useNumber(market?.indexPrice) }}</span>
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ market?.marketBriefItem?.quoteItem?.cSymbol }}
						</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import type { MarketState } from '~/types/response/market.types';

interface Props {
	items: MarketState[];
}

defineProps<Props>();
</script>
