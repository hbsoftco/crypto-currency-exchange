import type { DirectiveBinding } from 'vue';

export default {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1,
		};
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					binding.value();
					observer.unobserve(entry.target);
				}
			});
		}, options);
		observer.observe(el);
	},
};
