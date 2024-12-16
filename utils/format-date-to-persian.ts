const monthNames = [
	'فروردین',
	'اردیبهشت',
	'خرداد',
	'تیر',
	'مرداد',
	'شهریور',
	'مهر',
	'آبان',
	'آذر',
	'دی',
	'بهمن',
	'اسفند',
];

const faNumToEn = (faNum: string): number => {
	const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
	const enNum = faNum
		.split('')
		.map((char) => {
			const index = faDigits.indexOf(char);
			return index !== -1 ? index : char;
		})
		.join('');

	return parseInt(enNum, 10) || 0;
};

export const formatDateToPersian = (
	timestamp: number,
	type: 'month' | 'full' | 'full-with-month' = 'month',
): string => {
	if (!timestamp) {
		return '';
	}

	try {
		const date = new Date(timestamp * 1000);

		const formattedDate = new Intl.DateTimeFormat('fa-IR', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
		}).format(date);

		const [year, month, day] = formattedDate.split('/');

		let monthIndex = faNumToEn(month) - 1;
		if (monthIndex === -1) {
			monthIndex = 11;
		}

		const monthName = monthNames[monthIndex];

		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const seconds = date.getSeconds().toString().padStart(2, '0');

		if (type === 'month') {
			return `${day} ${monthName} ${year}`;
		}
		else if (type === 'full') {
			return `${day} ${monthName} ${year} - ${hours}:${minutes}:${seconds}`;
		}
		else {
			return `${formattedDate} - ${hours}:${minutes}:${seconds}`;
		}
	}
	catch (error) {
		console.error('Invalid timestamp:', error);
		return 'تاریخ نامعتبر است';
	}
};
