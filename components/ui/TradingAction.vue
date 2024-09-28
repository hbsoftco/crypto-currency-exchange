<template>
	<div class="flex items-center">
		<NuxtImg
			:src="`https://api-bitland.site/media/currency/${coin.currencyBriefItem?.cSymbol}.png`"
			:alt="coin.currencyBriefItem?.cName"
			class="w-4 h-4 md:w-8 md:h-8 rounded-full"
			format="webp"
			densities="x1"
		/>
		<div class="mr-2 md:mr-4">
			<div
				class="border-b border-primary-gray-light dark:border-primary-gray-dark pb-0 md:pb-1"
			>
				<strong class="text-sm md:text-base text-text-dark dark:text-text-light">{{ coin.currencyBriefItem?.cName }}</strong>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50 px-1">/</span>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50">{{ coin.quoteItem?.cName }}</span>
			</div>
			<div
				class="block md:hidden text-right"
				dir="ltr"
			>
				<strong class="text-sm md:text-base text-text-dark dark:text-text-light">{{ coin.currencyBriefItem?.cSymbol }}</strong>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50 px-1">/</span>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50">{{ coin.quoteItem?.cSymbol }}</span>
			</div>
			<div class="hidden md:block">
				<div class="flex justify-center items-center">
					<UButton
						:to="`/spot/${coin?.mSymbol}`"
						class="text-xs font-normal text-black ml-1 py-1 rounded-l-none rounded-r-sm"
					>
						{{ $t("trade") }}
					</UButton>
					<div>
						<ULink :to="`/markets/market-detail/${coin?.currencyBriefItem?.id}`">
							<span
								class="text-xs font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
							>{{ $t("detail") }}</span>
						</ULink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { MarketBriefItem } from '~/types/response/brief-list.types';

interface Props {
	coin: MarketBriefItem;
}

defineProps<Props>();
</script>
