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

enum MiniAssetMode {
	Any = '0',
	NoMiniAsset = '11',
	OnlyMiniAsset = '21',
}

export {
	AssetType,
	BoxMode,
	BoxSortMode,
	MiniAssetMode,
};
