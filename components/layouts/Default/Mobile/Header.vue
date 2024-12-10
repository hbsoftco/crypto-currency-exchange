<template>
	<div>
		<header class="fixed top-0 left-0 right-0 w-full bg-background-light dark:bg-background-dark mb-6 py-3 z-10">
			<UContainer>
				<div class="flex justify-between items-center w-full">
					<div>
						<UserLogin />
					</div>
					<div class="flex-1 mx-2">
						<Search />
					</div>
					<div>
						<IconSupport class="text-3xl" />
					</div>
					<div class="mr-2">
						<Notification v-if="authStore.isLoggedIn" />
					</div>
				</div>
			</UContainer>
		</header>
		<!-- <Notif class="mt-14" /> -->
	</div>
</template>

<script setup lang="ts">
import Notification from '~/components/layouts/Default/Header/UserLogin/Notification.vue';
import UserLogin from '~/components/layouts/Default/Mobile/Header/UserLogin.vue';
import IconSupport from '~/assets/svg-icons/menu/support.svg';
import Search from '~/components/layouts/Default/Mobile/Header/Search.vue';
// import Notif from '../Notif.vue';

const authStore = useAuthStore();

onMounted(() => {
	// authStore.loadAuthData();
});
</script>
