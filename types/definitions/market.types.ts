import type { CurrencyBrief } from './currency.types';
import type { Quote } from './quote.types';

type MarketBrief = {
	id: number;
	cbId: number;
	cqId: number;
	typeId: number;
	stateId: number;
	mSymbol: string;
	tickSize: string;
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

export type {
	MarketL21,
	MarketsL21Response,
	MarketsL21Params,
	MarketsParams,
	MarketsL16Response,
	MarketL16,
};
