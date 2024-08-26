<template>
	<div>
		<div
			class="flex group relative items-center space-x-2"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<div class="relative">
				<IconUser
					class="text-2xl hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark"
				/>
			</div>
		</div>
		<div
			v-if="hover"
			class="absolute left-20 p-4 opacity-100 transition-opacity duration-200 z-10"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<div class="w-56 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4">
				{{ $t("requestVIPAccount") }}
			</div>
			<ul class="flex flex-col space-y-2">
				<li
					v-for="(item, index) in profileItems"
					:key="index"
				>
					<div class="text-base ml-2">
						<span class="text-base font-medium">{{ $t(item.name) }}</span>

						<p class="text-xs font-normal text-subtle-text mt-2">
							{{ $t(item.description) }}
						</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
// import IconMessage from '~/assets/svg-icons/menu/message.svg';
// import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import IconAuthentication from '~/assets/svg-icons/menu/authentication.svg';
import IconSecurity from '~/assets/svg-icons/menu/security.svg';
// import IconManageAPI from '~/assets/svg-icons/menu/api.svg';
// import IconInviteFriends from '~/assets/svg-icons/menu/invite-friends.svg';
// import IconAwards from '~/assets/svg-icons/menu/quick-menu/awards.svg';
import IconUser from '~/assets/svg-icons/menu/user.svg';
// import IconWhiteList from '~/assets/svg-icons/menu/white-list.svg';
// import IconTopUsers from '~/assets/svg-icons/menu/quick-menu/top-users.svg';
// import IconExit from '~/assets/svg-icons/menu/exit.svg';

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
		description: 'سطح ۲',
		icon: IconAuthentication,
	},
	{
		name: 'security',
		description: '',
		icon: IconSecurity,
	},
// 	{
// 		name: 'fees',
// 		description: '',
// 		icon: IconFees,
// 	},
// 	{
// 		name: 'userLevel',
// 		description: 'نهنگ گوژپشت',
// 		icon: IconUserLevel,
// 	},
// 	{
// 		name: 'manageAPI',
// 		description: '',
// 		icon: IconManageAPI,
// 	},
// 	{
// 		name: 'inviteFriends',
// 		description: '',
// 		icon: IconInviteFriends,
// 	},
// 	{
// 		name: 'awards',
// 		description: '',
// 		icon: IconAwards,
// 	},
// 	{
// 		name: 'topUsers',
// 		description: '',
// 		icon: IconTopUsers,
// 	},
// 	{
// 		name: 'whiteList',
// 		description: '',
// 		icon: IconWhiteList,
// 	},
// 	{
// 		name: 'exit',
// 		description: '',
// 		icon: IconExit,
// 	},
]);
</script>
