<template>
	<div>
		<section>
			<div class="p-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<h1 class="text-xl font-bold">
					{{ $t('history') }}
				</h1>
			</div>
			<div class="relative">
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
							v-if="item.key === 'deposit'"
							class="space-y-3"
						>
							<Deposit />
						</div>
						<div
							v-else-if="item.key === 'pickedUp'"
							class="space-y-3"
						>
							<Withdraw />
						</div>
						<div
							v-else-if="item.key === 'transfer'"
							class="space-y-3"
						>
							<Transfer />
						</div>
						<div
							v-else-if="item.key === 'subsetIncome'"
							class="space-y-3"
						>
							<SubsetIncome />
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
							<Other />
						</div>
					</template>
				</UTabs>

				<div class="absolute left-4 top-3">
					<IconPdf class="text-2xl text-subtle-text-light dark:text-subtle-text-dark cursor-pointer " />
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import SubsetIncome from '~/components/pages/Site/Wallet/Menu/History/SubsetIncome/index.vue';
import Award from '~/components/pages/Site/Wallet/Menu/History/Award/index.vue';
import Other from '~/components/pages/Site/Wallet/Menu/History/Other/index.vue';
import Transfer from '~/components/pages/Site/Wallet/Menu/History/Transfer/index.vue';
import Deposit from '~/components/pages/Site/Wallet/Menu/History/Deposit/index.vue';
import IconPdf from '~/assets/svg-icons/wallet/pdf.svg';
import Withdraw from '~/components/pages/Site/Wallet/Menu/History/Withdraw/index.vue';

definePageMeta({
	layout: 'asset',
	middleware: 'auth',
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
