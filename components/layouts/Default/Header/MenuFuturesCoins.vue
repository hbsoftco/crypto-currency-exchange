<template>
	<div dir="rtl">
		<div class="mb-2">
			<UiTagSlide
				:tags="headerMenuStore.tagItems"
				@tag-selected="setTag"
			/>
		</div>
		<div
			v-if="!headerMenuStore.futuresMarketItems.length"
			class="max-h-72 min-h-72 text-center text-sm pt-8 overflow-y-scroll"
		>
			{{ $t("isLoading") }} ...
		</div>
		<div
			v-else
			class="max-h-72 min-h-72 overflow-y-scroll"
		>
			<div
				v-for="(market, index) in headerMenuStore.futuresMarketItems"
				:key="index"
				class="mx-1 my-1 py-1 cursor-pointer border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark duration-200 transition-all hover:bg-hover-light dark:hover:bg-hover-dark"
			>
				<ULink
					to="#"
					class="flex justify-between"
				>
					<ULink
						class="flex items-center justify-start"
						to=""
					>
						<!-- :to="`/futures/${splitMarket(market?.currency?.cSymbol + quote)}`" -->
						<img
							:src="`https://api-bitland.site/media/currency/${market?.currency?.cSymbol}.png`"
							:alt="market?.currency?.cName"
							class="w-6 h-6 mr-1 rounded-full"
							format="webp"
							densities="x1"
							@error="handleImageError"
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
				</ULink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// import { splitMarket } from '~/utils/split-market';
import ChangePrice from '~/components/ui/ChangePrice.vue';
import { handleImageError } from '~/utils/helpers';
import type { Tag } from '~/types/definitions/tag.types';

interface Props {
	type: 'futures';
	quote: 'USDT';
}

defineProps<Props>();

const headerMenuStore = useHeaderMenuStore();

const setTag = async (tag: Tag) => {
	headerMenuStore.futuresParams.tagTypeId = String(tag.id);
	await headerMenuStore.getInitFuturesMarkets();
};
</script>
