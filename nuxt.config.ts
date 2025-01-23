import configs from './utils/app-config';

const sw = process.env.SW === 'true';

export default defineNuxtConfig({
	ssr: false,
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	app: {
		head: {
			charset: 'utf-8',
			viewport:
			'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
			htmlAttrs: {
				lang: 'fa',
				dir: 'rtl',
			},
			title: 'Bitland',
			meta: [
				{ name: 'theme-color', content: '#000000' },
				{
					hid: 'description',
					name: 'description',
					content: 'Your description here',
				},
			],
		},
	},
	modules: [
		'@nuxt/ui',
		'@nuxt/eslint',
		'@vite-pwa/nuxt',
		'@nuxtjs/i18n',
		'@formkit/auto-animate',
		'@pinia/nuxt',
		'nuxt-svgo',
		'nuxt-echarts',
		'nuxt-vitalizer',
		'@nuxtjs/web-vitals',
		'@nuxtjs/leaflet',
	],
	pwa: {
		strategies: sw ? 'injectManifest' : 'generateSW',
		srcDir: sw ? 'service-worker' : undefined,
		filename: sw ? 'sw.ts' : undefined,
		registerType: 'autoUpdate',
		manifest: {
			name: 'Bitland',
			short_name: 'Bitland',
			theme_color: '#ffffff',
			icons: [
				{
					src: '/images/pwa/pwa-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: '/images/pwa/pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
				{
					src: '/images/pwa/pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any maskable',
				},
			],
		},
		workbox: {
			globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
		},
		injectManifest: {
			globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
		},
		client: {
			installPrompt: true,
			periodicSyncForUpdates: 20,
		},
		devOptions: {
			enabled: true,
			suppressWarnings: true,
			navigateFallback: '/',
			navigateFallbackAllowlist: [/^\/$/],
			type: 'module',
		},
	},
	vitalizer: {
		disablePrefetchLinks: true,
		disablePreloadLinks: true,
		disableStylesheets: 'entry',
		delayHydration: {
			hydrateOnEvents: ['mousemove', 'scroll', 'keydown'],
			idleCallbackTimeout: 8000,
			postIdleTimeout: 4000,
		},
	},
	webVitals: {
		provider: 'log',
		debug: true,
		disabled: false,
	},
	i18n: {
		vueI18n: './i18n.config.ts',
	},
	echarts: {
		ssr: false,
		renderer: ['canvas', 'svg'],
		charts: ['BarChart', 'LineChart', 'PieChart', 'FunnelChart', 'GaugeChart'],
		components: [
			'LegendComponent',
			'TitleComponent',
			'DatasetComponent',
			'GridComponent',
			'TooltipComponent',
			'ToolboxComponent',
			'GraphicComponent',
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
	vite: {
		build: {
			reportCompressedSize: true,
			cssCodeSplit: false,
			rollupOptions: {
				output: {
					manualChunks: undefined,
				},
			},
		},
	},
});
