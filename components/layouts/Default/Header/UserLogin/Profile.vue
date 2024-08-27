<template>
	<div>
		<div
			class="flex group relative items-center space-x-2"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<div class="relative">
				<IconUser
					class="text-2xl hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"
				/>
			</div>
		</div>
		<div
			v-if="hover"
			class="absolute left-20 p-4 opacity-100 transition-opacity duration-200 z-10"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<div class="w-60 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4">
				<div>
					<div class="flex items-center mb-2">
						<IconMessage class="text-2xl ml-2 dark:text-subtle-text-50" />
						<span class="text-xs font-bold">ashoja89@gmail.com</span>
					</div>
					<div class="flex items-center">
						<IconAuthentication class="text-2xl ml-2 dark:text-subtle-text-50" />
						<span
							id="copy-text"
							class="text-xs font-bold ml-1"
						>65555910</span>
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
				<ul class="flex flex-col space-y-2">
					<li
						v-for="(item, index) in profileItems"
						:key="index"
						:class="[
							'flex justify-between py-2 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b-[1px] hover:bg-hover2-light dark:hover:bg-hover2-dark',
							{ 'border-b-0': index === profileItems.length - 1 }, // حذف border-bottom از آخرین li
						]"
					>
						<div class="flex items-center">
							<component
								:is="item.icon"
								:class="item.name === 'exit' ? 'text-2xl text-accent-red' : 'text-2xl dark:text-subtle-text-50'"
							/>
							<div class="text-xs mr-2">
								<h5 class="font-bold">
									{{ $t(item.name) }}
								</h5>
							</div>
						</div>
						<span
							v-if="item.description"
							class="text-xs font-normal p-1 text-primary-yellow-light dark:text-primary-yellow-dark border-primary-gray-light dark:border-primary-gray-dark border-[1px]"
						>
							{{ item.description }}
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

import IconMessage from '~/assets/svg-icons/menu/message.svg';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import IconCrown from '~/assets/svg-icons/menu/crown.svg';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import IconAuthentication from '~/assets/svg-icons/menu/authentication.svg';
import IconUser from '~/assets/svg-icons/menu/user.svg';
import IconSecurity from '~/assets/svg-icons/menu/security.svg';
import IconFees from '~/assets/svg-icons/menu/quick-menu/fees.svg';
import IconUserLevel from '~/assets/svg-icons/menu/quick-menu/user-level.svg';
import IconManageAPI from '~/assets/svg-icons/menu/api.svg';
import IconInviteFriends from '~/assets/svg-icons/menu/invite-friends.svg';
import IconAwards from '~/assets/svg-icons/menu/quick-menu/awards.svg';
import IconWhiteList from '~/assets/svg-icons/menu/white-list.svg';
import IconTopUsers from '~/assets/svg-icons/menu/quick-menu/top-users.svg';
import IconExit from '~/assets/svg-icons/menu/exit.svg';

const hover = ref(false);
let timeout = null;

const showMenu = () => {
	if (timeout) clearTimeout(timeout);
	hover.value = true;
};

const hideMenu = () => {
	timeout = setTimeout(() => {
		hover.value = false;
	}, 300);
};

const profileItems = ref([
	{
		name: 'authentication',
		description: 'سطح 2',
		icon: IconAuthentication,
	},
	{
		name: 'security',
		description: '',
		icon: IconSecurity,
	},
	{
		name: 'fees',
		description: '',
		icon: IconFees,
	},
	{
		name: 'userLevel',
		description: 'نهنگ گوژ پشت',
		icon: IconUserLevel,
	},
	{
		name: 'manageAPI',
		description: '',
		icon: IconManageAPI,
	},
	{
		name: 'inviteFriends',
		description: '',
		icon: IconInviteFriends,
	},
	{
		name: 'awards',
		description: '',
		icon: IconAwards,
	},
	{
		name: 'topUsers',
		description: '',
		icon: IconTopUsers,
	},
	{
		name: 'whiteList',
		description: '',
		icon: IconWhiteList,
	},
	{
		name: 'exit',
		description: '',
		icon: IconExit,
	},
]);

const copyText = () => {
	const textToCopy = document.getElementById('copy-text').textContent;
	navigator.clipboard.writeText(textToCopy).then(() => {
		console.log('Text copied');
	}).catch((err) => {
		console.error('Error copying text: ', err);
	});
};
</script>
