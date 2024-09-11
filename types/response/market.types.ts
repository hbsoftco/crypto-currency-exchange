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
	indexPrice: number;
	priceChange24h: number;
	marketTypeName: string;
};

export type {
	MarketListWithSparkLineChartResponse,
	MarketListWithSparkLineChartItem,
	MarketStateResponse,
	MarketState,
};
