import english from './utils/lang/en';
import persian from './utils/lang/fa';

export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'fa',
	messages: {
		en: english,
		fa: persian,
	},
}));
