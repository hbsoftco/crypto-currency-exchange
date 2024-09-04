import configs from './utils/app-config';

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
		'nuxt-svgo',
		'@nuxt/image',
		'nuxt-echarts',
	],
	i18n: {
		vueI18n: './i18n.config.ts',
	},
	echarts: {
		ssr: false,
		renderer: ['canvas', 'svg'],
		charts: ['BarChart', 'LineChart', 'PieChart', 'FunnelChart'],
		components: [
			'DatasetComponent',
			'GridComponent',
			'TooltipComponent',
			'ToolboxComponent',
		],
	},
	eslint: {
		checker: true,
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
				quotes: 'single',
				arrowParens: true,
			},
		},
	},
	image: {
		domains: ['https://api-bitland.site'],
	},
	colorMode: {
		classPrefix: '',
	},
	svgo: {
		autoImportPath: './assets/svg-icons/',
	},
	css: [
		'~/assets/css/style.css',
	],
	runtimeConfig: configs,
});
