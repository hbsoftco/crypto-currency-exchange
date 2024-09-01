enum SortMode {
	BY_RECENTLY_CHANGED = 11,
	BY_MARKET_CAPS = 21,
	BY_MOST_PROFIT = 31,
	BY_NEWEST_COINS = 41,
	BY_TRADE_COUNT = 51,
	BY_VALUE = 61,
	BY_FAVORITES = 71,
}

enum MarketType {
	SPOT = 111,
	FUTURES = 311,
}

export {
	MarketType,
	SortMode,
};
