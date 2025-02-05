<template>
	<div>
		<BackHeader
			:title="$t('quickAccess')"
		/>
		<div
			class=" w-full h-auto flex flex-col rounded-md bg-background-light dark:bg-background-dark px-3 py-6"
		>
			<div class="my-2">
				<h4 class="text-sm font-bold mr-2">
					{{ $t('currencyDeposit') }}:
				</h4>
				‌<div class="grid grid-cols-3 gap-1">
					<ULink
						to="/user/fees"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconFeeFinal class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('possibleCurrencies') }}</span>
					</ULink>
					<ULink
						to="/wallet/deposit"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconArrowUpGreen class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('cryptoDeposit') }}</span>
					</ULink>
					<ULink
						to="/wallet/deposit-toman"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconSalary class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('depositToman') }}</span>
					</ULink>
					<ULink
						to="/assets/history"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconDate class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('history') }}</span>
					</ULink>
					<ULink
						to="/assets/fiat-accounts"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconBank class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />
						<span class="text-sm mt-2">{{ $t('bankCards') }}</span>
					</ULink>
					<ULink
						to="/assets/crypto-addresses"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconPostal class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('depositAddresses') }}</span>
					</ULink>
				</div>
			</div>

			<div class="my-2">
				<h4 class="text-sm font-bold mr-2">
					{{ $t('withdrawCurrency') }}:
				</h4>
				‌<div class="grid grid-cols-3 gap-1">
					<ULink
						to="/assets/fiat-accounts"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconBank class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />
						<span class="text-sm mt-2">{{ $t('bankCards') }}</span>
					</ULink>
					<ULink
						to="/user/fees"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconFeeFinal class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('possibleCurrencies') }}</span>
					</ULink>
					<ULink
						to="/wallet/withdraw"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconArrowDown class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('cryptoWithdraw') }}</span>
					</ULink>

					<ULink
						to="#"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconPostal class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('sendToUser') }}</span>
					</ULink>
					<ULink
						to="/wallet/toman-withdrawal"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconSalary class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('withdrawToman') }}</span>
					</ULink>
					<ULink
						to="/assets/history"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconDate class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('history') }}</span>
					</ULink>
				</div>
			</div>

			<div class="my-2">
				<h4 class="text-sm font-bold mr-2">
					{{ $t('market') }}:
				</h4>
				‌<div class="grid grid-cols-3 gap-1">
					<ULink
						to="/markets"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconUserLevel class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('spot') }}</span>
					</ULink>
					<ULink
						to="/markets"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconAnalytics class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />
						<span class="text-sm mt-2">{{ $t('futures') }}</span>
					</ULink>
					<ULink
						to="/markets/statistics"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconProfitLoss class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('statistics') }}</span>
					</ULink>
				</div>
			</div>

			<div class="my-2">
				<h4 class="text-sm font-bold mr-2">
					{{ $t('spot') }}:
				</h4>
				‌<div class="grid grid-cols-3 gap-1">
					<ULink
						to="/spot/list"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconFeeFinal class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('openOrders') }}</span>
					</ULink>
					<ULink
						to="/spot/list"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconDate class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('tradeHistory') }}</span>
					</ULink>
					<ULink
						to="/user/fees"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconFees class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('fees') }}</span>
					</ULink>
					<ULink
						to="/help-to-buy"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconFeeFinal class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('helpBuy') }}</span>
					</ULink>
					<ULink
						to="/calculator?market=BTC_USDT"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<UIcon
							name="heroicons:calculator"
							class="w-6 h-6 text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
						<span class="text-sm mt-2">{{ $t('calculator') }}</span>
					</ULink>
					<ULink
						to="/fast-trade?market=BTC_USDT"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconFeeFinal class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('transfer') }}</span>
					</ULink>
					<ULink
						to="/wallet"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconWallet class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('wallet') }}</span>
					</ULink>
					<ULink
						to="/assets/analysis"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconAnalytics class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />
						<span class="text-sm mt-2">{{ $t('profitLoss') }}</span>
					</ULink>
				</div>
			</div>

			<div class="my-2">
				<h4 class="text-sm font-bold mr-2">
					{{ $t('futures') }}:
				</h4>
				‌<div class="grid grid-cols-3 gap-1">
					<ULink
						to="/calculator?market=BTC_USDT"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<UIcon
							name="heroicons:calculator"
							class="w-6 h-6 text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
						<span class="text-sm mt-2">{{ $t('calculator') }}</span>
					</ULink>
				</div>
			</div>

			<div class="my-2">
				<h4 class="text-sm font-bold mr-2">
					{{ $t('profile') }}:
				</h4>
				‌<div class="grid grid-cols-3 gap-1">
					<ULink
						to="/user/preference"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconSetting
							class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
						<span class="text-sm mt-2">{{ $t('setting') }}</span>
					</ULink>
					<ULink
						to="/user/invitation"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconInviteFriends
							class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
						<span class="text-sm mt-2">{{ $t('inviteFriends') }}</span>
					</ULink>
				</div>
			</div>

			<div class="my-2">
				<h4 class="text-sm font-bold mr-2">
					{{ $t('security') }}:
				</h4>
				‌<div class="grid grid-cols-3 gap-1">
					<ULink
						to="/cert"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<img
							src="/images/logo.png"
							alt="message"
							class="w-5 h-6"
						>
						<span class="text-sm mt-2">{{ $t('confirmBitland') }}</span>
					</ULink>
					<ULink
						to="/user/security/two-step-login"
						class="flex flex-col justify-center items-center mb-4"
					>
						<span class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl">*</span>
						<span class="text-sm mt-1">{{ $t('setting2FA') }}</span>
					</ULink>
					<ULink
						to="/user/security/antiphishing"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<img
							src="/images/svg/profile/password.svg"
							alt="message"
							class="w-6 h-6"
						>
						<span class="text-sm mt-2">
							{{ $t("antiPhishingPhrase") }}
						</span>
					</ULink>
					<ULink
						to="/user/security/two-step-login"
						class="flex flex-col justify-center items-center mb-4"
					>
						<img
							src="/images/svg/profile/password.svg"
							alt="message"
							class="w-6 h-6"
						>
						<span class="text-sm mt-2">{{ $t('pinCodeWithdrawal') }}</span>
					</ULink>
					<ULink
						to="/user/security/two-step-login"
						class="flex flex-col justify-center items-center mb-4"
					>
						<img
							src="/images/svg/profile/lock.svg"
							alt="lock"
							class="w-6 h-6"
						>
						<span class="text-sm mt-2">{{ $t('changePasswordLogin') }}</span>
					</ULink>
					<ULink
						to="/user/security/change-email"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<img
							src="/images/svg/profile/mobile.svg"
							alt="mobile"
							class="w-6 h-6"
						>
						<span class="text-sm mt-2">{{ $t('changeMobile') }}</span>
					</ULink>
					<ULink
						to="/user/security/change-email"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<img
							src="/images/svg/profile/message.svg"
							alt="message"
							class="w-6 h-6"
						>
						<span class="text-sm mt-2">{{ $t('changeEmail') }}</span>
					</ULink>
					<ULink
						to="/user/security/white-list"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<img
							src="/images/svg/profile/bullet.svg"
							alt="bullet"
							class="w-6 h-6"
						>
						<span class="text-sm mt-2">{{ $t('listAllowedIps') }}</span>
					</ULink>
					<ULink
						to="/user/wbl"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<img
							src="/images/svg/profile/bullet.svg"
							alt="bullet"
							class="w-6 h-6"
						>
						<span class="text-sm mt-2">{{ $t('authorizedAddresses') }}</span>
					</ULink>
					<ULink
						to="/user/wbl"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<IconInviteFriends class=" text-primary-yellow-light dark:text-primary-yellow-dark text-2xl" />

						<span class="text-sm mt-2">{{ $t('contactMe') }}</span>
					</ULink>
					<ULink
						to="/user/security/freeze-account"
						class="flex flex-col justify-center items-center  mb-4"
					>
						<img
							src="/images/svg/profile/hamberger.svg"
							alt="bullet"
							class="w-6 h-6"
						>
						<span class="text-sm mt-2">{{ $t('freezeAccount') }}</span>
					</ULink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconArrowUpGreen from '~/assets/svg-icons/arrow-up-green.svg';
import IconSalary from '~/assets/svg-icons/spot/salary.svg';
import IconPostal from '~/assets/svg-icons/wallet/postal.svg';
import IconDate from '~/assets/svg-icons/menu/quick-menu/transaction-history.svg';
import IconBank from '~/assets/svg-icons/wallet/bank.svg';
import IconFeeFinal from '~/assets/svg-icons/fee_final.svg';
import IconArrowDown from '~/assets/svg-icons/arrow-down-red.svg';
import IconProfitLoss from '~/assets/svg-icons/wallet/wallet-upload.svg';
import IconUserLevel from '~/assets/svg-icons/menu/quick-menu/user-level.svg';
import IconAnalytics from '~/assets/svg-icons/spot/analytics.svg';
import IconInviteFriends from '~/assets/svg-icons/menu/invite-friends.svg';
import IconSetting from '~/assets/svg-icons/menu/setting.svg';
import IconWallet from '~/assets/svg-icons/menu/wallet.svg';
import IconFees from '~/assets/svg-icons/menu/quick-menu/fees.svg';
import BackHeader from '~/components/layouts/Default/Mobile/BackHeader.vue';
</script>
