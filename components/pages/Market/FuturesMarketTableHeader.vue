<template>
	<div>
		<div
			class="grid grid-cols-12 gap-0 text-center text-sm pb-5 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div
				v-if="isMobile"
				class="col-span-5 border-l-2 border-primary-gray-light dark:border-primary-gray-dark flex justify-center items-center"
			>
				<span class="text-sm md:text-base font-bold">{{ $t("tradingMarkets") }}</span>
			</div>
			<div class="col-span-4 md:col-span-3 flex justify-center md:justify-start items-center">
				<UDropdown
					:items="marketsPageStore.futuresSortModeFilters"
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
						>{{ marketsPageStore.futuresSelectedSortModeFilter.label }}</span>
						<UIcon
							name="i-heroicons-chevron-down"
							class="w-4 md:w-5 h-4 md:h-5 text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
					</span>
				</UDropdown>
			</div>
			<div
				v-if="!isMobile"
				class="col-span-7 hidden md:block"
			>
				<UiTagSlider
					:tags="marketsPageStore.tagItems"
					@tag-selected="setTag"
				/>
			</div>
			<div class="col-span-2 pr-8 text-center flex justify-center items-center">
				<UDropdown
					:items="marketsPageStore.futuresQuoteOptions"
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
						>{{ marketsPageStore.futuresSelectedQuote.label }}</span>
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
import type { Tag } from '~/types/definitions/tag.types';

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const marketsPageStore = useMarketsPageStore();

const setTag = (tag: Tag) => {
	marketsPageStore.futuresMarketsParams.tagTypeId = String(tag.id);
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
});
</script>
