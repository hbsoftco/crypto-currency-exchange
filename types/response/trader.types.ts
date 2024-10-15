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

type TraderBriefLevel = {
	indicator: number;
	name: string;
	valMax: number;
	valMin: number;
	logoUrl: string;
};

type SpotOrFutures = {
	coL1M: number;
	coL3M: number;
	coL6M: number;
	coLY: number;
	vasmL1M: number;
	vasmL3M: number;
	vasmL6M: number;
	vasmLY: number;
};

type TraderBriefItem = {
	level: TraderBriefLevel;
	spot: SpotOrFutures;
	futures: SpotOrFutures;
};

type GetTraderBriefResponse = {
	statusCode: number;
	result: TraderBriefItem;
};

export type {
	GetUserTraderCommissionListResponse,
	Commission,
	GetTraderBestListResponse,
	BesetTraderItem,
	BestListTrader,
	GetTraderBriefResponse,
	TraderBriefItem,
};
