import type { CurrencyBriefItem, MarketBriefItem } from './brief-list.types';

type MarketsResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Market[];
	};
};

type Market = {
	cid: number;
	id: number;
	indexPrice: string;
	hPriceIn24H: string;
	lPriceIn24H: string;
	priceChangePercIn24H: string;
	valueOfTradesIn24H: string;
	volumeOfTradesIn24H: string;
	marketBriefItem?: MarketBriefItem | null;
	currency: CurrencyBriefItem | null;
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

type MarketDetailItem = {
	id: number;
	cid: number;
	indexPrice: string;
	priceChangePercIn24H: string;
	marketBriefItem: MarketBriefItem | null;
};

type MarketListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: MarketDetailItem[];
	};
};

export type {
	Market,
	MarketItem,
	MarketDetailItem,
	MarketsResponse,
	MarketStatisticsChartsResponse,
	PriceChangeState,
	NeutralMarketItem,
	MarketListResponse,
};
