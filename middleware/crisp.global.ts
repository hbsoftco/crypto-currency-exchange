declare global {
	interface Window {
		CRISP_WEBSITE_ID: string;
		$crisp?: any[];
	}
}

export default defineNuxtRouteMiddleware((to) => {
	const allowedRoutes = ['/live-chat'];

	if (allowedRoutes.includes(to.path) && !window.$crisp) {
		const d = document;
		const s = d.createElement('script');
		s.src = 'https://client.crisp.chat/l.js';
		s.async = true;
		d.getElementsByTagName('head')[0].appendChild(s);
		window.$crisp = [];
		window.CRISP_WEBSITE_ID = '8792f3f1-8336-4751-a3bd-d9149c89df1f';
	}

	// window.addEventListener('load', () => {
	// 	const chatboxElements = document.getElementsByClassName('crisp-chatbox');
	// 	console.log('333333333333333333333', chatboxElements);

	// 	if (chatboxElements.length > 0) {
	// 		const chatbox = chatboxElements[0]; // اگر چند عنصر پیدا شد، اولین مورد رو می‌گیریم
	// 		chatbox.style.setProperty('display', 'none', 'important');
	// 	}
	// 	else {
	// 		console.log('عنصر با کلاس crisp-chatbox پیدا نشد.');
	// 	}
	// });

	// const chatboxElements = document.getElementsByClassName('crisp-chatbox');
	// console.log(chatboxElements);

	// if (chatboxElements.length > 0) {
	// 	const chatbox = chatboxElements[0];
	// 	chatbox.style.setProperty('display', 'none', 'important');
	// }
});
