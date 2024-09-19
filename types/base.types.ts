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
	GetMarketListByCategoryParams,
	KeyValue,
};
