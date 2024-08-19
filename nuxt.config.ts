// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: [
		'@nuxt/ui',
		'@nuxt/eslint',
		'@vite-pwa/nuxt',
		'@nuxtjs/i18n',
		'@formkit/auto-animate',
		'@pinia/nuxt',
	],
	eslint: {
		checker: true,
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
				quotes: 'single',
				// commaDangle: 'always',
				arrowParens: true,
			},
		},
	},
	colorMode: {
		preference: 'system', // default value of $colorMode.preference
		fallback: 'light', // fallback value if not system preference found
		hid: 'nuxt-color-mode-script',
		globalName: '__NUXT_COLOR_MODE__',
		componentName: 'ColorScheme',
		classPrefix: '',
		classSuffix: '-mode',
		storageKey: 'nuxt-color-mode',
	},
});
