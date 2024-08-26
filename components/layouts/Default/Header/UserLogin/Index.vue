<template>
	<div>
		<div
			v-if="isLoggedIn"
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
			<LayoutsDefaultHeaderUserLoginWallet />
			<LayoutsDefaultHeaderUserLoginProfile />
			<LayoutsDefaultHeaderUserLoginNotification />
		</div>
	</div>
</template>

<script setup>
const isLoggedIn = ref(false);

const checkLoginStatus = () => {
	isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
};

onMounted(() => {
	checkLoginStatus();
});
</script>

<style lang="scss" scoped></style>
