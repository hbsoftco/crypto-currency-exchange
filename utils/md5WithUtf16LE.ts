import md5 from 'md5';

const stringToUtf16LEBytes = (str: string) => {
	const byteArray = [];
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i);
		byteArray.push(code & 0xff);
		byteArray.push(code >> 8);
	}
	return byteArray;
};

export const md5WithUtf16LE = (string: string): string => {
	const utf16LEBytes = stringToUtf16LEBytes(string);
	const utf16LEString = String.fromCharCode(...utf16LEBytes);
	return md5(utf16LEString).toUpperCase();
};
