<template>
	<div class="px-3">
		<div
			class="relative group items-center space-x-2"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<div class="cursor-pointer">
				<IconUser
					v-if="!hover"
					class="text-[1.7rem] group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
				<IconUserFill
					v-else
					class="text-[1.7rem] dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
			</div>
			<div
				v-if="hover"
				class="absolute -right-40 top-5 py-6 opacity-100 z-10"
				@mouseover="showMenu"
				@mouseleave="hideMenu"
			>
				<div class="w-60 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4">
					<div>
						<div class="flex items-center mb-2">
							<IconMessage class="text-2xl ml-2 dark:text-subtle-text-50" />
							<span class="text-xs font-bold mr-1">{{ getValueByKey(profileData, 'EMAIL') }}</span>
						</div>
						<div class="flex items-center">
							<IconAuthentication class="text-2xl ml-2 dark:text-subtle-text-50" />
							<span
								id="copy-text"
								ref="textRef"
								class="text-xs font-bold mx-1"
							>{{ useNumber(String(getValueByKey(profileData, 'UID'))) }}</span>
							<IconCopy
								class="cursor-pointer"
								@click="copyText"
							/>
						</div>
					</div>
					<ULink to="#">
						<div class="flex justify-between items-center p-2 my-3 rounded bg-primary-yellow-light dark:bg-primary-yellow-dark">
							<div class="flex items-center">
								<div class="w-6 h-6 rounded p-1 bg-black ml-2">
									<IconCrown class="text-primary-yellow-light dark:text-primary-yellow-dark" />
								</div>
								<span class="text-sm font-bold text-black dark:text-text-dark">{{ $t("requestVIPAccount") }}</span>
							</div>
							<IconArrowLeft class="text-hover-dark dark:text-hover-dark" />
						</div>
					</ULink>
					<ul class="flex flex-col">
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
							<ULink
								to=""
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconUser class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-xs font-bold">
										{{ $t('showAccount') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- showAccount -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark mt-0">
							<ULink
								to=""
								class="flex justify-between items-center w-full py-1.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconAuthentication class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-xs font-bold">
										{{ $t('authentication') }}
									</p>
								</div>
								<div>
									<span class="text-primary-yellow-light dark:text-primary-yellow-dark rounded-sm p-0.5 px-1 border border-background-light dark:border-background-50 text-[0.625rem]">سطح ۲</span>
								</div>
							</ULink>
						</li>
						<!-- authentication -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
							<ULink
								to=""
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconSecurity class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-xs font-bold">
										{{ $t('security') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- security -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
							<ULink
								to=""
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconFees class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-xs font-bold">
										{{ $t('fees') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- fees -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark mt-0">
							<ULink
								to=""
								class="flex justify-between items-center w-full py-1.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconUserLevel class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-xs font-bold">
										{{ $t('userLevel') }}
									</p>
								</div>
								<div>
									<span class="text-primary-yellow-light dark:text-primary-yellow-dark rounded-sm p-0.5 px-1 border border-background-light dark:border-background-50 text-[0.625rem]">{{ useNumber(String(getValueByKey(profileData, 'TRD_LVL_NAME'))) }}</span>
								</div>
							</ULink>
						</li>
						<!-- userLevel -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
							<ULink
								to=""
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconManageAPI class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-xs font-bold">
										{{ $t('manageAPI') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- manageAPI -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
							<ULink
								to="/referral"
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconInviteFriends class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-xs font-bold">
										{{ $t('inviteFriends') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- inviteFriends -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
							<ULink
								to=""
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconAwards class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-xs font-bold">
										{{ $t('awards') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- awards -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
							<ULink
								to=""
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconTopUsers class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-xs font-bold">
										{{ $t('topUsers') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- topUsers -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
							<ULink
								to=""
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconSetting class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-xs font-bold">
										{{ $t('setting') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- setting -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
							<ULink
								to=""
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconWhiteList class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-xs font-bold">
										{{ $t('whiteList') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- whiteList -->
						<li class="">
							<ULink
								to=""
								class="flex justify-between items-center w-full py-2.5"
								@click.prevent="logout"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconExit class="text-base dark: text-accent-red" />
									</div>
									<p class="mb-0 text-xs font-bold">
										{{ $t('exit') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- exit -->
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconAuthentication from '~/assets/svg-icons/menu/authentication.svg';
import IconMessage from '~/assets/svg-icons/menu/message.svg';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import IconCrown from '~/assets/svg-icons/menu/crown.svg';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import IconSecurity from '~/assets/svg-icons/menu/security.svg';
import IconFees from '~/assets/svg-icons/menu/quick-menu/fees.svg';
import IconUser from '~/assets/svg-icons/menu/user.svg';
import IconUserFill from '~/assets/svg-icons/menu/user-fill.svg';
import IconUserLevel from '~/assets/svg-icons/menu/quick-menu/user-level.svg';
import IconManageAPI from '~/assets/svg-icons/menu/api.svg';
import IconInviteFriends from '~/assets/svg-icons/menu/invite-friends.svg';
import IconAwards from '~/assets/svg-icons/menu/quick-menu/awards.svg';
import IconTopUsers from '~/assets/svg-icons/menu/quick-menu/top-users.svg';
import IconWhiteList from '~/assets/svg-icons/menu/white-list.svg';
import IconSetting from '~/assets/svg-icons/menu/setting.svg';
import IconExit from '~/assets/svg-icons/menu/exit.svg';
import type { ProfilePair } from '~/types/response/profile.types';
import { getValueByKey } from '~/utils/find-value-by-key';
import { useNumber } from '~/composables/useNumber';

const textRef = ref<HTMLElement | null>(null);

const hover = ref(false);

const showMenu = () => {
	hover.value = true;
};

const hideMenu = () => {
	hover.value = false;
};

const logout = () => {
	const authStore = useAuthStore();
	authStore.clearAuthData();
};

const profileStore = useProfileStore();
const profileData: ProfilePair[] = await profileStore.userProfile;

const copyText = () => {
	if (textRef.value) {
		const toast = useToast();

		const textToCopy = textRef.value.textContent || '';

		navigator.clipboard.writeText(textToCopy)
			.then(() => {
				toast.add({
					title: useT('copy'),
					description: useT('codeCopiedSuccessfully'),
					timeout: 5000,
					color: 'green',
				});
			})
			.catch((err: Error) => {
				throw new Error(`${err}`);
			});
	}
	else {
		throw new Error(`Text element not found.`);
	}
};
</script>
