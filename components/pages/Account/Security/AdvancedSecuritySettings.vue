<template>
	<div
		class="mb-4 px-8 border border-primary-gray-light dark:border-primary-gray-dark rounded-md"
	>
		<div
			class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="flex items-center">
				<IconShield class="text-3xl" />
				<h3 class="text-base font-bold mr-2">
					{{ $t("advancedSecuritySettings") }}
				</h3>
			</div>
		</div>

		<div
			class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="flex items-center">
				<img
					src="/images/svg/profile/password.svg"
					alt="message"
					class="w-6 h-6"
				>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("antiPhishingPhrase") }}
				</h3>
				<UBadge
					:color="authStore.antiPhishingStatus ? 'green' : 'red'"
					variant="solid"
					class="mr-1"
				>
					{{ authStore.antiPhishingStatus ? $t('on') :$t("off") }}
				</UBadge>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("antiPhishingPhraseText") }}
				</p>
			</div>
			<UButton
				size="sm"
				variant="ghost"
				class="font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
				to="/user/security/antiphishing"
			>
				{{ $t("adjust") }}
			</UButton>
		</div>
		<!-- Anti Phishing -->

		<div class="py-4">
			<div class="flex items-center">
				<img
					src="/images/svg/profile/password.svg"
					alt="message"
					class="w-6 h-6"
				>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("pinCodeWithdrawal") }}
				</h3>
				<UBadge
					:color="authStore.withdrawPinCodeStatus ? 'green' : 'red'"
					variant="solid"
					class="mr-1"
				>
					{{ authStore.withdrawPinCodeStatus ? $t('on') :$t("off") }}
				</UBadge>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("pinCodeWithdrawalText") }}
				</p>
			</div>
			<UButton
				size="sm"
				variant="ghost"
				class="font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
				to="/user/security/withdraw-pin-code"
			>
				{{ $t("adjust") }}
			</UButton>
		</div>
		<!-- Withdraw Pin Code -->

		<div
			class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="flex items-center">
				<img
					src="/images/svg/profile/bullet.svg"
					alt="bullet"
					class="w-6 h-6"
				>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("ipWhitelist") }}
				</h3>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("ipWhitelistText") }}
				</p>
			</div>
			<UButton
				size="sm"
				variant="ghost"
				class="font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
				to="/user/security/manage-white-list"
			>
				{{ $t("adjust") }}
			</UButton>
		</div>
		<!-- Manage White List -->

		<div class="py-4">
			<div class="flex items-center">
				<img
					src="/images/svg/profile/lock.svg"
					alt="lock"
					class="w-6 h-6"
				>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("loginPassword") }}
				</h3>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("loginPasswordText") }}
				</p>
			</div>
			<UButton
				size="sm"
				variant="ghost"
				class="font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
				to="/user/security/change-password"
			>
				{{ $t("toChange") }}
			</UButton>
		</div>
		<!-- Change Password -->
	</div>
</template>

<script setup lang="ts">
import IconShield from '~/assets/svg-icons/profile/shield.svg';

const authStore = useAuthStore();
</script>
