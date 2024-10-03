export const timeFormatter = (time: number | null): string => {
	if (time === null) {
		return '';
	}
	else {
		const currentDate = new Date(time * 1000);
		const dateFormatter = new Intl.DateTimeFormat('default', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
		});
		return dateFormatter.format(currentDate);
	}
};
