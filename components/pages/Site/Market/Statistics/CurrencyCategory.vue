<template>
	<div class="bg-hover-light dark:bg-hover-dark rounded-lg shadow-lg p-4 mb-4 w-[16.625rem]">
		<!-- Header with Status Bar -->
		<div class="mb-2">
			<h3
				class="text-sm font-bold text-right mb-2"
				dir="rtl"
			>
				MEME
			</h3>
			<div class="flex items-center space-x-1">
				<div
					class="bg-green-500 h-2"
					style="width: 70%;"
				/>
				<div
					class="bg-gray-500 h-2"
					style="width: 10%;"
				/>
				<div
					class="bg-red-500 h-2"
					style="width: 20%;"
				/>
			</div>
		</div>
		<!-- List of Items -->
		<ul class="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 h-44">
			<li class="flex justify-between items-center py-1">
				<span class="text-green-500 text-sm font-normal">+1.24%</span>
				<div class="flex justify-start">
					<span class="text-sm font-normal mx-2">BTC USDT</span>
					<img
						src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
						alt="BTC"
						class="w-5 h-5"
					>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
// import { useNumber } from '~/composables/useNumber';
</script>
