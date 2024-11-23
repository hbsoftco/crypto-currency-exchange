<template>
	<div class="flex items-center pr-2">
		<img
			v-if="market.currency"
			:src="`https://api-bitland.site/media/currency/${market?.currency?.cSymbol}.png`"
			:alt="market?.currency?.cName"
			class="w-4 h-4 md:w-8 md:h-8 rounded-full"
		>
		<div class="mr-2 md:mr-4">
			<div
				class="border-b border-primary-gray-light dark:border-primary-gray-dark pb-0 md:pb-1"
			>
				<strong class="text-sm md:text-base text-text-dark dark:text-text-light">{{ market?.currency?.cName }}</strong>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50 px-0.5">/</span>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50">{{ market?.quote?.cName }}</span>
			</div>
			<div
				v-if="isMobile"
				class="text-right block pt-1"
				dir="ltr"
			>
				<strong class="text-sm md:text-base text-text-dark dark:text-text-light">{{ market?.currency?.cSymbol }}</strong>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50 px-0.5">/</span>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50">{{ market?.quote?.cSymbol }}</span>
			</div>
			<div
				v-if="!isHovered && !isMobile"
				class="text-right block pt-1"
				dir="ltr"
			>
				<strong class="text-sm md:text-base text-text-dark dark:text-text-light">{{ market?.currency?.cSymbol }}</strong>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50 px-0.5">/</span>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50">{{ market?.quote?.cSymbol }}</span>
			</div>
			<div
				v-if="isHovered && !isMobile"
				class="block"
			>
				<UButton
					:to="`/spot/${splitMarket(market?.mSymbol)}`"
					size="2xs"
					class="px-6 font-medium text-sm rounded rounded-l-none"
				>
					{{ $t('trade') }}
				</UButton>
				<UButton
					:to="`/coins/${market?.currency?.cSymbol}`"
					size="2xs"
					variant="link"
					class="px-6 font-medium text-sm border rounded-sm rounded-r-none border-none outline-none"
				>
					{{ $t('detail') }}
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { MarketL21 } from '~/types/definitions/market.types';
import { splitMarket } from '~/utils/split-market';

interface Props {
	market: MarketL21;
	isHovered: boolean;
}
defineProps<Props>();

const { $mobileDetect } = useNuxtApp();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
});
</script>
