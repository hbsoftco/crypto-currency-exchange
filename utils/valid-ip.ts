export function isValidIPv6(ip: string): boolean {
	const regex = new RegExp(
		/([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})/,
	);
	return regex.test(ip);
}

export function isValidIPv4(ip: string): boolean {
	const regex = new RegExp(
		/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
	);
	return regex.test(ip);
}
