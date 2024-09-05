<template>
	<div class="bg-primary-gray-light dark:bg-hover2-50">
		<UTabs
			:items="items"
			dir="ltr"
			class="text-left"
			:ui="{
				container: 'mt-0',
				list: {
					padding: 'pl-4 pt-4',
					tab: {
						size: 'text-xs',
						padding: 'px-2',
					},
				},
			}"
		>
			<template #default="{ item, selected }">
				<span
					class="truncate"
					:class="[selected && 'text-primary-500 dark:text-primary-400']"
				>{{ $t(item.label) }}</span>
			</template>
			<template #item="{ item }">
				<div class="border-t border-t-primary-gray-light dark:border-t-primary-gray-dark p-2">
					<div v-if="item.key === 'USDT'">
						<MenuFutureCoins />
					</div>
					<div v-else-if="item.key === 'BTC'">
						<MenuFutureCoins />
					</div>
					<div v-else-if="item.key === 'toman'">
						<MenuFutureCoins />
					</div>
				</div>
			</template>
		</UTabs>
	</div>
</template>

<script setup lang="ts">
import MenuFutureCoins from './MenuFuturesCoins.vue';

const items = [
	{
		key: 'USDT',
		label: 'USDT',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'BTC',
		label: 'BTC',
		content: 'And, this is the content for Tab2',
	},
	{
		key: 'toman',
		label: 'toman',
		content: 'And, this is the content for Tab2',
	},
];
</script>

<style></style>
