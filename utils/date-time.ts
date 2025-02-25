export function formatDateToIranTime(date: string | number | Date): string {
	const localDate = new Date(date);

	const utcOffset = localDate.getTimezoneOffset() * 60000;
	const iranTimeOffset = 3.5 * 60 * 60 * 1000;
	const iranDate = new Date(localDate.getTime() + utcOffset + iranTimeOffset);

	return new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
		calendar: 'persian',
	}).format(iranDate);
}
