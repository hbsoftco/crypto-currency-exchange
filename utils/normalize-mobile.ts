export const normalizeMobile = (mobile: string) => {
	if (mobile.startsWith('+98')) {
		return mobile;
	}

	if (mobile.startsWith('09')) {
		return '+98' + mobile.slice(1);
	}

	if (mobile.startsWith('98')) {
		return '+' + mobile;
	}

	if (mobile.startsWith('9')) {
		return '+98' + mobile;
	}

	return mobile;
};
