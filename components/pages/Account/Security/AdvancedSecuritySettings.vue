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
					color="green"
					variant="solid"
					class="mr-1"
				>
					{{ $t("on") }}
				</UBadge>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("antiPhishingPhraseText") }}
				</p>
			</div>
			<UButton
				to="/account/security/anti-phishing"
				size="sm"
				variant="ghost"
				color="red"
				class="font-bold text-sm border border-red-400"
			>
				{{ $t("remove") }}
			</UButton>
		</div>

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
					color="red"
					variant="solid"
					class="mr-1"
				>
					{{ $t("off") }}
				</UBadge>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("pinCodeWithdrawalText") }}
				</p>
			</div>
			<UButton
				to="/account/security/pin-code"
				color="gray"
				class="text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
			>
				{{ $t("adjust") }}
			</UButton>
		</div>

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
				to="/account/security/manage-white-list"
				color="gray"
				class="text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
			>
				{{ $t("adjust") }}
			</UButton>
		</div>

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
				to="/account/security/change-password"
				color="gray"
				class="text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
			>
				{{ $t("toChange") }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconShield from '~/assets/svg-icons/profile/shield.svg';
</script>
