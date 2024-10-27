export const detectEmail = (input: string) => {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (emailPattern.test(input)) {
		return 'email';
	}
	else {
		return 'mobile';
	}
};
