export const bigNumber = (num: number) => {
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
