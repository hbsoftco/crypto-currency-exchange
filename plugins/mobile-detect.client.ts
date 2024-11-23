import MobileDetect from 'mobile-detect';

export default defineNuxtPlugin((nuxtApp) => {
	const userAgent = navigator.userAgent;
	const md = new MobileDetect(userAgent);

	nuxtApp.provide('mobileDetect', md);
});
