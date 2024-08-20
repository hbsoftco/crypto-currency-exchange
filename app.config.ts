export default defineAppConfig({
	ui: {
		primary: 'primary-yellow',
		gray: 'primaryGray',
		button: {
			default: {
				// color: 'primary-yellow',
				variant: 'solid',
			},
			color: {
				primary: {
					solid: 'text-xl',
					ghost: 'text-black hover:bg-primary-50 disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500',
				},
				// white: {
				// 	solid: 'shadow-sm text-black bg-white hover:bg-gray-50 disabled:bg-white focus-visible:ring-2 focus-visible:ring-primary-500',
				// },
			},
		},
	},
	colorMode: {
		preference: 'dark',
		fallback: 'dark',
	},
});
