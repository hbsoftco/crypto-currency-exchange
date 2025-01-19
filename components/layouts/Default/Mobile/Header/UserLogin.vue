<template>
	<div class="">
		<div v-if="!authStore.isLoggedIn">
			<IconUser
				class="text-3xl cursor-pointer"
				@click="router.push('/auth/login')"
			/>
		</div>
		<div v-else>
			<IconUserFill
				class="text-3xl cursor-pointer text-primary-yellow-light dark:text-primary-yellow-dark"
				@click="router.push('/user/profile')"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconUserFill from '~/assets/svg-icons/menu/user-fill.svg';
import IconUser from '~/assets/svg-icons/menu/user.svg';

const authStore = useAuthStore();

const router = useRouter();
</script>
