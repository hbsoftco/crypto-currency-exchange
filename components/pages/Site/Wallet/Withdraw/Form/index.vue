<template>
	<div>
		<UTabs
			:items="items"
			dir="rtl"
			class="text-right"
			:ui="{
				container: 'mt-0',
				list: {
					padding: 'pl-4 pt-4',
					tab: {
						size: 'text-sm font-bold',
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
					<div v-if="item.key === 'address'">
						<Address />
					</div>
					<div v-else-if="item.key === 'bitlandUsers'">
						<Users />
					</div>
				</div>
			</template>
		</UTabs>
	</div>
</template>

<script setup lang="ts">
import Address from '~/components/pages/Site/Wallet/Withdraw/Form/Address.vue';
import Users from '~/components/pages/Site/Wallet/Withdraw/Form/Users.vue';

const items = [
	{
		key: 'address',
		label: 'address',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'bitlandUsers',
		label: 'bitlandUsers',
		content: 'And, this is the content for Tab2',
	},
];
</script>
