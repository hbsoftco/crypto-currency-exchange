<template>
	<div dir="rtl">
		<div
			v-if="!headerMenuStore.initFilterLoading"
			class="mb-2"
		>
			<UiTagSlide
				:tags="headerMenuStore.tagItems"
				@tag-selected="setTag"
			/>
		</div>
		<div
			v-if="!headerMenuStore.spotMarketItems.length"
			class="max-h-72 min-h-72 text-center text-sm pt-8 overflow-y-scroll"
		>
			{{ $t("isLoading") }} ...
		</div>
		<div
			v-else
			class="max-h-72 min-h-72 overflow-y-scroll"
		>
			<div
				v-for="(market, index) in headerMenuStore.spotMarketItems"
				:key="index"
				class="mx-1 my-1 py-1 cursor-pointer border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark rounded hover:bg-primary-gray-light hover:dark:bg-primary-gray-dark duration-200 transition-all"
			>
				<div
					class="flex justify-between"
				>
					<ULink
						class="flex items-center justify-start"
						:to="type==='spot' ? `/spot/${splitMarket(market?.currency?.cSymbol + quote)}`: checkPathLink('/fast-trade', false)"
					>
						<img
							:src="`https://api-bitland.site/media/currency/${market?.currency?.cSymbol}.png`"
							:alt="market?.currency?.cName"
							class="w-6 h-6 mr-1 rounded-full"
							format="webp"
							densities="x1"
						>
						<div
							class="flex mr-1 items-center"
							dir="ltr"
						>
							<span class="text-sm font-normal">{{
								market?.currency?.cSymbol
							}}</span>/
							<span
								class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark"
							>
								{{ quote }}
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
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// import MenuTradeFilters from './MenuTradeFilters.vue';

import { splitMarket } from '~/utils/split-market';
import ChangePrice from '~/components/ui/ChangePrice.vue';
import type { Tag } from '~/types/definitions/tag.types';

interface Props {
	type: 'spot' | 'fast-trade';
	quote: 'TMN' | 'USDT';
}

const props = defineProps<Props>();
const { checkPathLink } = useLinkManager();
const headerMenuStore = useHeaderMenuStore();

const setTag = async (tag: Tag) => {
	console.log(tag);
	if (props.type === 'spot') {
		headerMenuStore.spotParams.tagTypeId = String(tag.id);
		await headerMenuStore.getInitMarkets('spot');
	}
	else {
		headerMenuStore.fastTradeParams.tagTypeId = String(tag.id);
		await headerMenuStore.getInitMarkets('fast-trade');
	}
};
</script>
