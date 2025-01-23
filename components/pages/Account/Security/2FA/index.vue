<template>
	<div
		v-if="!isMobile"
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
					:color="authStore.login2faStatus ? 'green' : 'red'"
					variant="solid"
					class="mr-1"
				>
					{{ authStore.login2faStatus ? $t('on') :$t("off") }}
				</UBadge>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("TwoStepLoginText") }}
				</p>
			</div>

			<UButton
				v-if="authStore.login2faStatus"
				size="sm"
				variant="ghost"
				color="red"
				class="font-bold text-sm border border-red-400"
				to="/user/security/2fa/disable"
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
				{{ $t("activeItem") }}
			</UButton>
		</div>
		<!-- Login2FA -->

		<!-- Email Section -->
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
					<span class="text-sm font-medium mr-1">
						{{ getValueByKey(authStore.getCurrentUser, "EMAIL") }}
					</span>
				</div>
				<UBadge
					v-else
					color="red"
					variant="solid"
					class="mr-1"
				>
					{{ $t("off") }}
				</UBadge>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("emailSetupText") }}
				</p>
			</div>
			<UButton
				to="/user/security/change-email"
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
					>
						{{ getValueByKey(authStore.getCurrentUser, "MOBILE") }}
					</span>
				</div>
				<UBadge
					v-else
					color="red"
					variant="solid"
					class="mr-1"
				>
					{{ $t("off") }}
				</UBadge>
			</div>
			<div class="my-3">
				<p class="text-sm font-normal">
					{{ $t("mobileNumberSettingText") }}
				</p>
			</div>

			<UButton
				to="/user/security/change-phone"
				size="sm"
				variant="ghost"
				class="font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
			>
				{{ getValueByKey(authStore.getCurrentUser, 'MOBILE') ? $t('toChange') : $t("register") }}
			</UButton>
		</div>
		<!-- Mobile -->
	</div>

	<div v-else>
		<div class="">
			<div class="flex gap-2 mb-2">
				<ULink
					class="bg-primary-gray-light dark:bg-primary-gray-dark rounded py-4 px-2 w-48 min-w-48"
					@click="goTo2FA()"
				>
					<div class="flex justify-between items-center mb-4">
						<div class="flex justify-start items-center">
							<span>
								<img
									src="/images/svg/profile/google-authenticator.svg"
									alt="shield"
									class="w-6 h-6"
								>
							</span>
							<span>
								<UBadge
									:color="authStore.login2faStatus ? 'green' : 'red'"
									variant="solid"
									class="mr-1"
								>
									{{ authStore.login2faStatus ? $t('on') :$t("off") }}
								</UBadge>
							</span>
						</div>
						<span>
							<IconArrowLeft class="text-xl" />
						</span>
					</div>
					<div class="text-right">
						<span class="text-sm">
							{{ $t("TwoStepLogin") }}
						</span>
					</div>
				</ULink>
				<!-- 2FA -->

				<ULink
					to="/user/security/change-email"
					class="bg-primary-gray-light dark:bg-primary-gray-dark rounded py-4 px-2 w-full"
				>
					<div class="flex justify-between items-center mb-4">
						<div class="flex justify-start items-center">
							<span>
								<img
									src="/images/svg/profile/message.svg"
									alt="shield"
									class="w-6 h-6"
								>
							</span>
							<div>
								<div
									v-if="getValueByKey(authStore.getCurrentUser, 'EMAIL')"
									class="flex items-center mr-4"
								>
									<img
										src="/images/svg/confirm.svg"
										alt="confirm"
										class="w-5 h-5"
									>
								</div>
								<UBadge
									v-else
									color="red"
									variant="solid"
									class="mr-1"
								>
									{{ $t("off") }}
								</UBadge>
							</div>
						</div>
						<span>
							<IconArrowLeft class="text-xl" />
						</span>
					</div>
					<div class="text-right">
						<span class="text-sm">
							{{ $t("emailSetup") }}
						</span>
					</div>
				</ULink>
				<!-- Email -->
			</div>
			<div class="flex gap-2">
				<ULink
					to="/user/security/change-phone"
					class="bg-primary-gray-light dark:bg-primary-gray-dark rounded py-4 px-2 w-48 min-w-48"
				>
					<div class="flex justify-between items-center mb-4">
						<div class="flex justify-start items-center">
							<span>
								<img
									src="/images/svg/profile/mobile.svg"
									alt="shield"
									class="w-6 h-6"
								>
							</span>
							<div>
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
									>
										{{ getValueByKey(authStore.getCurrentUser, "MOBILE") }}
									</span>
								</div>
								<UBadge
									v-else
									color="red"
									variant="solid"
									class="mr-1"
								>
									{{ $t("off") }}
								</UBadge>
							</div>
						</div>
						<span>
							<IconArrowLeft class="text-xl" />
						</span>
					</div>
					<div class="text-right">
						<span class="text-sm">
							{{ $t("mobileNumberSetting") }}
						</span>
					</div>
				</ULink>
				<!-- Mobile -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left-fill.svg';
import { getValueByKey } from '~/utils/helpers';

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});

const router = useRouter();
const toast = useToast();

const authStore = useAuthStore();

const goTo2FA = () => {
	if (authStore.login2faStatus) {
		router.push('/user/security/2fa/disable');
	}
	else {
		checkEmail();
	}
};

const checkEmail = () => {
	const valid = isValidGmail(getValueByKey(authStore.getCurrentUser, 'EMAIL') || '');

	if (valid.isValid) {
		router.push('/user/security/2fa');
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
</script>
