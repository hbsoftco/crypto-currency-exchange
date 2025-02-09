enum AssetType {
	Real = '1101110',
	Testnet = '1301110',
	Bouns = '1101210',
}

enum BoxMode {
	Any = '0',
	Spot = '11',
	Margin = '21',
	Futures = '31',
	WloMain = '41',
	WloCost = '43',
	WloIncome = '45',
	WloFiatCredit = '47',
}

enum BoxSortMode {
	Any = '0',
	ByVolume = '11',
	ByValue = '21',
}

enum PnlSortMode {
	None = '0',
	MostWorthless = '21',
	MostBeneficial = '11',
	HighestIncome = '41',
	MostExpensive = '31',
}

enum PnlFilterMode {
	Any = '0',
	Open = '11',
	Finished = '21',
	Latest = '41',
}

enum MiniAssetMode {
	Any = '0',
	NoMiniAsset = '11',
	OnlyMiniAsset = '21',
}

enum AssetBox {
	SPOT = 1311111,
	SPOT_WITHDRAW_LOCKED = 1311191,
	SPOT_LOCKED = 1410181,

	FUTURES_OVERALL_BALANCE = 1710191,
	FUTURES_INIT_MARGIN = 1710121,
	FUTURES_POSITION_VALUE = 1710131,
	FUTURES_PENDING_ORDER = 1710141,
	FUTURES_AVAILABLE_MARGIN = 1710151,
	FUTURES_UNREALIZED_PNL = 1710161,
	FUTURES_MAINTENANCE_MARGIN = 1710181,
}

enum AssetBoxType {
	Main = '1311111',
	Giveaway = '1312111',
	Margin = '1510121',
	Futures = '1710151',
	WLOFiatCredit = '2310211',
	WLOCosts = '2310311',
	WLOIncome = '2310611',
}

export {
	AssetType,
	BoxMode,
	BoxSortMode,
	MiniAssetMode,
	AssetBox,
	PnlSortMode,
	PnlFilterMode,
	AssetBoxType,
};
