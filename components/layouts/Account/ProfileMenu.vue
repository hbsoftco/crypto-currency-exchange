<template>
	<div class="p-4">
		<ul class="flex flex-col">
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/account"
					class="flex justify-between items-center w-full py-3.5"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconUser class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
						</div>
						<p class="mb-0 text-base font-medium text-subtle-text-light dark:text-subtle-text-50">
							{{ $t('showAccount') }}
						</p>
					</div>
				</ULink>
			</li>
			<!-- showAccount -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark mt-0">
				<ULink
					to=""
					class="flex justify-between items-center w-full py-3.5"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconAuthentication class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
						</div>
						<p class="mb-0 text-base font-medium text-subtle-text-light dark:text-subtle-text-50">
							{{ $t('authentication') }}
						</p>
					</div>
				</ULink>
			</li>
			<!-- authentication -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/account/security"
					class="flex justify-between items-center w-full py-3.5"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconSecurity class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
						</div>
						<p class="mb-0 text-base font-medium text-subtle-text-light dark:text-subtle-text-50">
							{{ $t('security') }}
						</p>
					</div>
				</ULink>
			</li>
			<!-- security -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to=""
					class="flex justify-between items-center w-full py-3.5"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconFees class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
						</div>
						<p class="mb-0 text-base font-medium text-subtle-text-light dark:text-subtle-text-50">
							{{ $t('fees') }}
						</p>
					</div>
				</ULink>
			</li>
			<!-- fees -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark mt-0">
				<ULink
					to=""
					active-class="font-bold"
					class="flex justify-between items-center w-full py-3.5"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconUserLevel class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
						</div>
						<p class="mb-0 text-base font-medium text-subtle-text-light dark:text-subtle-text-50">
							{{ $t('userLevel') }}
						</p>
					</div>
				</ULink>
			</li>
			<!-- userLevel -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to=""
					class="flex justify-between items-center w-full py-3.5"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconManageAPI class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
						</div>
						<p class="mb-0 text-base font-medium text-subtle-text-light dark:text-subtle-text-50">
							{{ $t('manageAPI') }}
						</p>
					</div>
				</ULink>
			</li>
			<!-- manageAPI -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/referral"
					class="flex justify-between items-center w-full py-3.5"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconInviteFriends class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
						</div>
						<p class="mb-0 text-base font-medium text-subtle-text-light dark:text-subtle-text-50">
							{{ $t('inviteFriends') }}
						</p>
					</div>
				</ULink>
			</li>
			<!-- inviteFriends -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to=""
					class="flex justify-between items-center w-full py-3.5"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconAwards class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
						</div>
						<p class="mb-0 text-base font-medium text-subtle-text-light dark:text-subtle-text-50">
							{{ $t('awards') }}
						</p>
					</div>
				</ULink>
			</li>
			<!-- awards -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to=""
					class="flex justify-between items-center w-full py-3.5"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconTopUsers class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
						</div>
						<p class="mb-0 text-base font-medium text-subtle-text-light dark:text-subtle-text-50">
							{{ $t('topUsers') }}
						</p>
					</div>
				</ULink>
			</li>
			<!-- topUsers -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to=""
					class="flex justify-between items-center w-full py-3.5"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconSetting class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
						</div>
						<p class="mb-0 text-base font-medium text-subtle-text-light dark:text-subtle-text-50">
							{{ $t('setting') }}
						</p>
					</div>
				</ULink>
			</li>
			<!-- setting -->
			<li>
				<ULink
					to=""
					class="flex justify-between items-center w-full py-3.5"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconWhiteList class="text-base dark: text-subtle-text-light dark:text-subtle-text-50" />
						</div>
						<p class="mb-0 text-base font-medium text-subtle-text-light dark:text-subtle-text-50">
							{{ $t('whiteList') }}
						</p>
					</div>
				</ULink>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import IconAuthentication from '~/assets/svg-icons/menu/authentication.svg';
import IconSecurity from '~/assets/svg-icons/menu/security.svg';
import IconFees from '~/assets/svg-icons/menu/quick-menu/fees.svg';
import IconUser from '~/assets/svg-icons/menu/user.svg';
import IconUserLevel from '~/assets/svg-icons/menu/quick-menu/user-level.svg';
import IconManageAPI from '~/assets/svg-icons/menu/api.svg';
import IconInviteFriends from '~/assets/svg-icons/menu/invite-friends.svg';
import IconAwards from '~/assets/svg-icons/menu/quick-menu/awards.svg';
import IconTopUsers from '~/assets/svg-icons/menu/quick-menu/top-users.svg';
import IconWhiteList from '~/assets/svg-icons/menu/white-list.svg';
import IconSetting from '~/assets/svg-icons/menu/setting.svg';
</script>
