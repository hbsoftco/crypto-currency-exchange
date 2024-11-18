export const formatByDecimal = (value: number, decimal: string) => {
	const decimalPlaces = Math.max(decimal.toString().split('.')[1]?.length);
	return Number(value.toFixed(decimalPlaces));
};
