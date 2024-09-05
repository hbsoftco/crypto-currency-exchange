<template>
	<div>
		<div
			v-if="!authStore.isLoggedIn"
			class="flex items-center space-x-4"
		>
			<ULink
				to="/auth/login"
				class="text-text-dark dark:text-text-light font-medium px-2 mx-4 text-base"
				active-class="text-green"
				inactive-class=""
			>
				{{ $t("login") }}
			</ULink>

			<UButton
				size="lg"
				class="text-base font-medium px-6 py-2"
				to="/auth/sign-up"
			>
				{{ $t("signup") }}
			</UButton>
		</div>
		<div
			v-else
			class="flex items-center space-x-4"
		>
			<Wallet />
			<Profile />
			<Notification />
		</div>
	</div>
</template>

<script setup lang="ts">
import Notification from './Notification.vue';
import Profile from './Profile.vue';
import Wallet from './Wallet.vue';

const profileStore = useProfileStore();

console.log(profileStore.userProfile);

const authStore = useAuthStore();
authStore.loadAuthData();
</script>
