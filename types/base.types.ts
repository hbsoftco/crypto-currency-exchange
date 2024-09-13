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

type GetMarketStatusParams = {
	rowCount: number;
};

export type {
	GetPinParams,
	GetLanguageParams,
	GetMarketsParams,
	GetMarketListWithSparkLineChartParams,
	GetMarketStatusParams,
};
