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

type MarketState = {
	indexPrice: number;
	priceChange24h: number;
	marketTypeName: string;
};

export type {
	MarketListWithSparkLineChartResponse,
	MarketListWithSparkLineChartItem,
	MarketState,
};
