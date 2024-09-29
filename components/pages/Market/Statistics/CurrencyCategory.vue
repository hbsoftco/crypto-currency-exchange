<template>
	<div class="bg-hover-light dark:bg-hover-dark rounded-lg shadow-lg p-4 mb-4 w-[16.625rem] select-none">
		<!-- Header with Status Bar -->
		<div class="mb-2">
			<h3
				class="text-sm font-bold text-right mb-2"
				dir="rtl"
			>
				{{ item.tag }}
			</h3>
			<div class="flex items-center space-x-1">
				<div
					class="bg-green-500 h-2 rounded-sm"
					:style="{ width: `${positiveWidth}%` }"
				/>
				<div
					class="bg-gray-500 h-2 rounded-sm"
					:style="{ width: `${neutralWidth}%` }"
				/>
				<div
					class="bg-red-500 h-2 rounded-sm"
					:style="{ width: `${negativeWidth}%` }"
				/>
			</div>
		</div>
		<!-- List of Items -->
		<ul
			class="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 h-44"
			dir="rtl"
		>
			<li
				v-for="(currency, index) in item.markets"
				:key="index"
				dir="ltr"
				class="flex justify-between items-center py-1"
			>
				<UiChangePrice
					classes="text-sm font-normal"
					:show-percent="true"
					pl="pl-2"
					:change="parseFloat(String(currency.priceChangePercIn24H))"
					:icon="false"
				/>
				<div class="flex justify-start">
					<span class="text-sm font-normal mx-2">{{ currency.currencyDetails?.cSymbol }} USDT</span>
					<NuxtImg
						:src="`https://api-bitland.site/media/currency/${currency.currencyDetails?.cSymbol}.png`"
						:alt="currency.currencyDetails?.cName"
						class="w-5 h-5 rounded-full"
						format="webp"
						densities="x1"
					/>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import type { MarketCurrencyCategoryItem } from '~/types/response/market.types';

interface PropsDefinition {
	item: MarketCurrencyCategoryItem;
}

const props = defineProps<PropsDefinition>();

const numberPositive = computed(() => {
	return props.item.markets.filter((market) => parseFloat(market.priceChangePercIn24H) > 2).length;
});

const numberNegative = computed(() => {
	return props.item.markets.filter((market) => parseFloat(market.priceChangePercIn24H) < -2).length;
});

const numberNeutral = computed(() => {
	return props.item.markets.filter((market) => {
		const change = parseFloat(market.priceChangePercIn24H);
		return change > -2 && change < 2;
	}).length;
});

const sum = computed(() => numberPositive.value + numberNegative.value + numberNeutral.value);

const positiveWidth = computed(() => (numberPositive.value / sum.value) * 100);
const neutralWidth = computed(() => (numberNeutral.value / sum.value) * 100);
const negativeWidth = computed(() => (numberNegative.value / sum.value) * 100);
</script>
