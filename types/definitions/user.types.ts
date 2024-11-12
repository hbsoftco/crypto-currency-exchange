type TraderCommissionListParams = {
	marketType: string;
};

type UserResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Commission[];
	};
};

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

export type {
	TraderCommissionListParams,
	UserResponse,
	Commission,
};
