import MobileDetect from 'mobile-detect';

export default defineNuxtPlugin((nuxtApp) => {
	const userAgent = navigator.userAgent;
	const md = new MobileDetect(userAgent);

	console.log('userAgent', userAgent);
	console.log('md', md);

	nuxtApp.provide('mobileDetect', md);
});
