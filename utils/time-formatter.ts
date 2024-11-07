export const timeFormatter = (
	time: number | null,
	includeSeconds: boolean = true,
	formatDate: boolean = false,
): string => {
	if (time === null) {
		return '';
	}
	else {
		const currentDate = new Date(time * 1000);

		if (formatDate) {
			const dateFormatter = new Intl.DateTimeFormat('default', {
				day: 'numeric',
				month: 'short',
			});
			return dateFormatter.format(currentDate);
		}
		else {
			const dateFormatter = new Intl.DateTimeFormat('default', {
				hour: '2-digit',
				minute: '2-digit',
				second: includeSeconds ? '2-digit' : undefined,
				hour12: false,
			});
			return dateFormatter.format(currentDate);
		}
	}
};
