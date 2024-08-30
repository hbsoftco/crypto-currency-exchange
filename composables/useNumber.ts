export const useNumber = (num: number | string): string => {
	const { getLanguage } = useChangeNumber();
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
