<template>
	<ULink
		:to="`/coins/${market?.currency?.cSymbol}`"
		class="flex justify-between items-center"
	>
		<div class="flex">
			<img
				:src="`https://api-bitland.site/media/currency/${market?.currency?.cSymbol}.png`"
				alt="bitcoin Logo"
				class="w-5 h-5 ml-1"
			>
			<span class="text-sm font-normal">{{ market.mSymbol }}</span>
		</div>
		<div>
			<span class="text-sm font-normal">0</span>
		</div>
		<div>
			<span class="text-sm font-normal text-accent-green">+0%</span>
		</div>
	</ULink>
</template>

<script setup lang="ts">
import type { MarketBrief } from '~/types/definitions/market.types';

interface PropsDefinition {
	market: MarketBrief;
}

defineProps<PropsDefinition>();
</script>
