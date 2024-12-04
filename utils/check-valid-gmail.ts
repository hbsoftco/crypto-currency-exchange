export const isValidGmail = (email: string) => {
	const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

	if (!gmailRegex.test(email)) {
		return { isValid: false, message: useT('google2faActivation') };
	}

	return { isValid: true, message: 'ایمیل معتبر است.' };
};
