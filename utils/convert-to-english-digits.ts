export const convertToEnglishDigits = (value: string) => {
	const persianDigits = '۰۱۲۳۴۵۶۷۸۹,،';
	const englishDigits = '0123456789,,';

	if (value) {
		return value.replace(/[۰-۹,،]/g, (digit) => englishDigits[persianDigits.indexOf(digit)]);
	}
};
