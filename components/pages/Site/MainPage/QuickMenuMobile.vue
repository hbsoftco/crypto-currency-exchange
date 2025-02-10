<template>
	<div>
		<div class="grid grid-cols-2 gap-4 mt-10">
			<UButton
				to="/assets/deposit"
				size="lg"
				class="flex justify-center bg-hover2-light dark:bg-hover2-dark px-0 md:px-9"
			>
				<span class="text-sm font-medium text-black dark:text-white">{{
					$t("cryptocurrencyDeposit")
				}}</span>
				<img
					src="/images/svg/footer/active-wallet.svg"
					alt="wallet"
					class="w-6 h-6"
				>
			</UButton>
			<UButton
				to="/wallet/deposit-toman"
				size="lg"
				class="flex justify-center bg-hover2-light dark:bg-hover2-dark px-0 md:px-9"
			>
				<span class="text-sm font-medium text-black dark:text-white">{{
					$t("depositToman")
				}}</span>
				<img
					src="/images/svg/quick-access-mobile/active-card.svg"
					alt="card"
					class="w-6 h-6"
				>
			</UButton>
		</div>
		<div class="grid grid-cols-3 mt-6">
			<ULink
				to="/user/fees"
				class="flex flex-col justify-center items-center  mb-4"
			>
				<img
					src="/images/svg/quick-access-mobile/wallet.svg"
					alt="wallet"
					class="w-6 h-6 mb-2"
				>
				<span class="text-sm">{{ $t('fees') }}</span>
			</ULink>
			<ULink
				to="/user/invitation"
				class="flex flex-col justify-center items-center  mb-4"
			>
				<img
					src="/images/svg/quick-access-mobile/invite.svg"
					alt="invite"
					class="w-6 h-6 mb-2"
				>
				<span class="text-sm">{{ $t('inviteFriends') }}</span>
			</ULink>
			<ULink
				to="/fast-trade?market=BTC_USDT"
				class="flex flex-col justify-center items-center  mb-4"
			>
				<img
					src="/images/svg/quick-access-mobile/cigarettes.svg"
					alt="cigarettes"
					class="w-6 h-6 mb-2"
				>
				<span class="text-sm">{{ $t('quickTrade') }}</span>
			</ULink>
			<ULink
				to="/help-to-buy"
				class="flex flex-col justify-center items-center  mb-4"
			>
				<img
					src="/images/svg/quick-access-mobile/blog.svg"
					alt="blog"
					class="w-6 h-6 mb-2"
				>
				<span class="text-sm">{{ $t('howBuyCurrency') }}</span>
			</ULink>
			<ULink
				to="/help"
				class="flex flex-col justify-center items-center  mb-4"
			>
				<img
					src="/images/svg/quick-access-mobile/question.svg"
					alt="question"
					class="w-6 h-6 mb-2"
				>
				<span class="text-sm">{{ $t('guid') }}</span>
			</ULink>
			<ULink
				class="flex flex-col justify-center items-center mb-4"
				to="/more-links"
			>
				<img
					src="/images/svg/quick-access-mobile/more.svg"
					alt="more"
					class="w-6 h-6 mb-2"
				>
				<span class="text-sm">{{ $t('more') }}</span>
			</ULink>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>
