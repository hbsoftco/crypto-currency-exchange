<template>
	<div
		class="mb-4 px-8 border border-primary-gray-light dark:border-primary-gray-dark rounded-md"
	>
		<div
			class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="flex items-center">
				<IconDevice class="text-3xl" />
				<h3 class="text-base font-bold mr-2">
					{{ $t("devicesEvents") }}
				</h3>
			</div>
		</div>

		<div
			class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="flex items-center">
				<IconDate
					class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
				/>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("accountActivities") }}
				</h3>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("accountActivitiesText") }}
				</p>
			</div>
			<UButton
				to="/user/security/active-accounts"
				color="gray"
				class="text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
			>
				{{ $t("view") }}
			</UButton>
		</div>

		<div
			class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="flex items-center">
				<IconDevice
					class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
				/>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("devices") }}
				</h3>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("devicesText") }}
				</p>
			</div>
			<UButton
				to="/user/security/device-manage"
				color="gray"
				class="text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
			>
				{{ $t("view") }}
			</UButton>
		</div>

		<div
			class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="flex items-center">
				<img
					src="/images/svg/profile/hamberger.svg"
					alt="bullet"
					class="w-6 h-6"
				>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("freezeAccount") }}
				</h3>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("freezeAccountText") }}
				</p>
			</div>
			<UButton
				to="/user/security/freeze-account"
				color="gray"
				class="text-accent-red dark:text-accent-red text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
			>
				{{ $t("toFreeze") }}
			</UButton>
		</div>

		<div class="py-4">
			<div class="flex items-center">
				<img
					src="/images/svg/profile/user-delete.svg"
					alt="lock"
					class="w-6 h-6"
				>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("deleteAccount") }}
				</h3>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("deleteAccountText") }}
				</p>
			</div>
			<UButton
				to="/user/security/delete-account"
				color="gray"
				class="text-accent-red dark:text-accent-red text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
			>
				{{ $t("remove") }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconDevice from '~/assets/svg-icons/profile/device.svg';
import IconDate from '~/assets/svg-icons/menu/quick-menu/transaction-history.svg';
</script>
