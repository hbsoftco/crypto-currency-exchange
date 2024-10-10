type Commission = {
	condition: string;
	currencyQuoteId: number;
	discount: string;
	header: string;
	id: number;
	levelIndicator: number;
	levelName: string;
	maker: string;
	marketTypeId: number;
	taker: string;
	withdraw: string;
};

type GetUserTraderCommissionListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Commission[];
	};
};
type BestListTrader = {
	uid: number;
	user: string;
	rank: number;
	pnlPerc: number;
	pnlAmount: number;
	tradeCo: number;
	tradeValue: number;
};

type BesetTraderItem = {
	pid: number;
	pFrom: string;
	pTo: string;
	bestList: BestListTrader[];
	bestOfMine: BestListTrader;
};

type GetTraderBestListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: BesetTraderItem[];
	};
};

export type {
	GetUserTraderCommissionListResponse,
	Commission,
	GetTraderBestListResponse,
	BesetTraderItem,
	BestListTrader,
};
