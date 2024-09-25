type GetPinParams = {
	languageId: number;
	group?: string;
};

type GetLanguageParams = {
	languageId: number;
};

type GetMarketListWithSparkLineChartParams = {
	sortMode?: string;
	currencyQuoteId?: string;
	marketTypeId: string;
	tagTypeId?: string;
};

type GetMarketsParams = {
	sortMode?: string;
	currencyQuoteId?: string;
	marketTypeId: string;
	tagTypeId?: string;
	searchStatement?: string;
	pageNumber?: string;
	pageSize?: string;
};

type getTradesListParams = {
	marketId?: string;
	symbol?: string;
	orderSide: string;
	orderType?: string;
	assetType?: string;
	uniqueTag?: string;
	from?: string;
	to?: string;
	pageNumber?: string;
	pageSize?: string;
};

type GetAssetListResponse = {
	statement?: string;
	assessmentCurrencyId?: string;
	assetType: string;
	boxMode?: string;
	boxSortMode?: string;
	miniAssetMode?: string;
	currencyIDs?: string;
	pageNumber?: string;
	pageSize?: string;
};

type GetCurrencyParams = {
	id: string;
	languageId: string;
};

type GetMarketStatusParams = {
	rowCount: number;
};

type GetMarketListByCategoryParams = {
	rowCount: string;
	marketTypeId: string;
};

type KeyValue = {
	key: string;
	value: string;
};

export type {
	GetPinParams,
	GetLanguageParams,
	GetCurrencyParams,
	GetMarketsParams,
	GetMarketListWithSparkLineChartParams,
	GetMarketStatusParams,
	getTradesListParams,
	GetMarketListByCategoryParams,
	GetAssetListResponse,
	KeyValue,
};
