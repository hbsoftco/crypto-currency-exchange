<template>
	<div
		class="mb-4 px-8 border border-primary-gray-light dark:border-primary-gray-dark rounded-md"
	>
		<!-- Login2FA Section -->
		<div
			class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="flex items-center">
				<img
					src="/images/svg/profile/shield.svg"
					alt="shield"
					class="w-6 h-6"
				>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("TwoStepLogin") }}
				</h3>
				<UBadge
					:color="login2fa ? 'green' : 'red'"
					variant="solid"
					class="mr-1"
				>
					{{ login2fa ? $t('on') :$t("off") }}
				</UBadge>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("TwoStepLoginText") }}
				</p>
			</div>

			<UButton
				v-if="login2fa"
				size="sm"
				variant="ghost"
				color="red"
				class="font-bold text-sm border border-red-400"
			>
				{{ $t("remove") }}
			</UButton>

			<UButton
				v-else
				size="sm"
				variant="ghost"
				class="font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
				@click="checkEmail()"
			>
				{{ $t("adjust") }}
			</UButton>
		</div>
		<!-- Login2FA -->

		<div
			class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
		>
			<div class="flex items-center">
				<img
					src="/images/svg/profile/message.svg"
					alt="message"
					class="w-6 h-6"
				>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("emailSetup") }}
				</h3>
				<div
					v-if="getValueByKey(authStore.getCurrentUser, 'EMAIL')"
					class="flex items-center mr-4"
				>
					<img
						src="/images/svg/confirm.svg"
						alt="confirm"
						class="w-4 h-4"
					>
					<span class="text-sm font-medium mr-1">{{
						useNumber(
							String(getValueByKey(authStore.getCurrentUser, "EMAIL")),
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
				size="sm"
				variant="ghost"
				class="font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
			>
				{{ getValueByKey(authStore.getCurrentUser, 'EMAIL') ? $t('toChange') : $t("register") }}
			</UButton>
		</div>
		<!-- Email -->

		<!-- Mobile Section -->
		<div class="py-4">
			<div class="flex items-center">
				<img
					src="/images/svg/profile/mobile.svg"
					alt="mobile"
					class="w-6 h-6"
				>
				<h3 class="text-sm font-bold mr-1">
					{{ $t("mobileNumberSetting") }}
				</h3>
				<div
					v-if="getValueByKey(authStore.getCurrentUser, 'MOBILE')"
					class="flex items-center mr-4"
				>
					<img
						src="/images/svg/confirm.svg"
						alt="confirm"
						class="w-4 h-4"
					>
					<span
						class="text-sm font-medium mr-1"
						dir="ltr"
					>{{
						useNumber(
							String(getValueByKey(authStore.getCurrentUser, "MOBILE")),
						)
					}}</span>
				</div>
				<div
					v-else
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
				size="sm"
				variant="ghost"
				class="font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
			>
				{{ getValueByKey(authStore.getCurrentUser, 'MOBILE') ? $t('toChange') : $t("register") }}
			</UButton>
		</div>
		<!-- Mobile -->
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import { getValueByKey } from '~/utils/find-value-by-key';

const router = useRouter();
const toast = useToast();

const authStore = useAuthStore();
const mobileNumberValue = getValueByKey(authStore.getCurrentUser, 'MOBILE');

const login2fa = computed(() => {
	const login2faValue = getValueByKey(authStore.getCurrentUser, '2FA_ENABLED');

	if (login2faValue === undefined) {
		return false;
	}
	return login2faValue === '1' ? true : false;
});

const checkEmail = () => {
	const valid = isValidGmail(getValueByKey(authStore.getCurrentUser, 'EMAIL') || '');

	if (valid.isValid) {
		router.push('/account/security/2fa');
	}
	else {
		toast.add({
			title: useT('active2Fa'),
			description: valid.message,
			timeout: 5000,
			color: 'red',
		});
	}
};

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
