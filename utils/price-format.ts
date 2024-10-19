export const priceFormat = (price: number | string, delimiter: string = ','): string => {
	const [integerPart, decimalPart] = price.toString().split('.');

	if (Number(integerPart) === 0 && decimalPart) {
		return price.toString();
	}

	const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

	return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};
