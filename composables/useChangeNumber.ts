export const useChangeNumber = () => {
	const languageCookie = useCookie<string | undefined>('language', { path: '/', maxAge: 60 * 60 * 24 * 365 });

	const setLanguage = (lang: 'en' | 'fa') => {
		languageCookie.value = lang;
	};

	const getLanguage = (): 'en' | 'fa' => {
		const lang = languageCookie.value;
		return lang === 'fa' || lang === 'en' ? lang : 'en';
	};

	const convertNumber = (num: number | string): string => {
		const lang = getLanguage();
		return lang === 'fa' ? toPersianNumber(num) : toEnglishNumber(num);
	};

	const toPersianNumber = (num: number | string) => {
		return num
			.toString()
			.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);
	};

	const toEnglishNumber = (num: number | string) => {
		return num
			.toString()
			.replace(/[۰-۹]/g, (d) => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);
	};

	return {
		getLanguage,
		setLanguage,
		convertNumber,
	};
};
