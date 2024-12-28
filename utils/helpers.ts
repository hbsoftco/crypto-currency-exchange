import DOMPurify from 'dompurify';

import type { KeyValue } from '~/types/definitions/common.types';

const bigNumber = (num: number) => {
	if (num < 1000) {
		return num.toString();
	}
	else if (num >= 1000 && num < 1_000_000) {
		return parseFloat((num / 1000).toFixed(2)) + 'K';
	}
	else if (num >= 1_000_000 && num < 1_000_000_000) {
		return parseFloat((num / 1_000_000).toFixed(2)) + 'M';
	}
	else if (num >= 1_000_000_000 && num < 1_000_000_000_000) {
		return parseFloat((num / 1_000_000_000).toFixed(2)) + 'B';
	}
	else if (num >= 1_000_000_000_000 && num < 1_000_000_000_000_000) {
		return parseFloat((num / 1_000_000_000_000).toFixed(2)) + 'T';
	}
	else if (num >= 1_000_000_000_000_000) {
		return parseFloat((num / 1_000_000_000_000_000).toFixed(2)) + 'Q';
	}
};

const summarizeBigNumber = (input: string): string => {
	const inputString = input.toString();
	const match = inputString.match(/^-?0\.0+(?!0)(\d+)/);

	if (match) {
		const zerosCount = match[0].length - match[1].length - (inputString.startsWith('-') ? 3 : 2);
		if (zerosCount > 5) {
			const significantDigits = match[1];
			return `0.0{${zerosCount}}${significantDigits}`;
		}
	}

	return inputString;
};

const formatBigNumber = (x: number | string | null, numberDecimal: number): string => {
	if (x === null) return '';

	x = Number(x);

	const formatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: numberDecimal,
	});

	const splitDigits = (value: string): string => {
		return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	if (x < 1_000_000) {
		return splitDigits(formatter.format(x));
	}
	else if (x < 1_000_000_000) {
		return splitDigits(formatter.format(x / 1_000_000)) + ' M';
	}
	else if (x < 1_000_000_000_000) {
		return splitDigits(formatter.format(x / 1_000_000_000)) + ' B';
	}
	else if (x < 1_000_000_000_000_000) {
		return splitDigits(formatter.format(x / 1_000_000_000_000)) + ' T';
	}
	else {
		return splitDigits(formatter.format(x / 1_000_000_000_000_000)) + ' Q';
	}
};

const detectEmail = (input: string) => {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (emailPattern.test(input)) {
		return 'email';
	}
	else {
		return 'mobile';
	}
};

const generateGUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
		const random = Math.random() * 16 | 0;
		const value = char === 'x' ? random : (random & 0x3 | 0x8);
		return value.toString(16);
	});
};

const normalizeMobile = (mobile: string) => {
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

const sanitizedHtml = (html: string) => {
	return DOMPurify.sanitize(html);
};

const isValidIPv6 = (ip: string): boolean => {
	const regex = new RegExp(
		/([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})/,
	);
	return regex.test(ip);
};

const isValidIPv4 = (ip: string): boolean => {
	const regex = new RegExp(
		/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
	);
	return regex.test(ip);
};

const capitalizer = (string: string): string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const scientificToDecimal = (scientific: string): string => {
	const [base, exponent] = scientific.toString().toLowerCase().split('e');
	const baseNumber = parseFloat(base);
	const exponentValue = parseInt(exponent, 10);

	if (exponentValue >= 0) {
		return (baseNumber * Math.pow(10, exponentValue)).toFixed(0);
	}
	else {
		const decimalPlaces = Math.abs(exponentValue);
		return `0.${'0'.repeat(decimalPlaces - 1)}${baseNumber.toString().replace('.', '')}`;
	}
};

const getValueByKey = (array: KeyValue[], key: string) => {
	if (!array.length) {
		return null;
	}
	const foundItem = array.find((item) => item.key === key);
	return foundItem ? (foundItem.value ? foundItem.value : null) || foundItem.value : null;
};

const isValidGmail = (email: string) => {
	const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

	if (!gmailRegex.test(email)) {
		return { isValid: false, message: useT('google2faActivation') };
	}

	return { isValid: true, message: 'Email is invalid.' };
};

const formatByDecimal = (value: number, decimal: string) => {
	const decimalPlaces = Math.max(decimal.toString().split('.')[1]?.length);
	return Number(value.toFixed(decimalPlaces));
};

const priceFormat = (price: number | string, summarize: boolean = false, delimiter: string = ','): string => {
	const inputString = price.toString();
	const match = inputString.match(/^-?0\.0+(?!0)(\d+)/);

	if (summarize && match) {
		const zerosCount = match[0].length - match[1].length - (inputString.startsWith('-') ? 3 : 2);
		if (zerosCount > 6) {
			const significantDigits = match[1];
			return `0.0{${zerosCount}}${significantDigits}`;
		}

		return inputString;
	}

	const [integerPart, decimalPart] = price.toString().split('.');

	if (Number(integerPart) === 0 && decimalPart) {
		return price.toString();
	}

	const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

	return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};

const handleImageError = (event: Event) => {
	const target = event.target as HTMLImageElement;
	target.src = '/images/ic_crypto_unknown.png';
};

const formatTextWithLineBreaks = (text: string) => {
	return text.replace(/\r?\n/g, '<br>');
};

export {
	bigNumber,
	formatBigNumber,
	summarizeBigNumber,
	detectEmail,
	generateGUID,
	normalizeMobile,
	sanitizedHtml,
	isValidIPv6,
	isValidIPv4,
	capitalizer,
	getValueByKey,
	isValidGmail,
	formatByDecimal,
	priceFormat,
	handleImageError,
	formatTextWithLineBreaks,
	scientificToDecimal,
};
