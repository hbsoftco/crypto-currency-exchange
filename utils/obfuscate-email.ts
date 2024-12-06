export const obfuscateEmail = (email: string) => {
	const [username, domain] = email.split('@');
	const obfuscatedUsername = username.slice(0, 2) + '****';
	return `${obfuscatedUsername}@${domain}`;
};
