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
					<div v-if="item.key === 'depositBankCard'">
						<DepositBankCard />
					</div>
					<div v-else-if="item.key === 'depositID'">
						<DepositID />
						<DepositIDInfo />
					</div>
				</div>
			</template>
		</UTabs>
	</div>
</template>

<script setup lang="ts">
import DepositID from '~/components/pages/Site/Wallet/DepositToman/Form/DepositID.vue';
import DepositBankCard from '~/components/pages/Site/Wallet/DepositToman/Form/DepositBankCard.vue';
import DepositIDInfo from '~/components/pages/Site/Wallet/DepositToman/Form/DepositIDInfo.vue';

const items = [
	{
		key: 'depositBankCard',
		label: 'depositBankCard',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'depositID',
		label: 'depositID',
		content: 'And, this is the content for Tab2',
	},
];
</script>
