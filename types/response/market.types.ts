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
};

export type {
	MarketListWithSparkLineChartResponse,
	MarketListWithSparkLineChartItem,
};
