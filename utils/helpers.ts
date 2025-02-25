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

const formatIPs = (input: string): string => {
	const ips = input.split('\n').map((ip) => ip.trim());
	return ips.join(',');
};

const capitalizer = (string: string): string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const convertScientificToDecimal = (number: number) => {
	const decimalPlaces = Math.max(0, Math.min(100, -Math.floor(Math.log10(Math.abs(number)))));
	const fixedNumber = number.toFixed(decimalPlaces);

	if (fixedNumber.includes('e')) {
		return parseFloat(fixedNumber).toString();
	}

	return fixedNumber;
};

const scientificToDecimal = (scientific: string): string => {
	if (Number(scientific) > 1) {
		return scientific;
	}
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

const slug = (text: string): string => {
	return text
		.trim()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u064B-\u0652]/g, '')
		.replace(/[^a-zA-Z0-9\u0600-\u06FF\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
};

const convertToEnglishDigits = (value: string) => {
	const persianDigits = '۰۱۲۳۴۵۶۷۸۹,،';
	const englishDigits = '0123456789,,';

	if (value) {
		return value.replace(/[۰-۹,،]/g, (digit) => englishDigits[persianDigits.indexOf(digit)]);
	}
};

const convertPersianToEnglishNumber = (input: string): number => {
	const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
	const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	return Number(input.replace(/[۰-۹]/g, (match) => {
		const index = persianNumbers.indexOf(match);
		return index !== -1 ? englishNumbers[index] : match;
	}));
};

const monthNames = [
	'فروردین',
	'اردیبهشت',
	'خرداد',
	'تیر',
	'مرداد',
	'شهریور',
	'مهر',
	'آبان',
	'آذر',
	'دی',
	'بهمن',
	'اسفند',
];

const faNumToEn = (faNum: string): number => {
	const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
	const enNum = faNum
		.split('')
		.map((char) => {
			const index = faDigits.indexOf(char);
			return index !== -1 ? index : char;
		})
		.join('');

	return parseInt(enNum, 10) || 0;
};

const toPersianDate = (date: string, type: 'month' | 'full' | 'numeric-month' | 'full-with-month' = 'full') => {
	try {
		const datetime = new Date(date);

		const formattedDate = new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
		}).format(datetime);

		const [year, month, day] = formattedDate.split('/');

		let monthIndex = faNumToEn(month) - 1;
		if (monthIndex === -1) {
			monthIndex = 11;
		}

		const monthName = monthNames[monthIndex];

		const hours = datetime.getHours().toString().padStart(2, '0');
		const minutes = datetime.getMinutes().toString().padStart(2, '0');
		const seconds = datetime.getSeconds().toString().padStart(2, '0');

		if (type === 'month') {
			return `${day} ${monthName} ${year}`;
		}
		else if (type === 'full') {
			return `${day} ${monthName} ${year} - ${hours}:${minutes}:${seconds}`;
		}
		else if (type === 'numeric-month') {
			return `${year}/${month}/${day}`;
		}
		else {
			return `${formattedDate} - ${hours}:${minutes}:${seconds}`;
		}
	}
	catch (error) {
		console.log('Invalid timestamp:', error);
		return '---';
	}
};

const compressImageFile = (
	inputFile: File,
	targetSizeKB: number = 20,
): Promise<File> => {
	const targetSizeBytes = targetSizeKB * 1024;

	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (event) => {
			if (!event.target?.result) {
				reject('Error reading file.');
				return;
			}

			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				if (!ctx) {
					reject('Failed to create canvas context.');
					return;
				}

				// Set canvas size to match the image
				canvas.width = img.width;
				canvas.height = img.height;

				// Draw the image on the canvas
				ctx.drawImage(img, 0, 0);

				let compressionQuality = 1.0; // Start with highest quality
				let compressedDataUrl: string | null = null;

				// Compress the image in a loop until the target size is reached
				do {
					compressedDataUrl = canvas.toDataURL('image/jpeg', compressionQuality);
					compressionQuality -= 0.05; // Reduce quality by 5% in each step
				} while (
					compressedDataUrl.length > targetSizeBytes
					&& compressionQuality > 0
				);

				// Convert data URL back to a file
				if (compressedDataUrl) {
					const byteString = atob(compressedDataUrl.split(',')[1]);
					const arrayBuffer = new Uint8Array(byteString.length);
					for (let i = 0; i < byteString.length; i++) {
						arrayBuffer[i] = byteString.charCodeAt(i);
					}
					const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

					// Change the file name extension to .jpg
					const fileNameWithoutExtension = inputFile.name.replace(/\.[^/.]+$/, ''); // Remove the original extension
					const newFileName = `${fileNameWithoutExtension}.jpg`;

					const compressedFile = new File([blob], newFileName, {
						type: 'image/jpeg',
					});
					resolve(compressedFile);
				}
				else {
					reject('Failed to compress image.');
				}
			};

			img.onerror = () => {
				reject('Failed to load image.');
			};

			img.src = event.target.result as string;
		};

		reader.onerror = () => {
			reject('Error reading input file.');
		};

		reader.readAsDataURL(inputFile);
	});
};

const formatContractId = (contractId: string): string => {
	if (contractId.length > 20) {
		const firstPart = contractId.slice(0, 10);
		const lastPart = contractId.slice(-10);
		return `${firstPart}...${lastPart}`;
	}
	return contractId;
};

export {
	formatContractId,
	slug,
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
	convertScientificToDecimal,
	convertToEnglishDigits,
	convertPersianToEnglishNumber,
	toPersianDate,
	compressImageFile,
	formatIPs,
};
