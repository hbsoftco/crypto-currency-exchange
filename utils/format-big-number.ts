export const formatBigNumber = (x: number | string | null, numberDecimal: number): string => {
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
