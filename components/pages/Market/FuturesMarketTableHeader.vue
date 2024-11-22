<template>
	<div>
		<div
			class="grid grid-cols-12 gap-0 text-center text-sm pb-5 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="col-span-4 flex justify-start items-center">
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
							class="ml-2 text-primary-yellow-light font-bold dark:text-primary-yellow-dark"
						>{{ marketsPageStore.futuresSelectedSortModeFilter.label }}</span>
						<UIcon
							name="i-heroicons-chevron-down"
							class="w-5 h-5 text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
					</span>
				</UDropdown>
			</div>
			<div class="col-span-6">
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
							class="ml-2 text-primary-yellow-light font-bold dark:text-primary-yellow-dark"
						>{{ marketsPageStore.futuresSelectedQuote.label }}</span>
						<UIcon
							name="i-heroicons-chevron-down"
							class="w-5 h-5 text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
					</span>
				</UDropdown>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Tag } from '~/types/definitions/tag.types';

const marketsPageStore = useMarketsPageStore();

const setTag = (tag: Tag) => {
	marketsPageStore.futuresMarketsParams.tagTypeId = String(tag.id);
};
</script>
