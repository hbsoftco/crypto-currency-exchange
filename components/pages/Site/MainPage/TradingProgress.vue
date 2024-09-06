<template>
	<div class="mt-28">
		<div class="grid grid-cols-3 w-full pl-4">
			<div
				class="relative w-full h-24 -pr-10 border-t-2 border-primary-yellow-light dark:border-primary-yellow-dark"
			>
				<div
					class="absolute -top-10 -left-5 z-10"
					@click="toggleSignIn"
				>
					<div class="flex flex-col items-center w-full">
						<div>
							<span class="text-xs font-normal">{{ $t('signup') }}</span>
						</div>
						<div
							:class="[
								'w-6 h-6 flex items-center justify-center border-2',
								isSignInVisible
									? 'border-primary-yellow-light dark:border-primary-yellow-dark'
									: 'border-secondary-gray-light dark:border-secondary-gray-dark',
							]"
						>
							<NuxtImg
								src="/images/gift.png"
								alt="gift"
								class="w-4 h-4"
							/>
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
				class="relative w-full border-t-2 border-secondary-gray-light dark:border-secondary-gray-dark"
			>
				<div
					class="absolute -top-10 -left-5 z-10"

					@click="toggleDeposit"
				>
					<div class="flex flex-col items-center">
						<div>
							<span class="text-xs font-normal">{{ $t("deposit") }}</span>
						</div>
						<div
							:class="[
								'w-6 h-6 flex items-center justify-center border-2',
								isDepositVisible
									? 'border-primary-yellow-light dark:border-primary-yellow-dark'
									: 'border-secondary-gray-light dark:border-secondary-gray-dark',
							]"
						>
							<NuxtImg
								src="/images/gift.png"
								alt="gift"
								class="w-4 h-4"
							/>
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
				class="relative w-full border-t-2 border-secondary-gray-light dark:border-secondary-gray-dark"
			>
				<div
					class="absolute -top-10 -left-5 z-10"

					@click="toggleTransaction"
				>
					<div class="flex flex-col items-center">
						<div>
							<span class="text-xs font-normal">{{ $t("transaction") }}</span>
						</div>
						<div
							:class="[
								'w-6 h-6 flex items-center justify-center border-2',
								isTransactionVisible
									? 'border-primary-yellow-light dark:border-primary-yellow-dark'
									: 'border-secondary-gray-light dark:border-secondary-gray-dark',
							]"
						>
							<NuxtImg
								src="/images/gift.png"
								alt="gift"
								class="w-4 h-4"
							/>
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
			class="my-12 text-center"
		>
			<p>برای انجام معاملات و استفاده از امکانات بیت‌لند نیاز است حساب کاربری تان را تکمیل کنید . </p>
			<div class="flex justify-center">
				<UButton
					class="flex justify-center w-[18.8rem] my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
				>
					<span class="text-base font-extrabold">{{
						$t("compeleteAccount")
					}}</span>
				</UButton>
			</div>
		</div>
		<div
			v-if="isDepositVisible"
			class="my-12 text-center"
		>
			<p>با اولین واریز خودت می تونی یه جایزه از بیت‌لند بگیری پس وقتتوتلف نکن و شروع کن. </p>
			<div class="flex justify-center">
				<UButton
					class="flex justify-center w-[18.8rem] my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
				>
					<span class="text-base font-extrabold">{{
						$t("deposit")
					}}</span>
				</UButton>
			</div>
		</div>
		<div
			v-if="isTransactionVisible"
			class="my-12 text-center"
		>
			<p>هم می تونی معامله کنی هم از بیت‌لند به خاطر اولین معامله جایزه بگیری فقط یادت باشه این فرصت محدوده!</p>
			<div class="flex justify-center">
				<UButton
					class="flex justify-center w-[18.8rem] my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
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

const isSignInVisible = ref(false);
const isDepositVisible = ref(false);
const isTransactionVisible = ref(false);

const toggleSignIn = () => {
	isSignInVisible.value = !isSignInVisible.value;
};

const toggleDeposit = () => {
	isDepositVisible.value = !isDepositVisible.value;
};

const toggleTransaction = () => {
	isTransactionVisible.value = !isTransactionVisible.value;
};
</script>
