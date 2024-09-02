type MarketBriefItem = {
	id: number;
	cbId: number;
	cqId: number;
	typeId: number;
	stateId: number;
	mSymbol: string;
	tickSize: string;
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
	unit: number;
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
