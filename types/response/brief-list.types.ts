import type { IconItem } from './icon.types';

type MarketBriefItem = {
	id: number;
	cbId: number;
	cqId: number;
	typeId: number;
	stateId: number;
	mSymbol: string;
	tickSize: string;
	currencyBriefItem?: CurrencyBriefItem | null;
	quoteItem?: CurrencyBriefItem | null;
	icon?: IconItem | null;
};

type MarketBriefListResponse = {
	result: MarketBriefItem[];
	statusCode: number;
};

type CurrencyBriefItem = {
	cName: string;
	cSymbol: string;
	id: number;
	rank: number;
	stateId: number;
	typeId: number;
	unit: string;
};

type CurrencyBriefListResponse = {
	result: CurrencyBriefItem[];
	statusCode: number;
};

export type {
	CurrencyBriefListResponse,
	CurrencyBriefItem,
	MarketBriefListResponse,
	MarketBriefItem,
};
