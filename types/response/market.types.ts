import type { MarketBriefItem } from './brief-list.types';

type MarketListWithSparkLineChartResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: MarketListWithSparkLineChartItem[];
	};
};

type MarketListWithSparkLineChartItem = {
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

export type {
	MarketListWithSparkLineChartResponse,
	MarketListWithSparkLineChartItem,
	MarketStateResponse,
	MarketState,
	Market,
	MarketsResponse,
};
