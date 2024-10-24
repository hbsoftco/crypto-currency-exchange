<template>
	<div dir="rtl">
		<div class="mb-2">
			<MenuTradeFilters />
		</div>
		<div
			v-for="(coin, index) in coins"
			:key="index"
			class="mx-1 cursor-pointer border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark"
		>
			<div class="flex justify-between">
				<div class="flex items-center">
					<img
						src="/images/delete/bitcoin.png"
						alt="Brand Logo"
						class="w-4 h-4 mr-1"
					>
					<div class="flex mr-1 items-center">
						<span class="text-xs font-normal">USDT</span>/
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">BTC</span>
					</div>
				</div>
				<div class=" text-xs font-normal text-left text-accent-red">
					<span>{{ useNumber('27022.70') }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import MenuTradeFilters from './MenuTradeFilters.vue';

import { useNumber } from '~/composables/useNumber';

const coins = [1, 2, 3, 4, 5, 6, 6, 3];
</script>
