export default defineAppConfig({
	ui: {
		primary: 'primary-yellow',
		gray: 'primary-gray',
		button: {
			base: 'dark:disabled:bg-primary-gray-dark dark:disabled:text-white',
			rounded: 'rounded-md',
			block: 'w-full flex justify-center items-center',
			inline: 'inline-flex items-center',
			padding: {
				md: 'p-0',
			},
			font: 'font-bold',
			color: {
				gray: {
					solid: 'text-black dark:text-white',
				},
				white: {
					solid: 'text-black dark:text-white',
				},
				black: {
					solid: 'text-black dark:text-white',
				},
			},
		},
		tabs: {
			list: {
				width: 'w-auto',
				background: 'bg-transparent dark:bg-transparent',
				marker: {
					background: 'bg-transparent dark:bg-transparent border-b-2 border-primary-yellow-400',
					rounded: 'rounded-none',
				},
				tab: {
					background: 'bg-transparent dark:bg-transparent ',
					active: 'text-gray-900 dark:text-white',
					inactive: 'text-gray-500 dark:text-gray-400',
					font: 'font-bold',
					size: 'text-base',
				},
			},
		},
		notifications: {
			// Show toasts at the top right of the screen
			// position: 'top-0 right-0',
		},
		modal: {
			background: 'bg-backdrop-light dark:bg-backdrop-light bg-opacity-40 backdrop-blur-sm dark:bg-opacity-40 dark:backdrop-blur-sm',
		},
	},
	colorMode: {
		preference: 'dark',
		fallback: 'dark',
	},
});
