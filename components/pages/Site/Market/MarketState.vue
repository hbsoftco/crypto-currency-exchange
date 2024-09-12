<template>
	<div class="w-96 bg-hover-light dark:bg-hover-dark rounded-lg shadow-sm px-2 py-1">
		<div class="flex justify-between px-2 mb-1 py-4">
			<div>
				<span class="text-sm font-bold">{{ title }}</span>
			</div>
			<ULink to="">
				<span class="text-sm font-medium text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('more') }}</span>
			</ULink>
		</div>
		<ul class="px-2">
			<li
				v-for="market in items"
				:key="`${title}-${market.id}`"
				class="flex justify-between my-4"
			>
				<div class="flex justify-start w-28 text-left">
					<NuxtImg
						:src="`https://api-bitland.site/media/currency/${market.marketBriefItem.currencyBriefItem?.cSymbol}.png`"
						:alt="market.marketBriefItem.currencyBriefItem?.cName"
						class="w-5 h-5 rounded-full"
						format="webp"
						densities="x1"
					/>
					<div class="text-sm font-normal mr-1">
						<span>{{ market.marketBriefItem.currencyBriefItem?.cSymbol }}</span>
						<span class="mx-0.5">/</span>
						<span>{{ market.marketBriefItem?.quoteItem?.cSymbol }}</span>
					</div>
				</div>
				<div class="w-20 text-left">
					<span class="text-sm font-normal">{{ useNumber(market.indexPrice) }}</span>
				</div>
				<div class="w-20">
					<UiChangeIndicator
						pl="pl-0"
						:change="parseFloat(market.priceChangePercIn24H)"
						:icon="false"
					/>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import type { MarketState } from '~/types/response/market.types';

interface Props {
	title: string;
	items: MarketState[];
}

defineProps<Props>();
</script>
