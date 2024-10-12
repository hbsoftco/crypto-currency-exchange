<template>
	<div class="p-5">
		<section class="block md:flex justify-between my-0 md:mb-4">
			<div>
				<div class="my-1 md:my-4">
					<UiTitleWithBack :title="$t('yourFeeLevel')" />
				</div>
				<p class=" w-auto md:w-96 text-base font-medium mt-6">
					سطح کارمزد معاملات بر اساس حجم معامله‌های ۹۰ روز گذشته شما در هر پایه بازار محاسبه می‌شود.
				</p>
				<div class="flex items-center mt-10">
					<div class="w-[28.375rem] relative bg-primary-gray-light dark:bg-primary-gray-dark py-20 px-4 rounded-r-md overflow-hidden">
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							حجم معاملات ۹۰ روزه شما
						</p>
						<div class="absolute -top-16 -left-10 w-80 h-80 flex justify-center items-center border-4 border-accent-green bg-hover-light dark:bg-hover-dark rounded-full">
							<Chart />
						</div>
					</div>
				</div>
			</div>

			<div class="ml-0 md:ml-40  hidden md:block">
				<NuxtImg
					src="/images/profile/fees.png"
					alt="icon fees"
					class="w-[19.313rem] h-[21.063rem] mb-2"
				/>
				<div class="flex justify-between bg-hover-light dark:bg-hover-dark rounded-lg p-2">
					<div>
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('yourCurrentLevel') }}
						</span>
					</div>
					<div class="flex items-center">
						<NuxtImg
							src="/images/Confirmation.png"
							alt="Confirmation"
							class="w-4 h-4"
						/>
						<div>
							<span class="text-sm font-bold mr-1">سطح ماهی</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="py-4 px-0 md:px-8 rounded-md border-none md:border border-primary-gray-light dark:border-primary-gray-dark">
			<UTabs
				:items="items"
				:ui="
					{
						list: {
							background: 'bg-primary-gray-light dark:bg-primary-gray-dark md:bg-background-light md:dark:bg-background-dark',
							tab: {
								active: 'text-gray-900 dark:text-white bg-secondary-gray-light dark:bg-secondary-gray-dark',
								inactive: 'text-gray-500 dark:text-gray-400',
							},
						},
					}"
			>
				<template #default="{ item, selected }">
					<span
						class="truncate text-xs font-extralight md:font-bold md:text-base"
						:class="[selected && 'text-primary-yellow-light dark:text-primary-yellow-dark border-none border-b-primary-gray', !selected && 'text-black dark:text-white']"
					>{{ $t(item.label) }}</span>
				</template>
				<template #item="{ item }">
					<div
						v-if="item.key === 'transactionFees'"
						class="space-y-3"
					>
						<TransactionFees />
					</div>
					<div
						v-else-if="item.key === 'depositFee'"
						class="space-y-3"
					>
						<DepositFee />
					</div>
					<div
						v-else-if="item.key === 'withdrawalFee'"
						class="space-y-3"
					>
						<WithdrawalFee />
					</div>
				</template>
			</UTabs>
		</section>
	</div>
</template>

<script setup lang="ts">
import Chart from '~/components/pages/Site/Account/Chart.vue';
import TransactionFees from '~/components/pages/Site/Account/Fees/TransactionFees.vue';
import DepositFee from '~/components/pages/Site/Account/Fees/DepositFee.vue';
import WithdrawalFee from '~/components/pages/Site/Account/Fees/WithdrawalFee.vue';

definePageMeta({
	layout: 'account',
});

const items = [
	{
		key: 'transactionFees',
		label: 'transactionFees',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'depositFee',
		label: 'depositFee',
		content: 'And, this is the content for Tab2',
	},
	{
		key: 'withdrawalFee',
		label: 'withdrawalFee',
		content: 'And, this is the content for Tab2',
	},
];
</script>

<style scoped>
</style>
