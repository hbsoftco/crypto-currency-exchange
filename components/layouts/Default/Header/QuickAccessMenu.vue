<template>
	<div>
		<div
			class="flex group relative items-center space-x-2"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<IconMenu
				class="text-2xl text-subtle-text-light dark:text-subtle-text-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark duration-200 transition-all ml-1"
			/>
			<IconArrowDown
				v-if="!hover && showArrowDown"
				class="text-base text-subtle-text-light dark:text-subtle-text-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark duration-200 transition-all"
			/>
			<IconArrowUp
				v-if="hover"
				class="text-base group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark hover:fill-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"
			/>
			<div
				v-if="hover"
				class=" absolute top-6 -right-32 mt-1 p-4 opacity-0 group-hover:opacity-100"
				@mouseover="showMenu"
				@mouseleave="hideMenu"
			>
				<div
					class="w-[1200px] bg-hover-light dark:bg-hover-dark shadow-lg rounded transition-opacity duration-200"
				>
					<div class="text-base font-bold border-b-secondary-gray-dark dark:border-b-secondary-gray-light border-b-[1px] mx-4 py-4">{{ $t('quickAccess') }}</div>
					<ul class="grid grid-cols-4 gap-2">
						<li
							v-for="(item, index) in menuItems"
							:key="index"
							class="flex justify-between p-4 hover:bg-hover2-light dark:hover:bg-hover2-dark border-transparent border-r-[3px] hover:border-r-[3px] hover:border-primary-yellow-light hover:dark:border-r-[3px] dark:hover:border-primary-yellow-dark"
						>
							<ULink
								to="#"
								class="flex justify-between"
							>
								<component
									:is="item.icon"
									class="text-4xl"
								/>
								<div class="text-base mr-4">
									{{ $t(item.name) }}

									<p class="text-sm">
										{{ item.description }}
									</p>
								</div>
							</ULink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import IconMenu from '~/assets/svg-icons/menu/menu.svg';
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';
import IconCurrencyDeposit from '~/assets/svg-icons/menu/quick-menu/currency-deposit.svg';
import IconTransactionHistory from '~/assets/svg-icons/menu/quick-menu/transaction-history.svg';
import IconBankAccounts from '~/assets/svg-icons/menu/quick-menu/bank-accounts.svg';
import IconTutorial from '~/assets/svg-icons/menu/quick-menu/tutorial.svg';
import IconWithdrawCurrency from '~/assets/svg-icons/menu/quick-menu/withdraw-currency.svg';
import IconDepositWithdrawalHistory from '~/assets/svg-icons/menu/quick-menu/deposit-Withdrawal-history.svg';
import IconCreateAPI from '~/assets/svg-icons/menu/quick-menu/create-API.svg';
import IconBlog from '~/assets/svg-icons/menu/quick-menu/blog.svg';
import IconDepositToman from '~/assets/svg-icons/menu/quick-menu/deposit-toman.svg';
import IconPortfolio from '~/assets/svg-icons/menu/quick-menu/portfolio.svg';
import IconTopUsers from '~/assets/svg-icons/menu/quick-menu/top-users.svg';
import IconAwards from '~/assets/svg-icons/menu/quick-menu/awards.svg';
import IconWithdrawToman from '~/assets/svg-icons/menu/quick-menu/withdraw-toman.svg';
import IconQuickTrade from '~/assets/svg-icons/menu/quick-menu/quick-trade.svg';
import IconFees from '~/assets/svg-icons/menu/quick-menu/fees.svg';
import IconUserLevel from '~/assets/svg-icons/menu/quick-menu/user-level.svg';

const hover = ref(false);
const showArrowDown = ref(true);

const showMenu = () => {
	hover.value = true;
};

const hideMenu = () => {
	hover.value = false;
};

watch(hover, (newHover) => {
	showArrowDown.value = !newHover;
});

const menuItems = ref([
	{
		name: 'currencyDeposit',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconCurrencyDeposit,
	},
	{
		name: 'transactionHistory',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconTransactionHistory,
	},
	{
		name: 'bankAccounts',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconBankAccounts,
	},
	{
		name: 'tutorial',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconTutorial,
	},
	{
		name: 'withdrawCurrency',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconWithdrawCurrency,
	},
	{
		name: 'depositWithdrawalHistory',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconDepositWithdrawalHistory,
	},
	{
		name: 'createAPI',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconCreateAPI,
	},
	{
		name: 'blog',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconBlog,
	},
	{
		name: 'depositToman',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconDepositToman,
	},
	{
		name: 'portfolio',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconPortfolio,
	},
	{
		name: 'topUsers',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconTopUsers,
	},
	{
		name: 'awards',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconAwards,
	},
	{
		name: 'withdrawToman',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconWithdrawToman,
	},
	{
		name: 'quickTrade',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconQuickTrade,
	},
	{
		name: 'fees',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconFees,
	},
	{
		name: 'userLevel',
		description: 'توضیحات توضیحات توضیحات توضیحات',
		icon: IconUserLevel,
	},
]);
</script>

<style lang="scss" scoped></style>
