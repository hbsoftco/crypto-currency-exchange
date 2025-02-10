<template>
	<div class="mt-16">
		<div class="grid grid-cols-3 w-full pl-4">
			<div
				class="relative w-full h-6 -pr-10 border-t-2 border-primary-yellow-light dark:border-primary-yellow-dark"
			>
				<div
					class="absolute -top-12 -left-5 z-[1]"
					@click="toggleSignIn"
				>
					<div class="flex flex-col items-center w-full">
						<div>
							<span class="text-xs font-normal">{{ $t('signup') }}</span>
						</div>
						<div
							:class="[
								'w-8 h-8 flex rounded items-center justify-center border-2 bg-background-light dark:bg-background-dark',
								isSignInVisible
									? 'border-primary-yellow-light dark:border-primary-yellow-dark'
									: 'border-secondary-gray-light dark:border-secondary-gray-dark',
							]"
						>
							<img
								src="/images/svg/gift.svg"
								alt="gift"
								class="w-6 h-6"
							>
						</div>
						<IconArrowDown
							v-if="isSignInVisible"
							class="text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
						<IconArrowUp
							v-if="!isSignInVisible"
							class="text-gray-500"
						/>
					</div>
				</div>
			</div>
			<div
				class="relative w-full border-t-2 "
				:class="[isDepositVisible || isTransactionVisible? 'border-primary-yellow-light dark:border-primary-yellow-dark': 'border-secondary-gray-light dark:border-secondary-gray-dark']"
			>
				<div
					class="absolute -top-12 -left-5 z-[1]"
					@click="toggleDeposit"
				>
					<div class="flex flex-col items-center">
						<div>
							<span class="text-xs font-normal">{{ $t("deposit") }}</span>
						</div>
						<div
							:class="[
								'w-8 h-8 flex rounded items-center justify-center border-2 bg-background-light dark:bg-background-dark',
								isDepositVisible
									? 'border-primary-yellow-light dark:border-primary-yellow-dark'
									: 'border-secondary-gray-light dark:border-secondary-gray-dark',
							]"
						>
							<img
								src="/images/svg/gift.svg"
								alt="gift"
								class="w-6 h-6"
							>
						</div>
						<IconArrowDown
							v-if="isDepositVisible"
							class="text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
						<IconArrowUp
							v-if="!isDepositVisible"
							class="text-gray-500"
						/>
					</div>
				</div>
			</div>
			<div
				class="relative w-full border-t-2"
				:class="[isTransactionVisible? 'border-primary-yellow-light dark:border-primary-yellow-dark': 'border-secondary-gray-light dark:border-secondary-gray-dark']"
			>
				<div
					class="absolute -top-12 -left-5 z-[1]"
					@click="toggleTransaction"
				>
					<div class="flex flex-col items-center">
						<div>
							<span class="text-xs font-normal">{{ $t("transaction") }}</span>
						</div>
						<div
							:class="[
								'w-8 h-8 flex rounded items-center justify-center border-2 bg-background-light dark:bg-background-dark',
								isTransactionVisible
									? 'border-primary-yellow-light dark:border-primary-yellow-dark'
									: 'border-secondary-gray-light dark:border-secondary-gray-dark',
							]"
						>
							<img
								src="/images/svg/gift.svg"
								alt="gift"
								class="w-6 h-6"
							>
						</div>
						<IconArrowDown
							v-if="isTransactionVisible"
							class="text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
						<IconArrowUp
							v-if="!isTransactionVisible"
							class="text-gray-500"
						/>
					</div>
				</div>
			</div>
		</div>
		<div
			v-if="isSignInVisible"
			class="my-2 bg-primary-gray-light dark:bg-primary-gray-dark p-2 rounded"
		>
			<p class="text-sm font-medium">
				{{ $t('completeAccount2') }}
			</p>
			<div class="flex justify-center">
				<UButton
					block
					to="/user/id-auth/level1"
					class="flex justify-center my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
				>
					<span class="text-base font-extrabold">{{
						$t("completeAccount")
					}}</span>
				</UButton>
			</div>
		</div>
		<div
			v-if="isDepositVisible"
			class="my-2 bg-primary-gray-light dark:bg-primary-gray-dark p-2 rounded"
		>
			<p class="text-sm font-medium">
				{{ $t('firstDepositReward') }}
			</p>
			<div class="flex justify-center">
				<UButton
					block
					to="/assets/deposit"
					class="flex justify-center my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
				>
					<span class="text-base font-extrabold">{{
						$t("deposit")
					}}</span>
				</UButton>
			</div>
		</div>
		<div
			v-if="isTransactionVisible"
			class="my-2 bg-primary-gray-light dark:bg-primary-gray-dark p-2 rounded"
		>
			<p class="text-sm font-medium">
				{{ $t('firstTradeReward') }}
			</p>
			<div class="flex justify-center">
				<UButton
					block
					to="/fast-trade?market=BTC_USDT"
					class="flex justify-center my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
				>
					<span class="text-base font-extrabold">{{
						$t("transaction")
					}}</span>
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';

const isSignInVisible = ref(true);
const isDepositVisible = ref(false);
const isTransactionVisible = ref(false);

const toggleSignIn = () => {
	isSignInVisible.value = !isSignInVisible.value;
	isDepositVisible.value = false;
	isTransactionVisible.value = false;
};

const toggleDeposit = () => {
	isDepositVisible.value = !isDepositVisible.value;
	isSignInVisible.value = false;
	isTransactionVisible.value = false;
};

const toggleTransaction = () => {
	isTransactionVisible.value = !isTransactionVisible.value;
	isSignInVisible.value = false;
	isDepositVisible.value = false;
};
</script>
