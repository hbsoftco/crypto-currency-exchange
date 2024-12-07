<template>
	<div class="">
		<div v-if="!authStore.isLoggedIn">
			<IconUser
				class="text-2xl cursor-pointer"
				@click="open = true"
			/>
		</div>
		<div v-else>
			<IconUserFill
				class="text-2xl cursor-pointer text-primary-yellow-light dark:text-primary-yellow-dark"
				@click="open = true"
			/>
		</div>

		<div
			v-if="open"
			class="fixed inset-0 bg-black bg-opacity-50 z-30"
			@click="close"
		/>
		<div
			v-if="open"
			class="fixed top-0 right-0 w-full h-full bg-background-light dark:bg-background-dark z-50 px-4 transform transition-transform duration-300 ease-in-out overflow-y-scroll"
			:class="open ? 'translate-x-0' : 'translate-x-full'"
		>
			<div class="flex justify-between items-center py-4">
				<div class="flex items-center">
					<IconArrowRight
						class="text-2xl cursor-pointer"
						@click="close"
					/>
					<div
						class="bg-primary-yellow-light dark:bg-primary-yellow-dark rounded-full mr-1 w-12 h-12 p-2 text-center"
					>
						<IconUserFill class="text-black text-3xl" />
					</div>
					<span class="text-lg font-black mr-2">کاربر ناشناس</span>
				</div>
				<UiThemeToggle />
			</div>
			<div v-if="!authStore.isLoggedIn">
				<div class="flex items-center">
					<IconLogo class="text-primary-yellow-light dark:text-primary-yellow-dark text-3xl" />
					<h5>
						به
						<span
							class="text-primary-yellow-light dark:text-primary-yellow-dark text-sm font-semibold ml-1"
						>بیت‌لند</span>خوش آمدید.
					</h5>
				</div>
				<div class="flex items-center mt-2">
					<IconAccount class="ml-2 text-subtle-text-light dark:text-subtle-text-dark  text-xl" />
					<span class="text-sm font-semibold">لطفا وارد حساب خود شوید یا ثبت نام کنید.</span>
				</div>
				<div class="grid grid-cols-2 gap-4 mt-6 pb-6">
					<UButton
						size="lg"
						class="text-base font-medium px-2 py-2 flex justify-center bg-transparent-light dark:bg-transparency-dark text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark hover:text-text-light hover:dark:text-text-light "
						to="/auth/login"
					>
						{{ $t("login") }}
					</UButton>
					<UButton
						size="lg"
						class="text-base font-medium px-2 py-2 flex justify-center"
						to="/auth/sign-up"
					>
						{{ $t("signup") }}
					</UButton>
				</div>
				<ul class="flex flex-col mt-2">
					<li
						class="border-b border-primary-gray-light dark:border-primary-gray-dark"
					>
						<ULink
							to="/account/settings"
							class="flex justify-between items-center w-full py-2.5"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconSetting
										class="text-base dark: text-subtle-text-light dark:text-subtle-text-50"
									/>
								</div>
								<p class="mb-0 text-xs font-bold">
									{{ $t("setting") }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- setting -->
					<li
						class="border-b border-primary-gray-light dark:border-primary-gray-dark"
					>
						<ULink
							to="/help-center"
							class="flex justify-between items-center w-full py-2.5"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconGuidCenter
										class="text-base dark: text-subtle-text-light dark:text-subtle-text-50"
									/>
								</div>
								<p class="mb-0 text-xs font-bold">
									{{ $t("guidCenter") }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- GuidCenter -->
					<li
						class="border-b border-primary-gray-light dark:border-primary-gray-dark"
					>
						<ULink
							to=""
							class="flex justify-between items-center w-full py-2.5"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconSuggest
										class="text-base dark: text-subtle-text-light dark:text-subtle-text-50"
									/>
								</div>
								<p class="mb-0 text-xs font-bold">
									{{ $t("suggestionsAndCriticism") }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- suggest -->
					<li
						class="border-b border-primary-gray-light dark:border-primary-gray-dark"
					>
						<ULink
							to="/live-chat"
							class="flex justify-between items-center w-full py-2.5"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconCallWithSupport
										class="text-base dark: text-subtle-text-light dark:text-subtle-text-50"
									/>
								</div>
								<p class="mb-0 text-xs font-bold">
									{{ $t("callWithSupport") }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- callWithSupport -->
					<li
						class="border-b border-primary-gray-light dark:border-primary-gray-dark"
					>
						<ULink
							to="/app"
							class="flex justify-between items-center w-full py-2.5"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconLogo class="text-primary-yellow-light dark:text-primary-yellow-dark text-lg" />
								</div>
								<p class="mb-0 text-xs font-bold">
									{{ $t("aboutUs") }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- aboutUs -->
				</ul>
			</div>
			<div v-else>
				<div>
					<div
						v-if="getValueByKey(authStore.getCurrentUser, 'EMAIL')"
						class="flex items-center mb-2"
					>
						<IconMessage class="text-2xl ml-2 dark:text-subtle-text-50" />
						<span class="text-xs font-bold mr-1">
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
							class="text-xs font-bold mr-1"
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
				<div class="grid grid-cols-2 gap-1">
					<ULink to="/account/rewards">
						<div
							class="flex justify-between items-center h-14 p-1 my-3 rounded bg-transparent-light dark:bg-transparency-dark text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark hover:text-text-light hover:dark:text-text-light"
						>
							<img
								src="/images/gift.png"
								alt="gift"
								class="w-4 h-4"
							>
							<div class="block">
								<span
									class="text-sm font-bold text-black dark:text-white"
								>{{ $t("awards") }}</span>

								<p class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('getNow') }}
								</p>
							</div>
							<div
								class="w-5 h-5 bg-primary-yellow-light dark:bg-primary-yellow-dark rounded-full text-center flex justify-center items-center"
							>
								<span class="text-xs">{{ 0 }}</span>
							</div>
						</div>
					</ULink>
					<ULink to="/account/over-view/special-club">
						<div
							class="flex items-center h-14 p-1 my-3 rounded bg-primary-yellow-light dark:bg-primary-yellow-dark"
						>
							<div class="w-4 h-4 rounded bg-black ml-1 flex justify-center items-center">
								<IconCrown
									class=" text-sm text-primary-yellow-light dark:text-primary-yellow-dark"
								/>
							</div>

							<div class="block">
								<span
									class="text-xs font-bold text-black dark:text-black"
								>{{ $t("requestVIPAccount") }}</span>

								<p class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('actNow') }}
								</p>
							</div>
						</div>
					</ULink>
				</div>
				<ul class="flex flex-col">
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/account"
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
							to="/account/authentication"
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
								<span class="text-primary-yellow-light dark:text-primary-yellow-dark rounded-sm p-0.5 px-1 border border-background-light dark:border-background-50 text-[0.625rem]">
									{{ `${$t('level')} ${String(getValueByKey(authStore.getCurrentUser, 'KYC_LVL_ID')?getValueByKey(authStore.getCurrentUser, 'KYC_LVL_ID'): 0)}` }}
								</span>
							</div>
						</ULink>
					</li>
					<!-- authentication -->
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/account/security"
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
							to="/account/fees"
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
							to="/account/user-level"
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
								<span class="text-primary-yellow-light dark:text-primary-yellow-dark rounded-sm p-0.5 px-1 border border-background-light dark:border-background-50 text-[0.625rem]">{{ String(getValueByKey(authStore.getCurrentUser, 'TRD_LVL_NAME')) }}</span>
							</div>
						</ULink>
					</li>
					<!-- userLevel -->
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/account/manage-api"
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
							to="/account/invite-friends"
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
							to="/account/rewards"
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
							to="/account/top-users"
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
							to="/account/settings"
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
							to="/account/white-list"
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
			<div class="flex justify-between mt-8 mx-10 mb-4">
				<ULink to="">
					<IconTwitter class="text-3xl text-subtle-text-light dark:text-subtle-text-dark" />
				</ULink>
				<ULink to="">
					<IconLinkedin class="text-3xl text-subtle-text-light dark:text-subtle-text-dark" />
				</ULink>
				<ULink to="">
					<IconInstagram class="text-3xl text-subtle-text-light dark:text-subtle-text-dark" />
				</ULink>
				<ULink to="">
					<IconWhatsapp class="text-3xl text-subtle-text-light dark:text-subtle-text-dark" />
				</ULink>
				<ULink to="">
					<IconTelegram class="text-3xl text-subtle-text-light dark:text-subtle-text-dark" />
				</ULink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconUser from '~/assets/svg-icons/menu/user.svg';
import IconAccount from '~/assets/svg-icons/menu/account.svg';
import IconUserFill from '~/assets/svg-icons/menu/user-fill.svg';
import IconArrowRight from '~/assets/svg-icons/menu/arrow-right.svg';
import IconAuthentication from '~/assets/svg-icons/menu/authentication.svg';
import IconMessage from '~/assets/svg-icons/menu/message.svg';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import IconCrown from '~/assets/svg-icons/menu/crown.svg';
import IconSecurity from '~/assets/svg-icons/menu/security.svg';
import IconFees from '~/assets/svg-icons/menu/quick-menu/fees.svg';
import IconUserLevel from '~/assets/svg-icons/menu/quick-menu/user-level.svg';
import IconManageAPI from '~/assets/svg-icons/menu/api.svg';
import IconInviteFriends from '~/assets/svg-icons/menu/invite-friends.svg';
import IconAwards from '~/assets/svg-icons/menu/quick-menu/awards.svg';
import IconTopUsers from '~/assets/svg-icons/menu/quick-menu/top-users.svg';
import IconWhiteList from '~/assets/svg-icons/menu/white-list.svg';
import IconSetting from '~/assets/svg-icons/menu/setting.svg';
import IconExit from '~/assets/svg-icons/menu/exit.svg';
import IconGuidCenter from '~/assets/svg-icons/menu/guid-center.svg';
import IconSuggest from '~/assets/svg-icons/menu/suggest.svg';
import IconCallWithSupport from '~/assets/svg-icons/menu/phone-support.svg';
import IconLogo from '~/assets/svg-icons/menu/logo.svg';
import IconTwitter from '~/assets/svg-icons/social/twitter.svg';
import IconLinkedin from '~/assets/svg-icons/social/linkedin.svg';
import IconInstagram from '~/assets/svg-icons/social/instagram.svg';
import IconWhatsapp from '~/assets/svg-icons/social/whatsapp.svg';
import IconTelegram from '~/assets/svg-icons/social/telegram.svg';
import { getValueByKey } from '~/utils/helpers';

const authStore = useAuthStore();

// authStore.loadAuthData();

const textRef = ref<HTMLElement | null>(null);

const open = ref(false);

const close = () => {
	open.value = false;
};

const logout = () => {
	authStore.clearAuthCredentials();
};

const copyText = () => {
	if (textRef.value) {
		const textToCopy = textRef.value.textContent || '';

		navigator.clipboard.writeText(textToCopy)
			.then(() => {
				alert(textToCopy);
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
