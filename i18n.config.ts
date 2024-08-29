import english from './utils/lang/en';
import persian from './utils/lang/fa';

export default defineI18nConfig(() => ({
	legacy: false,
	strategy: 'no_prefix',
	locale: 'fa',
	defaultLocale: 'fa',
	messages: {
		en: english,
		fa: persian,
	},
}));
