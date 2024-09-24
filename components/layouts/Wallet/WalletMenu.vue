<template>
	<div class="p-4">
		<ul class="flex flex-col">
			<!-- showOverView -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/wallet/over-view"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconSalary class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('overView') }}
						</span>
					</div>
				</ULink>
			</li>
			<!-- showSpot -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/wallet/spot"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconBudget class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('spot') }}
						</span>
					</div>
				</ULink>
			</li>
			<!-- showFutures -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/wallet/futures"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconAnalytics class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('futures') }}
						</span>
					</div>
				</ULink>
			</li>
			<!-- showHistory -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/wallet/history"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconDate class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('history') }}
						</span>
					</div>
				</ULink>
			</li>
			<!-- showprofitLoss -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/wallet/profit-loss"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconAnalytics class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('profitLoss') }}
						</span>
					</div>
				</ULink>
			</li>
			<!-- showDepositAddresses -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/wallet/deposit-addresses"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconPostal class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('depositAddresses') }}
						</span>
					</div>
				</ULink>
			</li>
			<!-- showBankCards -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/wallet/bank-cards"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconWallet class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('bankCards') }}
						</span>
					</div>
				</ULink>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import IconSalary from '~/assets/svg-icons/spot/salary.svg';
import IconBudget from '~/assets/svg-icons/wallet/budget.svg';
import IconAnalytics from '~/assets/svg-icons/spot/analytics.svg';
import IconDate from '~/assets/svg-icons/menu/quick-menu/transaction-history.svg';
import IconPostal from '~/assets/svg-icons/wallet/postal.svg';
import IconWallet from '~/assets/svg-icons/menu/wallet.svg';
</script>
