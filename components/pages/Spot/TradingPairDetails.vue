<template>
	<div
		class="w-full h-8 bg-background-light dark:bg-background-dark px-20 py-1"
		dir="ltr"
	>
		<UCarousel
			v-slot="{ item }"
			:items="markets"
			:ui="{
				item: 'basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/6 snap-center md:snap-start',
				indicators: {
					wrapper: 'flex items-center justify-center gap-3 inset-x-0',
					base: 'rounded h-2 w-4',
					active: 'bg-primary-yellow-light dark:bg-primary-yellow-dark h-2 w-8',
					inactive: 'bg-secondary-gray-light dark:bg-secondary-gray-dark',
				},
			}"
			:prev-button="{
				variant: 'link',
				icon: 'i-heroicons-chevron-right',
				class: '-left-10',
			}"
			:next-button="{
				variant: 'link',
				icon: 'i-heroicons-chevron-left',
				class: '-right-10',
			}"
			arrows
			class="w-full mx-auto"
		>
			<div class="px-0 md:px-4 w-full md:w-auto py-1 pt-2 select-none">
				<div class="flex justify-between items-center">
					<div class="font-normal text-[11px]">
						<span>BTC Perpetual</span>
						<span class="mx-0.5 text-secondary-gray-light dark:text-secondary-gray-50">/</span>
						<span class="text-secondary-gray-light dark:text-secondary-gray-50">USDT</span>
					</div>

					<div class="mx-5">
						<UiChangePrice
							classes="text-[11px] font-normal "
							:show-percent="true"
							pl="pl-2"
							:change="parseFloat(String(item))"
							:icon="false"
						/>
					</div>
					<div class="text-[11px] text-secondary-gray-light pr-4 dark:text-secondary-gray-50 border-r dark:border-secondary-gray-50">
						0.0065
					</div>
				</div>
			</div>
		</UCarousel>
	</div>
</template>

<script setup lang="ts">
const markets = [-32321, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4];
</script>
