export function formatDateToIranTime(date: string | number | Date): string {
	const localDate = new Date(date);

	// محاسبه آفست زمانی ایران
	const utcOffset = localDate.getTimezoneOffset() * 60000;
	const iranTimeOffset = 3.5 * 60 * 60 * 1000;
	const iranDate = new Date(localDate.getTime() + utcOffset + iranTimeOffset);

	// قالب‌بندی تاریخ و زمان ایران به همراه ساعت، دقیقه و ثانیه
	return new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false, // فرمت 24 ساعته
		calendar: 'persian',
	}).format(iranDate);
}
