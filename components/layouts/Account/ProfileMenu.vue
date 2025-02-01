<template>
	<div class="p-4">
		<ul class="flex flex-col">
			<!-- showAccount -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/user"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconUser class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('showAccount') }}
						</span>
					</div>
				</ULink>
			</li>

			<!-- authentication -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark mt-0">
				<ULink
					to="/user/id-auth"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconAuthentication class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('authentication') }}
						</span>
					</div>
				</ULink>
			</li>

			<!-- security -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/user/security"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconSecurity class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('security') }}
						</span>
					</div>
				</ULink>
			</li>

			<!-- fees -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/user/fees"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconFees class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('fees') }}
						</span>
					</div>
				</ULink>
			</li>

			<!-- userLevel -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark mt-0">
				<ULink
					to="/user/level"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconUserLevel class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('userLevel') }}
						</span>
					</div>
				</ULink>
			</li>

			<!-- manageAPI -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/user/apikeys"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconManageAPI class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('manageAPI') }}
						</span>
					</div>
				</ULink>
			</li>

			<!-- inviteFriends -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/user/invitation"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconInviteFriends class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('inviteFriends') }}
						</span>
					</div>
				</ULink>
			</li>

			<!-- awards -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/user/rewards"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconAwards class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('awards') }}
						</span>
					</div>
				</ULink>
			</li>

			<!-- topUsers -->
			<!-- <li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/user/top-users"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconTopUsers class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('topUsers') }}
						</span>
					</div>
				</ULink>
			</li> -->

			<!-- settings -->
			<li class="border-b border-primary-gray-light dark:border-primary-gray-dark">
				<ULink
					to="/user/settings"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconSetting class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('setting') }}
						</span>
					</div>
				</ULink>
			</li>

			<!-- whiteList -->
			<li>
				<ULink
					to="/user/wbl"
					class="flex justify-between items-center w-full py-3.5 text-subtle-text-light dark:text-subtle-text-50"
					active-class="text-active"
				>
					<div class="flex justify-start items-center">
						<div class="ml-2">
							<IconWhiteList class="text-base" />
						</div>
						<span class="mb-0 text-base font-medium">
							{{ $t('whiteList') }}
						</span>
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
// import IconTopUsers from '~/assets/svg-icons/menu/quick-menu/top-users.svg';
import IconWhiteList from '~/assets/svg-icons/menu/white-list.svg';
import IconSetting from '~/assets/svg-icons/menu/setting.svg';
</script>
