<template>
	<div
		v-if="!isMobile"
		class="mb-4 px-8 border border-primary-gray-light dark:border-primary-gray-dark rounded-md"
	>
		<div
			class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="flex items-center">
				<IconDevice class="text-3xl text-subtle-text-light dark:text-subtle-text-dark" />
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
				size="sm"
				variant="ghost"
				class="font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
			>
				{{ $t("view") }}
			</UButton>
		</div>
		<!-- accountActivities -->

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
				size="sm"
				variant="ghost"
				class="font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
			>
				{{ $t("view") }}
			</UButton>
		</div>
		<!-- devices -->

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
				size="sm"
				variant="ghost"
				class="font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
			>
				{{ $t("toFreeze") }}
			</UButton>
		</div>
		<!-- toFreeze -->

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
				size="sm"
				variant="ghost"
				class="font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
			>
				{{ $t("remove") }}
			</UButton>
		</div>
		<!-- remove -->
	</div>
	<!-- Desktop Mode -->
	<div v-else>
		<div>
			<div class="flex items-center">
				<IconDevice class="text-3xl text-subtle-text-light dark:text-subtle-text-dark" />
				<h3 class="text-base font-bold mr-2">
					{{ $t("devicesEvents") }}
				</h3>
			</div>

			<div class="mt-8">
				<ULink
					to="/user/security/active-accounts"
					class="flex justify-between items-center"
				>
					<div class="flex justify-start items-center">
						<IconDate
							class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
						<h3 class="text-sm font-bold mx-2">
							{{ $t("accountActivities") }}
						</h3>
					</div>
					<div>
						<IconArrowLeft class="text-xl" />
					</div>
				</ULink>
			</div>
			<!-- accountActivities -->

			<div class="mt-8">
				<ULink
					to="/user/security/device-manage"
					class="flex justify-between items-center"
				>
					<div class="flex justify-start items-center">
						<IconDevice
							class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
						/>
						<h3 class="text-sm font-bold mx-2">
							{{ $t("devices") }}
						</h3>
					</div>
					<div>
						<IconArrowLeft class="text-xl" />
					</div>
				</ULink>
			</div>
			<!-- device-manage -->

			<div class="mt-8">
				<ULink
					to="/user/security/freeze-account"
					class="flex justify-between items-center"
				>
					<div class="flex justify-start items-center">
						<img
							src="/images/svg/profile/hamberger.svg"
							alt="bullet"
							class="w-6 h-6"
						>
						<h3 class="text-sm font-bold mx-2">
							{{ $t("freezeAccount") }}
						</h3>
					</div>
					<div>
						<IconArrowLeft class="text-xl" />
					</div>
				</ULink>
			</div>
			<!-- freeze-account -->

			<div class="mt-8">
				<ULink
					to="/user/security/delete-account"
					class="flex justify-between items-center"
				>
					<div class="flex justify-start items-center">
						<img
							src="/images/svg/profile/user-delete.svg"
							alt="bullet"
							class="w-6 h-6"
						>
						<h3 class="text-sm font-bold mx-2">
							{{ $t("deleteAccount") }}
						</h3>
					</div>
					<div>
						<IconArrowLeft class="text-xl" />
					</div>
				</ULink>
			</div>
			<!-- delete-account -->
		</div>
	</div>
	<!-- Mobile Mode -->
</template>

<script setup lang="ts">
import IconDevice from '~/assets/svg-icons/profile/device.svg';
import IconDate from '~/assets/svg-icons/menu/quick-menu/transaction-history.svg';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left-fill.svg';

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});
</script>
