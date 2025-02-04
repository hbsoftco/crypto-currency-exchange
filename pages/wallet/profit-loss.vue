<template>
	<div>
		<div class="p-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
			<h1 class="text-xl font-bold">
				{{ $t('depositAddresses') }}
			</h1>
		</div>
		<section>
			<UTabs
				:items="items"
				dir="rtl"
				class="text-right"
				:ui="{
					container: 'mt-0',
					list: {
						padding: 'pl-4 pt-4',
						tab: {
							size: 'text-base font-bold',
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
						<div v-if="item.key === 'spot'">
							<Spot />
						</div>
						<div v-else-if="item.key === 'futures'">
							dee
						</div>
					</div>
				</template>
			</UTabs>
		</section>
	</div>
</template>

<script setup lang="ts">
import Spot from '~/components/pages/Site/Wallet/Menu/ProfitLoss/Spot/index.vue';

definePageMeta({
	layout: 'asset',
	middleware: 'auth',
});

const items = [
	{
		key: 'spot',
		label: 'spot',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'futures',
		label: 'futures',
		content: 'And, this is the content for Tab2',
	},
];
</script>
