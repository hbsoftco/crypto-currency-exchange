<template>
	<div class="p-5">
		<div class="mb-6">
			<UiTitleWithBack :title="$t('security')" />
		</div>
		<section>
			<div class="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-primary-gray-light dark:border-primary-gray-dark">
				<div class="col-span-8">
					<div class="mb-4 px-8 border border-primary-gray-light dark:border-primary-gray-dark rounde-md">
						<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<div class="flex items-center">
								<NuxtImg
									src="./images/svg/profile/sheild.svg"
									alt="sheild"
									class="w-6 h-6"
								/>
								<h3 class="text-sm font-bold mr-1">
									{{ $t('TwoStepLogin') }}
								</h3>
								<div class="bg-accent-red rounded-full px-2 mr-4">
									<span class="text-sm font-medium">{{ $t('off') }}</span>
								</div>
							</div>
							<div class="my-3">
								<p class="text-sm font-normal">
									{{ $t('TwoStepLoginText') }}
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
						<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<div class="flex items-center">
								<NuxtImg
									src="./images/svg/profile/message.svg"
									alt="message"
									class="w-6 h-6"
								/>
								<h3 class="text-sm font-bold mr-1">
									{{ $t('emailSetup') }}
								</h3>
								<div class="flex items-center mr-4">
									<NuxtImg
										src="/images/Confirmation.png"
										alt="Confirmation"
										class="w-4 h-4"
									/>
									<span class="text-sm font-medium mr-1">{{ useNumber(String(getValueByKey(profileStore.userProfile, 'EMAIL'))) }}</span>
								</div>
							</div>
							<div class="my-3">
								<p class="text-sm font-normal">
									{{ $t('emailSetupText') }}
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
						<div class="py-4">
							<div class="flex items-center">
								<NuxtImg
									src="./images/svg/profile/mobile.svg"
									alt="mobile"
									class="w-6 h-6"
								/>
								<h3 class="text-sm font-bold mr-1">
									{{ $t('mobileNumberSetting') }}
								</h3>
								<div class="bg-accent-red rounded-full px-2 mr-4">
									<span class="text-sm font-medium">{{ $t('off') }}</span>
								</div>
							</div>
							<div class="my-3">
								<p class="text-sm font-normal">
									{{ $t('mobileNumberSettingText') }}
								</p>
							</div>
							<UButton
								color="gray"
								class="text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
							>
								{{ $t('register') }}
							</UButton>
						</div>
					</div>
					<!-- TwoStepLogin -->
					<div class="mb-4  px-8 border border-primary-gray-light dark:border-primary-gray-dark rounde-md">
						<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<div class="flex items-center">
								<IconSheild class="text-3xl" />
								<h3 class="text-base font-bold mr-2">
									{{ $t('advancedSecuritySettings') }}
								</h3>
							</div>
						</div>

						<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<div class="flex items-center">
								<NuxtImg
									src="./images/svg/profile/password.svg"
									alt="message"
									class="w-6 h-6"
								/>
								<h3 class="text-sm font-bold mr-1">
									{{ $t('antiPhishingPhrase') }}
								</h3>
								<div class="bg-accent-green rounded-full px-2 mr-4">
									<span class="text-sm font-medium">{{ $t('light') }}</span>
								</div>
							</div>
							<div class="my-3">
								<p class="text-sm font-normal">
									{{ $t('antiPhishingPhraseText') }}
								</p>
							</div>
							<UButton
								to="/account/security/anti-phishing"
								color="gray"
								class="text-accent-red dark:text-accent-red text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
							>
								{{ $t("remove") }}
							</UButton>
						</div>

						<div class="py-4 ">
							<div class="flex items-center">
								<NuxtImg
									src="./images/svg/profile/password.svg"
									alt="message"
									class="w-6 h-6"
								/>
								<h3 class="text-sm font-bold mr-1">
									{{ $t('pinCodeWithdrawal') }}
								</h3>
								<div class="bg-accent-red rounded-full px-2 mr-4">
									<span class="text-sm font-medium">{{ $t('off') }}</span>
								</div>
							</div>
							<div class="my-3">
								<p class="text-sm font-normal">
									{{ $t('pinCodeWithdrawalText') }}
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

						<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<div class="flex items-center">
								<NuxtImg
									src="./images/svg/profile/bullet.svg"
									alt="bullet"
									class="w-6 h-6"
								/>
								<h3 class="text-sm font-bold mr-1">
									{{ $t('ipWhitelist') }}
								</h3>
							</div>
							<div class="my-3">
								<p class="text-sm font-normal">
									{{ $t('ipWhitelistText') }}
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

						<div class="py-4 ">
							<div class="flex items-center">
								<NuxtImg
									src="./images/svg/profile/lock.svg"
									alt="lock"
									class="w-6 h-6"
								/>
								<h3 class="text-sm font-bold mr-1">
									{{ $t('loginPassword') }}
								</h3>
							</div>
							<div class="my-3">
								<p class="text-sm font-normal">
									{{ $t('loginPasswordText') }}
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
					<!-- Advanced security settings  -->

					<div class="mb-4  px-8 border border-primary-gray-light dark:border-primary-gray-dark rounde-md">
						<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<div class="flex items-center">
								<IconDevice class="text-3xl" />
								<h3 class="text-base font-bold mr-2">
									{{ $t('devicesEvents') }}
								</h3>
							</div>
						</div>

						<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<div class="flex items-center">
								<IconDate class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark" />
								<h3 class="text-sm font-bold mr-1">
									{{ $t('accountActivities') }}
								</h3>
							</div>
							<div class="my-3">
								<p class="text-sm font-normal">
									{{ $t('accountActivitiesText') }}
								</p>
							</div>
							<UButton
								to="/account/security/active-account"
								color="gray"
								class="text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
							>
								{{ $t("view") }}
							</UButton>
						</div>

						<div class="py-4  border-b border-primary-gray-light dark:border-primary-gray-dark">
							<div class="flex items-center">
								<IconDevice class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark" />
								<h3 class="text-sm font-bold mr-1">
									{{ $t('devices') }}
								</h3>
							</div>
							<div class="my-3">
								<p class="text-sm font-normal">
									{{ $t('devicesText') }}
								</p>
							</div>
							<UButton
								to="/account/security/device-manage"
								color="gray"
								class="text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
							>
								{{ $t("view") }}
							</UButton>
						</div>

						<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<div class="flex items-center">
								<NuxtImg
									src="./images/svg/profile/hamberger.svg"
									alt="bullet"
									class="w-6 h-6"
								/>
								<h3 class="text-sm font-bold mr-1">
									{{ $t('freezeAccount') }}
								</h3>
							</div>
							<div class="my-3">
								<p class="text-sm font-normal">
									{{ $t('freezeAccountText') }}
								</p>
							</div>
							<UButton
								to="/account/security/freeze-account"
								color="gray"
								class="text-accent-red dark:text-accent-red  text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
							>
								{{ $t("toFreeze") }}
							</UButton>
						</div>

						<div class="py-4">
							<div class="flex items-center">
								<NuxtImg
									src="./images/svg/profile/user-delete.svg"
									alt="lock"
									class="w-6 h-6"
								/>
								<h3 class="text-sm font-bold mr-1">
									{{ $t('deleteAccount') }}
								</h3>
							</div>
							<div class="my-3">
								<p class="text-sm font-normal">
									{{ $t('deleteAccountText') }}
								</p>
							</div>
							<UButton
								to="/account/security/delete-account"
								color="gray"
								class="text-accent-red dark:text-accent-red  text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
							>
								{{ $t("remove") }}
							</UButton>
						</div>
					</div>
					<!-- Devices and events -->
				</div>
				<div class="col-span-4">
					<div class="p-4 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md">
						<div class="flex items-center">
							<NuxtImg
								src="./images/svg/profile/sheild.svg"
								alt="sheild"
								class="w-4 h-4"
							/>
							<span class="text-sm font-bold mr-2">{{ $t('securityLevel') }}</span>
						</div>
						<div class="py-4">
							<p class="text-xs font-normal">
								{{ $t('securityLevelText') }}
							</p>
						</div>
						<div>
							<span class="text-xs font-normal">{{ $t('securityLevel') }}:</span>
							<span
								class="text-xs font-bold mr-1"
								:class="getSecurityTextColor()"
							>{{ getSecurityLevelText() }}</span>
						</div>
						<div class="mt-4 grid grid-cols-3 gap-4">
							<div
								:class="getSecurityColor(1)"
								class="h-2 w-full bg-gray-200 rounded-sm"
							/>
							<div
								:class="getSecurityColor(2)"
								class="h-2 w-full bg-gray-200 rounded-sm"
							/>
							<div
								:class="getSecurityColor(3)"
								class="h-2 w-full bg-gray-200 rounded-sm"
							/>
						</div>
					</div>

					<div class="p-4 my-4 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md">
						<div class="flex justify-between items-center">
							<div class="flex">
								<IconEducation class="text-base text-primary-yellow-light dark:text-primary-yellow-dark" />
								<span class="text-sm font-bold mr-2">{{ $t('education') }}</span>
							</div>
							<IconArrowRight
								class="text-2xl cursor-pointer"
							/>
						</div>
						<div class="py-4">
							<p class="text-xs font-normal">
								{{ $t('tutorialText') }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconSheild from '~/assets/svg-icons/profile/sheild.svg';
import IconDevice from '~/assets/svg-icons/profile/device.svg';
import IconDate from '~/assets/svg-icons/menu/quick-menu/transaction-history.svg';
import IconEducation from '~/assets/svg-icons/education.svg';
import IconArrowRight from '~/assets/svg-icons/menu/arrow-left.svg';
import { getValueByKey } from '~/utils/find-value-by-key';
import { useNumber } from '~/composables/useNumber';

const profileStore = useProfileStore();

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const securityLevel = ref('weak');

const getSecurityColor = (index: number) => {
	if (securityLevel.value === 'weak') {
		return index === 1 ? 'bg-accent-red dark:bg-accent-red' : 'bg-gray-200';
	}
	else if (securityLevel.value === 'averageLevel') {
		return index <= 2 ? 'bg-accent-blue dark:bg-accent-blue' : 'bg-gray-200';
	}
	else if (securityLevel.value === 'good') {
		return 'bg-accent-green dark:bg-accent-green';
	}
	return 'bg-gray-200';
};

const getSecurityTextColor = () => {
	if (securityLevel.value === 'weak') {
		return 'text-accent-red';
	}
	else if (securityLevel.value === 'averageLevel') {
		return 'text-accent-blue';
	}
	else if (securityLevel.value === 'good') {
		return 'text-accent-green';
	}
	return 'text-gray-500';
};

const getSecurityLevelText = () => {
	if (securityLevel.value === 'weak') {
		return 'ضعیف';
	}
	else if (securityLevel.value === 'averageLevel') {
		return 'متوسط';
	}
	else if (securityLevel.value === 'good') {
		return 'خوب';
	}
};
</script>

<style scoped></style>
