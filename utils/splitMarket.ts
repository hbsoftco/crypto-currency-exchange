const markets = ['TMN', 'USDT'];

export const splitMarket = (market: string): string | null => {
	for (const quote of markets) {
		if (market.endsWith(quote)) {
			const symbol = market.slice(0, -quote.length);
			return `${symbol}_${quote}`;
		}
	}
	return null;
};
