export default defineNuxtRouteMiddleware(() => {
	const authStore = useAuthStore();

	if (authStore.isLoggedIn === true) {
		return navigateTo('/');
	}
});
