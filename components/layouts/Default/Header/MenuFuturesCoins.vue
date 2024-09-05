<template>
	<div dir="rtl">
		<div class="mb-2">
			<MenuTradeFilters />
		</div>
		<div
			v-for="(coin, index) in coins"
			:key="index"
			class="mx-1 cursor-pointer border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark py-2 pb-3"
		>
			<div class="flex justify-start items-center">
				<NuxtImg
					src="/images/delete/bitcoin.png"
					alt="bitcoin"
					class="w-4 h-4 ml-2"
				/>
				<div>
					<span class="text-base font-medium">BTC</span>
					<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-50 mx-1">/</span>
					<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-50">USDT</span>
				</div>
			</div>
			<div class="flex justify-start items-center text-sm font-normal text-subtle-text-light dark:text-subtle-text-50">
				<span>ببیتکوین</span>
				<span class="mx-1">/</span>
				<span>تتر</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import MenuTradeFilters from './MenuTradeFilters.vue';

const coins = [1, 2, 3, 4, 5, 6, 6, 3];
</script>
