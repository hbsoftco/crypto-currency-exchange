import type { CurrencyBriefItem, MarketBriefItem } from './brief-list.types';

type MarketListWithSparkLineChartResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: MarketListWithSparkLineChartItem[];
	};
};

type MarketListWithSparkLineChartItem = {
	cid: number;
	id: number;
	indexPrice: string;
	priceChangePercIn24H: string;
	sparklineChart: number[];
	marketBriefItem?: MarketBriefItem | null;
};

type MarketStateResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: MarketState[];
	};
};

type MarketState = {
	id: number;
	indexPrice: string;
	priceChangePercIn24H: string;
	marketTypeName: string;
	marketBriefItem: MarketBriefItem | null;
};

type MarketsResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Market[];
	};
};

type Market = {
	id: number;
	indexPrice: string;
	hPriceIn24H: string;
	lPriceIn24H: string;
	priceChangePercIn24H: string;
	valueOfTradesIn24H: string;
	volumeOfTradesIn24H: string;
	marketBriefItem: MarketBriefItem | null;
};

type MarketStatisticsChartsResponse = {
	statusCode: number;
	result: {
		priceChangeStats: PriceChangeState[];
	};
};

type PriceChangeState = {
	countOfMarkets: number;
	priceChangeRange: string;
};

type MarketCurrencyCategoriesResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: MarketCurrencyCategoryItem[];
	};
};

type MarketCurrencyCategoryItem = {
	id: number;
	tag: string;
	markets: MarketItem[];
};

type MarketItem = {
	id: number;
	cid: number;
	indexPrice: string;
	priceChangePercIn24H: string;
	currencyDetails: CurrencyBriefItem | null;
};

type NeutralMarketItem = {
	value: number;
	name: string;
	itemStyle: {
		color: string;
	};
};

type MarketListByCategoryResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: MarketCategoryInfo[];
	};
};

type MarketCategoryInfo = {
	category: string;
	info: MarketInfoItem[];
};

type MarketInfoItem = {
	id: number;
	cid: number;
	indexPrice: string;
	priceChangePercIn24H: string;
	valueOfTradesIn24H: string;
	currencyDetails: CurrencyBriefItem | null;
};

type ListRow = {
	id: number;
	indexPrice: string;
	priceChangePercIn24H: string;
};

type ListResult = {
	totalCount: number;
	rows: ListRow[];
};

type MarketListResponse = {
	statusCode: number;
	result: ListResult;
};

export type {
	MarketListWithSparkLineChartResponse,
	MarketListWithSparkLineChartItem,
	MarketStateResponse,
	MarketState,
	Market,
	MarketsResponse,
	MarketStatisticsChartsResponse,
	PriceChangeState,
	NeutralMarketItem,
	MarketCurrencyCategoriesResponse,
	MarketCurrencyCategoryItem,
	MarketListByCategoryResponse,
	MarketInfoItem,
	MarketCategoryInfo,
	MarketListResponse,
};
