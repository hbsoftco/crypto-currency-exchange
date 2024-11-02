export default defineNuxtRouteMiddleware(() => {
	const authStore = useAuthStore();

	if (authStore.isLoggedIn === false) {
		return navigateTo('/auth/login');
	}
});
