<template>
	<div>
		<div
			class="grid grid-cols-12 gap-0 text-center text-sm pb-5 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div
				class="col-span-5 md:col-span-2 border-l-2 border-primary-gray-light dark:border-primary-gray-dark flex justify-center items-center"
			>
				<span class="text-base font-bold">{{ $t("tradingMarkets") }}</span>
			</div>
			<div class="col-span-4 md:col-span-2 flex justify-center items-center">
				<span
					class="ml-2 text-primary-yellow-light font-bold dark:text-primary-yellow-dark cursor-pointer"
				>{{ $t("hottest") }}</span>
				<UIcon
					name="i-heroicons-chevron-down"
					class="w-5 h-5 text-primary-yellow-light dark:text-primary-yellow-dark cursor-pointer"
				/>
			</div>
			<div class="col-span-6 hidden md:block">
				<TradingMarketsHeaderItems class="" />
			</div>
			<div class="col-span-2 pr-8 text-center flex justify-center items-center">
				<span class="flex justify-center items-center cursor-pointer">
					<span
						class="ml-2 text-primary-yellow-light font-bold dark:text-primary-yellow-dark"
					>{{ $t("toman") }}</span>
					<UIcon
						name="i-heroicons-chevron-down"
						class="w-5 h-5 text-primary-yellow-light dark:text-primary-yellow-dark"
					/>
				</span>
			</div>
		</div>
		<!-- <div class="block md:hidden">
			<div class="grid grid-cols-1">
				<TradingMarketsHeaderItems class="col-span-1 max-w-full" />
			</div>
		</div> -->
	</div>
</template>

<script setup lang="ts">
import TradingMarketsHeaderItems from './TradingMarketsHeaderItems.vue';
</script>
