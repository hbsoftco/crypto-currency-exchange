import type { CurrencyBrief } from './currency.types';
import type { Quote } from './quote.types';

type MarketBrief = {
	cbId: number;
	contractUnitSize: string;
	cqId: number;
	fundValueMax: string;
	fundValueMin: string;
	id: number;
	leverageMax: string;
	leverageMin: string;
	mSymbol: string;
	maintenanceRatio: string;
	priceDisplayFormat: string;
	roundNo: number;
	stateId: number;
	tickSize: string;
	typeId: number;
	currency?: CurrencyBrief | null;
};

type MarketsL21Params = {
	sortMode?: string;
	currencyQuoteId?: string;
	marketTypeId: string;
	tagTypeId?: string;
};

type MarketL21 = {
	cid: number;
	id: number;
	mSymbol?: string;
	indexPrice: string;
	priceChangePercIn24H: string;
	sparklineChart: number[];
	currency?: CurrencyBrief | null;
	quote?: Quote | null;
};

type MarketsL21Response = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: MarketL21[];
	};
};

type MarketsParams = {
	sortMode?: string;
	currencyQuoteId?: string;
	marketTypeId: string;
	tagTypeId?: string;
	searchStatement?: string;
	pageNumber?: string;
	pageSize?: string;
};

type MarketsL16Response = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: MarketL16[];
	};
};

type MarketL16 = {
	id: number;
	cid: number;
	mSymbol?: string;
	indexPrice: string;
	priceChangePercIn24H: string;
	currency: CurrencyBrief | null;
	market: MarketBrief | null;
	quote?: Quote | null;
};

type MarketStateParams = {
	rowCount: string;
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
	cid: number;
	indexPrice: string;
	priceChangePercIn24H: string;
	marketTypeName: string;
	mSymbol?: string;
	currency: CurrencyBrief | null;
	market: MarketBrief | null;
	quote?: Quote | null;
};

export type {
	MarketBrief,
	MarketL21,
	MarketsL21Response,
	MarketsL21Params,
	MarketsParams,
	MarketsL16Response,
	MarketL16,
	MarketStateParams,
	MarketStateResponse,
	MarketState,
};
