<template>
	<div class="px-3">
		<div
			class="relative group items-center space-x-2"
		>
			<div class="cursor-pointer">
				<IconUser
					class="text-[1.7rem]  block group-hover:hidden group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
				<IconUserFill
					class="text-[1.7rem] hidden group-hover:block dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
			</div>
			<div
				class="absolute -right-40 top-[1.55rem] py-[0.9rem] hidden group-hover:block opacity-100 z-10"
			>
				<div class="w-60 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4">
					<div>
						<div
							v-if="getValueByKey(authStore.getCurrentUser, 'EMAIL')"
							class="flex items-center mb-2"
						>
							<IconMessage class="text-2xl ml-2 dark:text-subtle-text-50" />
							<span class="text-sm font-semibold mr-1">
								{{ authStore.currentUserLoading ? '...': getValueByKey(authStore.getCurrentUser, 'EMAIL') }}
							</span>
						</div>
						<div
							v-if="getValueByKey(authStore.getCurrentUser, 'MOBILE')"
							class="flex items-center mb-2"
						>
							<UIcon
								name="i-heroicons-phone"
								class="w-6 h-6 ml-2 dark:text-subtle-text-50"
							/>
							<span
								class="text-sm font-semibold mr-1"
								dir="ltr"
							>
								{{ authStore.currentUserLoading ? '...': getValueByKey(authStore.getCurrentUser, 'MOBILE') }}
							</span>
						</div>
						<div class="flex items-center">
							<IconAuthentication class="text-2xl ml-2 dark:text-subtle-text-50" />
							<span
								id="copy-text"
								ref="textRef"
								class="text-xs font-bold mx-1"
							>
								{{ authStore.currentUserLoading ? '...': String(getValueByKey(authStore.getCurrentUser, 'UID')) }}
							</span>
							<IconCopy
								class="cursor-pointer"
								@click="copyText"
							/>
						</div>
					</div>
					<ULink to="/vip-program">
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
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark hover:bg-hover2-light dark:hover:bg-hover2-dark">
							<ULink
								to="/user"
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconUser class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-sm font-semibold">
										{{ $t('showAccount') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- showAccount -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark mt-0 hover:bg-hover2-light dark:hover:bg-hover2-dark">
							<ULink
								to="/user/id-auth"
								class="flex justify-between items-center w-full py-1.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconAuthentication class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-sm font-semibold">
										{{ $t('authentication') }}
									</p>
								</div>
								<div>
									<span class="text-primary-yellow-light dark:text-primary-yellow-dark rounded-sm p-0.5 px-1 border border-background-light dark:border-background-50 text-[0.625rem]">
										{{ `${$t('level')} ${String(getValueByKey(authStore.getCurrentUser, 'KYC_LVL_ID')?getValueByKey(authStore.getCurrentUser, 'KYC_LVL_ID'): 0)}` }}
									</span>
								</div>
							</ULink>
						</li>
						<!-- authentication -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark hover:bg-hover2-light dark:hover:bg-hover2-dark">
							<ULink
								to="/user/security"
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconSecurity class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-sm font-semibold">
										{{ $t('security') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- security -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark hover:bg-hover2-light dark:hover:bg-hover2-dark">
							<ULink
								to="/user/fees"
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconFees class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-sm font-semibold">
										{{ $t('fees') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- fees -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark mt-0 hover:bg-hover2-light dark:hover:bg-hover2-dark">
							<ULink
								to="/user/level"
								class="flex justify-between items-center w-full py-1.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconUserLevel class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-sm font-semibold">
										{{ $t('userLevel') }}
									</p>
								</div>
								<div>
									<span class="text-primary-yellow-light dark:text-primary-yellow-dark rounded-sm p-0.5 px-1 border border-background-light dark:border-background-50 text-[0.625rem]">{{ String(getValueByKey(authStore.getCurrentUser, 'TRD_LVL_NAME')) }}</span>
								</div>
							</ULink>
						</li>
						<!-- userLevel -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark hover:bg-hover2-light dark:hover:bg-hover2-dark">
							<ULink
								to="/user/apikeys"
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconManageAPI class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-sm font-semibold">
										{{ $t('manageAPI') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- manageAPI -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark hover:bg-hover2-light dark:hover:bg-hover2-dark">
							<ULink
								to="/user/invitation"
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconInviteFriends class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-sm font-semibold">
										{{ $t('inviteFriends') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- inviteFriends -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark hover:bg-hover2-light dark:hover:bg-hover2-dark">
							<ULink
								to="/user/reward"
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconAwards class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-sm font-semibold">
										{{ $t('awards') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- awards -->
						<!-- <li class="border-b border-primary-gray-light dark:border-primary-gray-dark hover:bg-hover2-light dark:hover:bg-hover2-dark">
							<ULink
								to="/user/top-users"
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconTopUsers class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-sm font-semibold">
										{{ $t('topUsers') }}
									</p>
								</div>
							</ULink>
						</li> -->
						<!-- topUsers -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark hover:bg-hover2-light dark:hover:bg-hover2-dark">
							<ULink
								to="/user/preference"
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconSetting class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-sm font-semibold">
										{{ $t('setting') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- setting -->
						<li class="border-b border-primary-gray-light dark:border-primary-gray-dark hover:bg-hover2-light dark:hover:bg-hover2-dark">
							<ULink
								to="/user/wbl"
								class="flex justify-between items-center w-full py-2.5"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconWhiteList class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
									</div>
									<p class="mb-0 text-sm font-semibold">
										{{ $t('whiteList') }}
									</p>
								</div>
							</ULink>
						</li>
						<!-- whiteList -->
						<li class=" hover:bg-hover2-light dark:hover:bg-hover2-dark">
							<ULink
								to=""
								class="flex justify-between items-center w-full py-2.5"
								@click.prevent="logout"
							>
								<div class="flex justify-start items-center">
									<div class="ml-2">
										<IconExit class="text-base dark: text-accent-red" />
									</div>
									<p class="mb-0 text-sm font-semibold">
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
// import IconTopUsers from '~/assets/svg-icons/menu/quick-menu/top-users.svg';
import IconWhiteList from '~/assets/svg-icons/menu/white-list.svg';
import IconSetting from '~/assets/svg-icons/menu/setting.svg';
import IconExit from '~/assets/svg-icons/menu/exit.svg';
import { getValueByKey } from '~/utils/helpers';

const textRef = ref<HTMLElement | null>(null);
const authStore = useAuthStore();

const logout = () => {
	authStore.clearAuthCredentials();
};

onMounted(() => {
	authStore.fetchCurrentUser();
});

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
