export const useLinkManager = () => {
	const authStore = useAuthStore();
	authStore.loadAuthData();

	const checkPathLink = (link: string, ignore: boolean = true, destination: 'login' | 'register' = 'login'): string => {
		if (authStore.isLoggedIn || ignore) {
			return link;
		}

		return (destination === 'login' ? '/auth/login' : '/auth/sign-up');
	};

	return {
		checkPathLink,
	};
};
