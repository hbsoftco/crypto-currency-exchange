<template>
	<div>
		<div>
			<UserHeader />
		</div>
		<div class="px-6 mt-10">
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
							to="/user/settings"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconSetting
										class="text-base dark: text-subtle-text-light dark:text-subtle-text-50"
									/>
								</div>
								<p class="mb-0 text-sm font-semibold">
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
							to="/help"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconGuidCenter
										class="text-base dark: text-subtle-text-light dark:text-subtle-text-50"
									/>
								</div>
								<p class="mb-0 text-sm font-semibold">
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
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconSuggest
										class="text-base dark: text-subtle-text-light dark:text-subtle-text-50"
									/>
								</div>
								<p class="mb-0 text-sm font-semibold">
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
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconCallWithSupport
										class="text-base dark: text-subtle-text-light dark:text-subtle-text-50"
									/>
								</div>
								<p class="mb-0 text-sm font-semibold">
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
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconLogo class="text-primary-yellow-light dark:text-primary-yellow-dark text-lg" />
								</div>
								<p class="mb-0 text-sm font-semibold">
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
				<div class="grid grid-cols-2 gap-1">
					<ULink to="/user/rewards">
						<div
							class="flex items-center h-12 p-1 my-3 rounded bg-transparent dark:bg-transparent text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark hover:text-text-light hover:dark:text-text-light"
						>
							<img
								src="/images/svg/gift.svg"
								alt="gift"
								class="w-4 h-4"
							>
							<div class="block mr-1">
								<span
									class="text-sm font-bold text-black dark:text-white"
								>{{ $t("awards") }}</span>

								<p class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('getNow') }}
								</p>
							</div>
							<!-- <div
								class="w-5 h-5 bg-primary-yellow-light dark:bg-primary-yellow-dark rounded-full text-center flex justify-center items-center"
							>
								<span class="text-xs">{{ 0 }}</span>
							</div> -->
						</div>
					</ULink>
					<ULink to="/vip-program">
						<div
							class="flex items-center h-12 p-1 my-3 rounded bg-primary-yellow-light dark:bg-primary-yellow-dark"
						>
							<div class="w-5 h-5 rounded-sm bg-black ml-1 flex justify-center items-center">
								<IconCrown
									class=" text-sm text-primary-yellow-light dark:text-primary-yellow-dark"
								/>
							</div>

							<div class="block">
								<span
									class="text-xs font-bold text-black dark:text-black"
								>{{ $t("requestVIPAccount") }}</span>

								<p class="text-xs font-normal text-black dark:text-black">
									{{ $t('actNow') }}
								</p>
							</div>
						</div>
					</ULink>
				</div>
				<ul class="flex flex-col">
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/user/invite-friends"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconInviteFriends class="text-lg dark: text-subtle-text-light dark:text-subtle-text-50" />
								</div>
								<p class="mb-0 text-sm font-semibold">
									{{ $t('inviteFriends') }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- inviteFriends -->
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark mt-0">
						<ULink
							to="/user/id-auth"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconAuthentication class="text-lg dark: text-subtle-text-light dark:text-subtle-text-50" />
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
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark mt-0">
						<ULink
							to="/user/user-level"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconUserLevel class="text-lg dark: text-subtle-text-light dark:text-subtle-text-50" />
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
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/user/fees"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconFees class="text-lg dark: text-subtle-text-light dark:text-subtle-text-50" />
								</div>
								<p class="mb-0 text-sm font-semibold">
									{{ $t('fees') }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- fees -->
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/user/top-users"
							class="flex justify-between items-center w-full py-3"
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
					</li>
					<!-- topUsers -->
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/user/security"
							class="flex justify-between items-center w-full py-3"
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
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/user/settings"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconSetting class="text-lg dark: text-subtle-text-light dark:text-subtle-text-50" />
								</div>
								<p class="mb-0 text-sm font-semibold">
									{{ $t('setting') }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- setting -->
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/user/apikeys"
							class="flex justify-between items-center w-full py-3"
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
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/user/white-list"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconWhiteList class="text-lg dark: text-subtle-text-light dark:text-subtle-text-50" />
								</div>
								<p class="mb-0 text-sm font-semibold">
									{{ $t('whiteList') }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- whiteList -->
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/user"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconUser class="text-lg dark: text-subtle-text-light dark:text-subtle-text-50" />
								</div>
								<p class="mb-0 text-sm font-semibold">
									{{ $t('pointsProgram') }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- pointsProgram -->
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/help"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconGuidCenter
										class="text-base dark: text-subtle-text-light dark:text-subtle-text-50"
									/>
								</div>
								<p class="mb-0 text-sm font-semibold">
									{{ $t('helpCenter') }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- awards -->
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/support/tickets/mine"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconTicket class="text-lg dark: text-subtle-text-light dark:text-subtle-text-50" />
								</div>
								<p class="mb-0 text-sm font-semibold">
									{{ $t('sendTicket') }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- sendTicket -->
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/support/tickets/mine"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconTicket class="text-lg dark: text-subtle-text-light dark:text-subtle-text-50" />
								</div>
								<p class="mb-0 text-sm font-semibold">
									{{ $t('suggestionsAndCriticism') }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- suggestionsAndCriticism -->
					<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<ULink
							to="/app"
							class="flex justify-between items-center w-full py-3"
						>
							<div class="flex justify-start items-center">
								<div class="ml-2">
									<IconLogo class="text-primary-yellow-light dark:text-primary-yellow-dark text-lg" />
								</div>
								<p class="mb-0 text-sm font-semibold">
									{{ $t('aboutUs') }}
								</p>
							</div>
						</ULink>
					</li>
					<!-- sendTicket -->
					<li class="bg-primary-gray-light dark:bg-primary-gray-dark px-4">
						<ULink
							to=""
							class="flex justify-between items-center w-full py-3"
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
import UserHeader from '~/components/layouts/Default/Mobile/UserHeader.vue';
import IconUser from '~/assets/svg-icons/menu/user.svg';
import IconAccount from '~/assets/svg-icons/menu/account.svg';
import IconAuthentication from '~/assets/svg-icons/menu/authentication.svg';
import IconMessage from '~/assets/svg-icons/menu/message.svg';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import IconCrown from '~/assets/svg-icons/menu/crown.svg';
import IconSecurity from '~/assets/svg-icons/menu/security.svg';
import IconFees from '~/assets/svg-icons/menu/quick-menu/fees.svg';
import IconUserLevel from '~/assets/svg-icons/menu/quick-menu/user-level.svg';
import IconManageAPI from '~/assets/svg-icons/menu/api.svg';
import IconInviteFriends from '~/assets/svg-icons/menu/invite-friends.svg';
import IconTopUsers from '~/assets/svg-icons/menu/quick-menu/top-users.svg';
import IconWhiteList from '~/assets/svg-icons/menu/white-list.svg';
import IconSetting from '~/assets/svg-icons/menu/setting.svg';
import IconExit from '~/assets/svg-icons/menu/exit.svg';
import IconGuidCenter from '~/assets/svg-icons/menu/guid-center.svg';
import IconSuggest from '~/assets/svg-icons/menu/suggest.svg';
import IconCallWithSupport from '~/assets/svg-icons/menu/phone-support.svg';
import IconTicket from '~/assets/svg-icons/menu/ticket.svg';
import IconLogo from '~/assets/svg-icons/menu/logo.svg';
import IconTwitter from '~/assets/svg-icons/social/twitter.svg';
import IconLinkedin from '~/assets/svg-icons/social/linkedin.svg';
import IconInstagram from '~/assets/svg-icons/social/instagram.svg';
import IconWhatsapp from '~/assets/svg-icons/social/whatsapp.svg';
import IconTelegram from '~/assets/svg-icons/social/telegram.svg';
import { getValueByKey } from '~/utils/helpers';

const authStore = useAuthStore();

const logout = () => {
	authStore.clearAuthCredentials();
};

const textRef = ref<HTMLElement | null>(null);
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
