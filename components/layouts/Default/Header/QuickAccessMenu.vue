<template>
	<div class="mx-3">
		<div
			class="flex group relative items-center space-x-2 cursor-pointer"
		>
			<IconMenu
				class="text-2xl text-subtle-text-light dark:text-subtle-text-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark duration-200 transition-all ml-2"
			/>
			<IconArrowDown
				class="text-base block group-hover:hidden text-subtle-text-light dark:text-subtle-text-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark duration-200 transition-all"
			/>
			<IconArrowUp
				class="text-base hidden group-hover:block group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark hover:fill-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"
			/>
			<div
				class="absolute z-20 -right-32 mt-1 top-[1.28rem] hidden group-hover:block py-4 opacity-0 group-hover:opacity-100"
			>
				<div
					class="w-[75rem] bg-hover-light dark:bg-hover-dark shadow-lg rounded transition-all duration-200"
				>
					<ul class="grid grid-cols-4 gap-2 p-4">
						<li
							v-for="(item, index) in menuItems"
							:key="index"
							class="flex justify-between rounded-md overflow-hidden transition-all duration-200 p-4 hover:bg-hover2-light dark:hover:bg-[#1f1f1f] border-transparent border-r-[3px] hover:border-r-[3px] hover:border-primary-yellow-light hover:dark:border-r-[3px] dark:hover:border-primary-yellow-dark"
						>
							<ULink
								:to="item.url"
								class="flex justify-between"
							>
								<div class="flex-1">
									<component
										:is="item.icon"
										class="text-4xl dark:text-subtle-text-50"
									/>
								</div>
								<div class="text-base mr-4">
									<h5 class="font-bold">
										{{ $t(item.name) }}
									</h5>

									<span class="text-sm dark:text-subtle-text-50">
										{{ item.description }}
									</span>
								</div>
							</ULink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconMenu from '~/assets/svg-icons/menu/menu.svg';
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';
import IconNotification from '~/assets/svg-icons/menu/notification.svg';
import IconCurrencyDeposit from '~/assets/svg-icons/menu/quick-menu/currency-deposit.svg';
import IconInviteFriends from '~/assets/svg-icons/menu/invite-friends.svg';
import IconBankAccounts from '~/assets/svg-icons/menu/quick-menu/bank-accounts.svg';
import IconTutorial from '~/assets/svg-icons/menu/quick-menu/tutorial.svg';
import IconWithdrawCurrency from '~/assets/svg-icons/menu/quick-menu/withdraw-currency.svg';
import IconDepositWithdrawalHistory from '~/assets/svg-icons/menu/quick-menu/deposit-Withdrawal-history.svg';
import IconCreateAPI from '~/assets/svg-icons/menu/quick-menu/create-API.svg';
import IconDepositToman from '~/assets/svg-icons/menu/quick-menu/deposit-toman.svg';
import IconAwards from '~/assets/svg-icons/menu/quick-menu/awards.svg';
import IconWithdrawToman from '~/assets/svg-icons/menu/quick-menu/withdraw-toman.svg';
import IconQuickTrade from '~/assets/svg-icons/menu/quick-menu/quick-trade.svg';
import IconFees from '~/assets/svg-icons/menu/quick-menu/fees.svg';
import IconUserLevel from '~/assets/svg-icons/menu/quick-menu/user-level.svg';

const menuItems = [
	{
		name: 'depositCrypto',
		description: useT('transferToWallet'),
		icon: IconCurrencyDeposit,
		url: '/wallet/deposit',
	},
	{
		name: 'fees',
		description: useT('transactionCosts'),
		icon: IconFees,
		url: '/account/fees',

	},
	{
		name: 'quickTrade',
		description: useT('instantCryptoTrade'),
		icon: IconQuickTrade,
		url: '/fast-trade?market=BTC_USDT',

	},
	{
		name: 'buyCryptoGuide',
		description: useT('howToBuyCrypto'),
		icon: IconTutorial,
		url: '/help-to-buy',

	},
	{
		name: 'withdrawCrypto',
		description: useT('transferToExternalAccount'),
		icon: IconWithdrawCurrency,
		url: '/wallet/withdraw',

	},
	{
		name: 'banking',
		description: useT('manageDepositAccounts'),
		icon: IconBankAccounts,
		url: '/wallet/bank-cards',

	},
	{
		name: 'rewardsBonuses',
		description: useT('userActivityIncentives'),
		icon: IconAwards,
		url: '/account/rewards',

	},
	{
		name: 'notifications',
		description: useT('announcementDetails'),
		icon: IconNotification,
		url: '/risk-agreement',

	},
	{
		name: 'depositToman',
		description: useT('addRialBalance'),
		icon: IconDepositToman,
		url: '/wallet/deposit-toman',

	},
	{
		name: 'profitLoss',
		description: useT('systemAnalysis'),
		icon: IconUserLevel,
		url: '/account/user-level',

	},
	{
		name: 'depositWithdrawalHistory',
		description: useT('transactionsDetails'),
		icon: IconDepositWithdrawalHistory,
		url: '/wallet/history',

	},
	{
		name: 'marketStats',
		description: useT('marketStatus'),
		icon: IconUserLevel,
		url: '/account/user-level',
	},
	{
		name: 'withdrawToman',
		description: useT('transferToBank'),
		icon: IconWithdrawToman,
		url: '/wallet/toman-withdrawal',

	},
	{
		name: 'createAPI',
		description: useT('createAccessKeys'),
		icon: IconCreateAPI,
		url: '/account/manage-api/new-api',

	},
	{
		name: 'userLevel',
		description: useT('userLevelDetails'),
		icon: IconUserLevel,
		url: '/account/user-level',

	},
	{
		name: 'myFriends',
		description: useT('referralIncomeStatus'),
		icon: IconInviteFriends,
		url: '/account/user-level',

	},
];
</script>
