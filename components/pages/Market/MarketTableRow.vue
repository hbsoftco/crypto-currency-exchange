<template>
	<tr class="text-center font-normal md:font-medium text-sm md:text-base hover:bg-hover-light dark:hover:bg-hover-dark py-3 group">
		<td
			class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-2 md:px-10 py-2"
		>
			<div class="flex items-center">
				<div class="block md:flex items-center text-center">
					<IconStar
						v-if="!isFavorite"
						class="text-2xl cursor-pointer pl-1 md:pl-0"
						@click="toggleFavorite"
					/>
					<IconFillStar
						v-else
						class="text-2xl pl-1 md:pl-0 text-primary-yellow-light dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark cursor-pointer"
						@click="toggleFavorite"
					/>
					<NuxtImg
						:src="`https://api-bitland.site/media/currency/${market?.marketBriefItem?.currencyBriefItem?.cSymbol}.png`"
						:alt="market?.marketBriefItem?.currencyBriefItem?.cName"
						class="w-4 md:w-8 h-4 md:h-8 mx-0 md:mx-2 rounded-full"
						format="webp"
						densities="x1"
					/>
				</div>
				<div class="text-right">
					<div
						class="border-b border-b-primary-gray-light pb-0.5 dark:border-b-primary-gray-dark"
					>
						<span class="text-sm font-normal">{{ market?.marketBriefItem?.currencyBriefItem?.cName }}</span>
						<span class="text-xs mx-0.5 text-subtle-text-light dark:text-subtle-text-dark">/</span>
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ market.marketBriefItem?.quoteItem?.cName }}</span>
					</div>
					<div class="block group-hover:hidden py-0.5">
						<span class="text-sm font-normal">{{ market?.marketBriefItem?.currencyBriefItem?.cSymbol }}</span>
						<span class="mx-0.5 text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">/</span>
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ market.marketBriefItem?.quoteItem?.cSymbol }}</span>
					</div>
					<div class="hidden group-hover:block">
						<div class="flex justify-start items-center">
							<UButton
								:to="`/spot/${market?.marketBriefItem?.mSymbol}`"
								class="text-xs font-normal text-black ml-1 py-1 rounded-l-none rounded-r-sm"
							>
								{{ $t("trade") }}
							</UButton>
							<div>
								<ULink :to="`/coins/${market?.marketBriefItem?.currencyBriefItem?.cSymbol}_${market?.marketBriefItem?.quoteItem?.cSymbol}`">
									<span
										class="text-xs font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
									>{{ $t("detail") }}</span>
								</ULink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</td>
		<td class="text-base font-medium px-2 md:px-10 text-left">
			<span>{{ useNumber(market?.indexPrice) }}</span>
			<span class="block md:hidden text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">
				{{ useNumber(market?.indexPrice) }}
			</span>
		</td>
		<td class="text-base font-medium px-2 md:px-10 text-left">
			<UiChangeIndicator
				pl="pl-0"
				:change="parseFloat(market.priceChangePercIn24H)"
				:icon="true"
			/>
		</td>
		<td class="text-sm font-normal px-10 md:table-cell hidden text-left">
			{{ useNumber(market?.hPriceIn24H) }}
		</td>
		<td class="text-sm font-normal px-10 md:table-cell hidden text-left">
			{{ useNumber(market?.lPriceIn24H) }}
		</td>
		<td
			class="text-sm font-normal px-10 md:table-cell hidden text-left"
			dir="ltr"
		>
			{{ useNumber(formatBigNumber(market?.volumeOfTradesIn24H, 2)) }}
		</td>
	</tr>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import { formatBigNumber } from '~/utils/format-big-number';
import IconStar from '~/assets/svg-icons/market/star.svg';
import IconFillStar from '~/assets/svg-icons/market/fill-star.svg';
import type { Market } from '~/types/response/market.types';

interface Props {
	market: Market;
}

defineProps<Props>();

const isFavorite = ref(false);

function toggleFavorite() {
	isFavorite.value = !isFavorite.value;
}
</script>
