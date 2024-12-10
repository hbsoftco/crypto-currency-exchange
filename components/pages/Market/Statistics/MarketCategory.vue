<template>
	<div class="bg-hover-light dark:bg-hover-dark rounded-lg shadow-lg p-4 mb-4 w-full md:w-[16.625rem] select-none ">
		<!-- Header with Status Bar -->
		<div class="mb-2">
			<h3
				class="text-sm font-bold text-right mb-2"
				dir="rtl"
			>
				{{ tag }}
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
			<template
				v-for="(market, index) in markets"
				:key="index"
			>
				<li
					v-if="market.currency?.cSymbol"
					dir="ltr"
					class="flex justify-between items-center py-1 pr-1 ml-1 hover:bg-primary-gray-light hover:dark:bg-primary-gray-dark rounded duration-200 transition-all"
				>
					<UiChangePrice
						:bg-color="false"
						classes="text-sm font-normal"
						:show-percent="true"
						pl="pl-2"
						:change="parseFloat(String(market.priceChangePercIn24H))"
						:icon="false"
					/>
					<ULink
						class="flex justify-start"
						:to="`/spot/${splitMarket(market.mSymbol)}`"
					>
						<span class="text-sm font-normal mx-2">{{ market.mSymbol }}</span>
						<img
							:src="`https://api-bitland.site/media/currency/${market.currency?.cSymbol}.png`"
							:alt="market.currency?.cName"
							class="w-5 h-5 rounded-full"
							format="webp"
							densities="x1"
							@error="handleImageError"
						>
					</ULink>
				</li>
			</template>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { splitMarket } from '~/utils/split-market';
import type { MarketL51Item } from '~/types/definitions/market.types';
import { handleImageError } from '~/utils/helpers';

interface PropsDefinition {
	markets: MarketL51Item[];
	tag: string;
}

const props = defineProps<PropsDefinition>();

const numberPositive = computed(() => {
	return props.markets.filter((market) => parseFloat(market.priceChangePercIn24H) > 2).length;
});

const numberNegative = computed(() => {
	return props.markets.filter((market) => parseFloat(market.priceChangePercIn24H) < -2).length;
});

const numberNeutral = computed(() => {
	return props.markets.filter((market) => {
		const change = parseFloat(market.priceChangePercIn24H);
		return change > -2 && change < 2;
	}).length;
});

const sum = computed(() => numberPositive.value + numberNegative.value + numberNeutral.value);

const positiveWidth = computed(() => (numberPositive.value / sum.value) * 100);
const neutralWidth = computed(() => (numberNeutral.value / sum.value) * 100);
const negativeWidth = computed(() => (numberNegative.value / sum.value) * 100);
</script>
