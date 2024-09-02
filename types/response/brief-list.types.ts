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

type CurrencyBriefListResponse = {
	result: MarketBriefItem[];
	statusCode: number;
};

export type {
	CurrencyBriefListResponse,
	MarketBriefListResponse,
	MarketBriefItem,
};
