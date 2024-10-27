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
import Profile from '~/components/layouts/Default/Header/UserLogin/Profile.vue';
import Wallet from '~/components/layouts/Default/Header/UserLogin/Wallet.vue';
import Notification from '~/components/layouts/Default/Header/UserLogin/Notification.vue';

const authStore = useAuthStore();

onMounted(() => {
	// authStore.loadAuthData();
});
</script>
