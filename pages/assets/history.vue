<template>
	<div
		v-if="false"
		class="py-4 p-3 md:p-5"
	>
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="py-4 p-3 md:p-5"
	>
		<section>
			<div class="pb-4 pt-1 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<h1 class="text-xl font-bold">
					{{ $t('history') }}
				</h1>
			</div>
			<div class="relative pt-4">
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
						<div class="border-t border-primary-gray-light dark:border-primary-gray-dark">
							<div
								v-if="item.key === 'deposit'"
								class="space-y-3"
							>
								<DepositTransactions />
							</div>
							<div
								v-else-if="item.key === 'pickedUp'"
								class="space-y-3"
							>
								<WithdrawTransactions />
							</div>
							<div
								v-else-if="item.key === 'transfer'"
								class="space-y-3"
							>
							<!-- <Transfer /> -->
							</div>
							<div
								v-else-if="item.key === 'subsetIncome'"
								class="space-y-3"
							>
								<SubTeamIncomeTransactions />
							</div>
							<div
								v-else-if="item.key === 'awards'"
								class="space-y-3"
							>
								<RewardTransactions />
							</div>
							<div
								v-else-if="item.key === 'other'"
								class="space-y-3"
							>
								<MiscellaneousTransactions />
							</div>
						</div>
					</template>
				</UTabs>

				<!-- <div class="absolute left-4 top-3">
					<IconPdf class="text-2xl text-subtle-text-light dark:text-subtle-text-dark cursor-pointer " />
				</div> -->
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
// import IconPdf from '~/assets/svg-icons/wallet/pdf.svg';
import RewardTransactions from '~/components/pages/Assets/History/RewardTransactions.vue';
import DepositTransactions from '~/components/pages/Assets/History/DepositTransactions.vue';
import WithdrawTransactions from '~/components/pages/Assets/History/WithdrawTransactions.vue';
import SubTeamIncomeTransactions from '~/components/pages/Assets/History/SubTeamIncomeTransactions.vue';
import MiscellaneousTransactions from '~/components/pages/Assets/History/MiscellaneousTransactions.vue';
// import SubsetIncome from '~/components/pages/Site/Wallet/Menu/History/SubsetIncome/index.vue';
// import Award from '~/components/pages/Site/Wallet/Menu/History/Award/index.vue';
// import Other from '~/components/pages/Site/Wallet/Menu/History/Other/index.vue';
// import Transfer from '~/components/pages/Site/Wallet/Menu/History/Transfer/index.vue';
// import Withdraw from '~/components/pages/Site/Wallet/Menu/History/Withdraw/index.vue';

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
