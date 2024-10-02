const generatePair = (cSymbol: string, qSymbol: string): string => {
	if (qSymbol === 'TMN' || qSymbol === 'USDT') {
		return `${cSymbol}${qSymbol}`;
	}

	return `${cSymbol}USDT,${qSymbol}USDT`;
};

const getFormattedPairs = (cSymbol: string, qSymbol: string): string => {
	if (qSymbol === 'TMN' || qSymbol === 'USDT') {
		return `${cSymbol}${qSymbol}`;
	}

	return generatePair(cSymbol, qSymbol);
};

export {
	getFormattedPairs,
};
