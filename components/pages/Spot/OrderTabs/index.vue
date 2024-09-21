<template>
	<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2">
		<UTabs
			:items="items"
			:ui="{
				list: {
					tab: {
						font: 'font-normal',
						size: 'text-sm',
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
				<div
					v-if="item.key === 'openOrders'"
					class="space-y-3"
				>
					<h2>openOrders</h2>
				</div>
				<div
					v-else-if="item.key === 'orderHistory'"
					class="space-y-3"
				>
					<h2>orderHistory</h2>
				</div>
				<div
					v-else-if="item.key === 'tradeHistory'"
					class="space-y-3"
				>
					<h2>tradeHistory</h2>
				</div>
			</template>
		</UTabs>
	</div>
</template>

<script setup lang="ts">
const items = [
	{
		key: 'openOrders',
		label: 'openOrders',
		content: '',
	},
	{
		key: 'orderHistory',
		label: 'orderHistory',
		content: '',
	},
	{
		key: 'tradeHistory',
		label: 'tradeHistory',
		content: '',
	},
];
</script>
