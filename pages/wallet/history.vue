<template>
	<div>
		<section>
			<div class="p-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<h1 class="text-xl font-bold">
					{{ $t('history') }}
				</h1>
			</div>
			<UTabs
				:items="items"
				:ui="{
					list: {
						tab: {
							font: 'font-normal',
							size: 'text-sm',
							border: 'border-none',
						},
					},
				}"
			>
				<template #default="{ item, selected }">
					<span
						class="truncate px-4 border-none py-2"
						:class="[selected && ' bg-primary-yellow-light dark:bg-primary-yellow-dark border-b-none']"
					>{{ $t(item.label) }}</span>
				</template>
				<template #item="{ item }">
					<div
						v-if="item.key === 'deposit'"
						class="space-y-3"
					>
						ffff
					</div>
					<div
						v-else-if="item.key === 'pickedUp'"
						class="space-y-3"
					>
						ooo
					</div>
					<div
						v-else-if="item.key === 'transfer'"
						class="space-y-3"
					>
						ooo
					</div>
					<div
						v-else-if="item.key === 'subsetIncome'"
						class="space-y-3"
					>
						ooo
					</div>
					<div
						v-else-if="item.key === 'awards'"
						class="space-y-3"
					>
						<Award />
					</div>
					<div
						v-else-if="item.key === 'other'"
						class="space-y-3"
					>
						<Order />
					</div>
				</template>
			</UTabs>
		</section>
	</div>
</template>

<script setup lang="ts">
import Award from '~/components/pages/Site/Wallet/History/Award/Award.vue';
import Order from '~/components/pages/Site/Wallet/History/Order/Order.vue';

definePageMeta({
	layout: 'wallet',
});

const items = [
	{
		key: 'deposit',
		label: 'deposit',
		content: '',
	},
	{
		key: 'pickedUp',
		label: 'pickedUp',
		content: '',
	},
	{
		key: 'transfer',
		label: 'transfer',
		content: '',
	},
	{
		key: 'subsetIncome',
		label: 'subsetIncome',
		content: '',
	},
	{
		key: 'awards',
		label: 'awards',
		content: '',
	},
	{
		key: 'other',
		label: 'other',
		content: '',
	},
];
</script>
