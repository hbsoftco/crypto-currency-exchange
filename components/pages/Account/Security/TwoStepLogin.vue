<template>
	<div
		class="mb-4 px-8 border border-primary-gray-light dark:border-primary-gray-dark rounded-md"
	>
		<!-- TwoStepLogin Section -->
		<div
			class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="flex items-center">
				<NuxtImg
					src="./images/svg/profile/shield.svg"
					alt="shield"
					class="w-6 h-6"
				/>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("TwoStepLogin") }}
				</h3>
				<div
					:class="twoStepLoginButtonClass"
					class="rounded-full px-2 mr-4"
				>
					<span class="text-sm font-medium">{{ twoStepLoginText }}</span>
				</div>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("TwoStepLoginText") }}
				</p>
			</div>
			<UButton
				to="/account/security/two-step-login"
				color="gray"
				class="text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
			>
				{{ $t("adjust") }}
			</UButton>
		</div>
		<!-- TwoStepLogin -->

		<div
			class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="flex items-center">
				<NuxtImg
					src="./images/svg/profile/message.svg"
					alt="message"
					class="w-6 h-6"
				/>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("emailSetup") }}
				</h3>
				<div class="flex items-center mr-4">
					<NuxtImg
						src="/images/Confirmation.png"
						alt="Confirmation"
						class="w-4 h-4"
					/>
					<span class="text-sm font-medium mr-1">{{
						useNumber(
							String(getValueByKey(profileStore.userProfile, "EMAIL")),
						)
					}}</span>
				</div>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("emailSetupText") }}
				</p>
			</div>
			<UButton
				to="/account/security/change-email"
				color="gray"
				class="text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
			>
				{{ $t("toChange") }}
			</UButton>
		</div>
		<!-- Email -->

		<!-- Mobile Section -->
		<div class="py-4">
			<div class="flex items-center">
				<NuxtImg
					src="./images/svg/profile/mobile.svg"
					alt="mobile"
					class="w-6 h-6"
				/>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("mobileNumberSetting") }}
				</h3>
				<div
					:class="mobileNumberButtonClass"
					class="rounded-full px-2 mr-4"
				>
					<span class="text-sm font-medium">{{ mobileNumberText }}</span>
				</div>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("mobileNumberSettingText") }}
				</p>
			</div>
			<UButton
				color="gray"
				class="text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
			>
				{{ $t("register") }}
			</UButton>
		</div>
		<!-- Mobile -->
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import { getValueByKey } from '~/utils/find-value-by-key';

const profileStore = useProfileStore();
const twoStepLoginValue = getValueByKey(profileStore.userProfile, '2FA_ENABLED');
const mobileNumberValue = getValueByKey(profileStore.userProfile, 'MOBILE');

// Two-Step Login Computed Properties
const twoStepLoginText = computed(() => {
	if (twoStepLoginValue === undefined) {
		return useT('off');
	}
	return twoStepLoginValue === '1' ? useT('on') : useT('off');
});

const twoStepLoginButtonClass = computed(() => {
	if (twoStepLoginValue === undefined) {
		return 'bg-accent-red';
	}
	return twoStepLoginValue === '1' ? 'bg-accent-green' : 'bg-accent-red';
});

// Mobile Number Computed Properties
const mobileNumberText = computed(() => {
	if (!mobileNumberValue) {
		return useT('off');
	}
	return useT('on');
});

const mobileNumberButtonClass = computed(() => {
	if (!mobileNumberValue) {
		return 'bg-accent-red';
	}
	return 'bg-accent-green';
});
</script>
