enum OrderType {
	MARKET = 'Market',
	INSTANT = 'Instant',
	STOP_MARKET = 'StopMarket',
	STOP_INSTANT = 'StopInstant',
	LIMIT = 'Limit',
	STOP_LIMIT = 'StopLimit',
}

enum OrderSide {
	BUY = 'Buy',
	SELL = 'Sell',
}

enum SearchMode {
	ANY = '0',
	OPEN = '11',
	FILLED = '21',
	CANCELED = '41',
}
export {
	OrderType,
	OrderSide,
	SearchMode,
};
