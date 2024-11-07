export const formatDate = (
	timestamp: number,
	format: 'month-day' | 'year-month-day' | 'year-month' | 'full' = 'month-day',
): string => {
	if (!timestamp) {
		return '';
	}

	try {
		const date = new Date(timestamp * 1000);

		const options: Intl.DateTimeFormatOptions = {};
		switch (format) {
			case 'month-day':
				options.month = 'short';
				options.day = 'numeric';
				break;

			case 'year-month-day':
				options.year = 'numeric';
				options.month = 'short';
				options.day = 'numeric';
				break;

			case 'year-month':
				options.year = 'numeric';
				options.month = 'short';
				break;

			case 'full':
				options.year = 'numeric';
				options.month = 'short';
				options.day = 'numeric';
				options.hour = '2-digit';
				options.minute = '2-digit';
				options.hour12 = false;
				break;
		}

		return new Intl.DateTimeFormat('en-US', options).format(date);
	}
	catch (error) {
		console.error('Invalid timestamp:', error);
		return 'Invalid date';
	}
};
