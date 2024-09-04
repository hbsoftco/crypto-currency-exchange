<template>
	<div class="py-20">
		<h5 class="flex justify-start items-center mb-6 ">
			<NuxtImg
				src="/images/svg/site/main-page/prize.svg"
				alt="prize"
				class="ml-4"
			/>
			<strong class="font-bold text-2xl">{{ $t('claimYourPrizeNow') }}</strong>
		</h5>

		<div class="grid gap-4 grid-cols-3">
			<div class="px-6">
				<h6 class="border-b pb-3 border-primary-gray-light dark:border-primary-gray-dark mb-3 flex justify-start items-center">
					<span class="bg-accent-blue w-6 h-6 rounded-full flex justify-center items-center ml-3 font-bold text-text-light">۱</span>
					<strong class="font-bold text-xl text-text-dark dark:text-text-light">{{ $t('identityVerification') }}</strong>
				</h6>
				<p class="mb-3 text-base text-text-dark dark:text-text-light font-medium">
					{{ $t('registerAndVerifyBonus') }}
				</p>

				<UButton class="px-8 font-medium text-sm">
					{{ $t('signup') }}
				</UButton>
			</div>

			<div class="px-6">
				<h6 class="border-b pb-3 border-primary-gray-light dark:border-primary-gray-dark mb-3 flex justify-start items-center">
					<span class="bg-accent-blue w-6 h-6 rounded-full flex justify-center items-center ml-3 font-bold text-text-light">۲</span>
					<strong class="font-bold text-xl text-text-dark dark:text-text-light">{{ $t('firstDeposit') }}</strong>
				</h6>
				<p class="text-base text-text-dark dark:text-text-light font-medium">
					{{ $t('transfer') }}
				</p>
				<p class="mb-3 text-base text-text-dark dark:text-text-light font-medium">
					{{ $t('transferToFutureWallet') }}
				</p>

				<UButton
					color="white"
					variant="ghost"
					class="px-8 font-medium text-sm border"
				>
					{{ $t('transfer') }}
				</UButton>
			</div>

			<div class="px-6">
				<h6 class="border-b pb-3 border-primary-gray-light dark:border-primary-gray-dark mb-3 flex justify-start items-center">
					<span class="bg-accent-blue w-6 h-6 rounded-full flex justify-center items-center ml-3 font-bold text-text-light">۳</span>
					<strong class="font-bold text-xl text-text-dark dark:text-text-light">{{ $t('inviteFriends') }}</strong>
				</h6>
				<p class="text-base text-text-dark dark:text-text-light font-medium mb-0">
					{{ $t('futuresTrading') }}
				</p>
				<p class="mb-3 text-base text-text-dark dark:text-text-light font-medium">
					{{ $t('completeFirstFuturesTrade') }}
				</p>

				<UButton
					color="white"
					variant="ghost"
					class="px-8 font-medium text-sm border"
				>
					{{ $t('trade') }}
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>
