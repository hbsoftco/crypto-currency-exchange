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

export type {
	GetUserTraderCommissionListResponse,
	Commission,
};
