export const convertPersianToEnglishNumber = (input: string): number => {
	const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
	const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	return Number(input.replace(/[۰-۹]/g, (match) => {
		const index = persianNumbers.indexOf(match);
		return index !== -1 ? englishNumbers[index] : match;
	}));
};
