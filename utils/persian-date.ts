export function formatDateToIran(date: string | number | Date): string {
	const localDate = new Date(date);

	const utcOffset = localDate.getTimezoneOffset() * 60000;
	const iranTimeOffset = 3.5 * 60 * 60 * 1000;
	const iranDate = new Date(localDate.getTime() + utcOffset + iranTimeOffset);

	return new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		calendar: 'persian',
	}).format(iranDate);
}
