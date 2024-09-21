export const priceFormat = (value: number): string => {
	const integerNumber = Math.floor(value);
	// ceil

	return integerNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
