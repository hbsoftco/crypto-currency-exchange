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
					v-if="item.key === 'phoneNumber'"
					class="space-y-3"
				>
					<WithMobile />
				</div>
				<div
					v-else-if="item.key === 'email'"
					class="space-y-3"
				>
					<WithEmail />
				</div>
			</template>
		</UTabs>
	</div>
</template>

<script setup lang="ts">
const items = [
	{
		key: 'orderList',
		label: 'orderList',
		content: '',
	},
	{
		key: 'latestTrades',
		label: 'latestTrades',
		content: '',
	},
];
</script>
