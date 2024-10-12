<template>
	<div dir="rtl">
		<div class="mb-2">
			<MenuTradeFilters
				:tags="tags"
				@selected-tag="selectedTag"
			/>
		</div>
		<div
			v-if="isLoading"
			class="max-h-72 min-h-72 text-center text-sm pt-8 overflow-y-scroll"
		>
			{{ $t('isLoading') }} ...
		</div>
		<div
			v-else
			class="max-h-72 min-h-72 overflow-y-scroll"
		>
			<div
				v-for="(market, index) in markets"
				:key="index"
				class="mx-1 cursor-pointer border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark"
			>
				<ULink
					to="/fast-trade"
					class="flex justify-between"
				>
					<ULink
						class="flex items-center justify-start"
						:to="`/spot/${splitMarket(market?.marketBriefItem?.mSymbol)}`"
					>
						<NuxtImg
							:src="`https://api-bitland.site/media/currency/${market?.marketBriefItem?.currencyBriefItem?.cSymbol}.png`"
							:alt="market?.marketBriefItem?.currencyBriefItem?.cName"
							class="w-4 h-4 mr-1 rounded-full"
							format="webp"
							densities="x1"
						/>
						<div class="flex mr-1 items-center">
							<span class="text-xs font-normal">{{ market?.marketBriefItem?.currencyBriefItem?.cName }}</span>/
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ market.marketBriefItem?.quoteItem?.cName }}
							</span>
						</div>
					</ULink>
					<div
						class="text-left"
						dir="ltr"
					>
						<ChangePrice
							classes="text-sm font-normal"
							:show-percent="true"
							pl="pl-2"
							:change="parseFloat(String(market.priceChangePercIn24H))"
							:icon="false"
						/>
					</div>
				</ULink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import MenuTradeFilters from './MenuTradeFilters.vue';

import { splitMarket } from '~/utils/splitMarket';
import type { Tag } from '~/types/response/tag.types';
import type { MarketL16 } from '~/types/response/market.types';
import ChangePrice from '~/components/ui/ChangePrice.vue';

interface Props {
	tags: Tag[];
	markets: MarketL16[];
	isLoading: boolean;
}

defineProps<Props>();

interface EmitDefinition {
	(event: 'selectedTag', value: number): void;
}

const emit = defineEmits<EmitDefinition>();

const selectedTag = (event: number) => {
	emit('selectedTag', event);
};
</script>
