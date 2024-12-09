<template>
	<div>
		<div
			class="grid grid-cols-12 gap-0 text-center text-sm pb-5 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div
				class="col-span-5 md:col-span-2 border-l-2 border-primary-gray-light dark:border-primary-gray-dark flex justify-center items-center"
			>
				<span class="text-sm md:text-base font-bold">{{ $t("tradingMarkets") }}</span>
			</div>
			<div class="col-span-4 md:col-span-2 flex justify-center items-center">
				<UDropdown
					:items="marketsPageStore.sortModeFilters"
					:popper="{ arrow: true }"
					:ui="{
						width: 'w-auto',
						item: {
							padding: 'px-5',
						},
					}"
				>
					<span class="flex justify-center items-center cursor-pointer">
						<span
							class="ml-2 text-primary-yellow-light font-bold text-sm md:text-base dark:text-primary-yellow-dark"
						>{{ marketsPageStore.selectedSortModeFilter.label }}</span>
						<UIcon
							name="i-heroicons-chevron-down"
							class="w-4 md:w-5 h-4 md:h-5 text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
					</span>
				</UDropdown>
			</div>
			<div
				v-if="!isMobile"
				class="col-span-6 hidden md:block"
			>
				<template v-if="marketsPageStore.tagItems.length">
					<MarketsTags
						:tags="marketsPageStore.tagItems"
					/>
				</template>
			</div>
			<div class="col-span-2 pr-8 text-center flex justify-center items-center">
				<UDropdown
					:items="marketsPageStore.quoteOptions"
					:popper="{ arrow: true }"
					:ui="{
						width: 'w-auto',
						item: {
							padding: 'px-5',
						},
					}"
				>
					<span class="flex justify-center items-center cursor-pointer">
						<span
							class="ml-2 text-primary-yellow-light text-sm md:text-base font-bold dark:text-primary-yellow-dark"
						>{{ marketsPageStore.selectedQuote.label }}</span>
						<UIcon
							name="i-heroicons-chevron-down"
							class="w-4 md:w-5 h-4 md:h-5 text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
					</span>
				</UDropdown>
			</div>
		</div>
		<div
			v-if="isMobile"
			class="mt-2"
		>
			<UiTagSlide
				:tags="marketsPageStore.tagItems"
				@tag-selected="setTag"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import MarketsTags from '~/components/pages/MainPage/TradingMarkets/MarketsTags.vue';
import type { Tag } from '~/types/definitions/tag.types';

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const marketsPageStore = useMarketsPageStore();

const setTag = (tag: Tag) => {
	marketsPageStore.tradingMarketsParams.tagTypeId = String(tag.id);
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
});
</script>
