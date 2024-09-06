<template>
	<div>
		<div class="grid grid-cols-2 mt-10">
			<UButton
				size="lg"
				class="flex justify-center bg-hover2-light dark:bg-hover2-dark px-0 md:px-9"
			>
				<span class="text-sm font-medium text-dark dark:text-white">{{
					$t("cryptocurrencyDeposit")
				}}</span>
				<NuxtImg
					src="/images/svg/footer/active-wallet.svg"
					alt="wallet"
					class="w-6 h-6"
				/>
			</UButton>
			<UButton
				size="lg"
				class="flex justify-center bg-hover2-light dark:bg-hover2-dark px-0 md:px-9"
			>
				<span class="text-sm font-medium text-dark dark:text-white">{{
					$t("depositToman")
				}}</span>
				<NuxtImg
					src="/images/svg/quick-access-mobile/active-card.svg"
					alt="card"
					class="w-6 h-6"
				/>
			</UButton>
		</div>
		<div class="grid grid-cols-3 mt-6">
			<ULink
				to=""
				class="flex flex-col justify-center items-center  mb-4"
			>
				<NuxtImg
					src="/images/svg/quick-access-mobile/wallet.svg"
					alt="wallet"
					class="w-6 h-6 mb-2"
				/>
				<span class="text-sm">{{ $t('fees') }}</span>
			</ULink>
			<ULink
				to=""
				class="flex flex-col justify-center items-center  mb-4"
			>
				<NuxtImg
					src="/images/svg/quick-access-mobile/invite.svg"
					alt="invite"
					class="w-6 h-6 mb-2"
				/>
				<span class="text-sm">{{ $t('inviteFriends') }}</span>
			</ULink>
			<ULink
				to=""
				class="flex flex-col justify-center items-center  mb-4"
			>
				<NuxtImg
					src="/images/svg/quick-access-mobile/cigarettes.svg"
					alt="cigarettes"
					class="w-6 h-6 mb-2"
				/>
				<span class="text-sm">{{ $t('quickTrade') }}</span>
			</ULink>
			<ULink
				to=""
				class="flex flex-col justify-center items-center  mb-4"
			>
				<NuxtImg
					src="/images/svg/quick-access-mobile/blog.svg"
					alt="blog"
					class="w-6 h-6 mb-2"
				/>
				<span class="text-sm">{{ $t('blog') }}</span>
			</ULink>
			<ULink
				to=""
				class="flex flex-col justify-center items-center  mb-4"
			>
				<NuxtImg
					src="/images/svg/quick-access-mobile/question.svg"
					alt="question"
					class="w-6 h-6 mb-2"
				/>
				<span class="text-sm">{{ $t('guid') }}</span>
			</ULink>
			<ULink
				to=""
				class="flex flex-col justify-center items-center mb-4"
			>
				<NuxtImg
					src="/images/svg/quick-access-mobile/more.svg"
					alt="more"
					class="w-6 h-6 mb-2"
				/>
				<span class="text-sm">{{ $t('more') }}</span>
			</ULink>
		</div>
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>
