type TraderCommissionListParams = {
	marketType: string;
};

type UserResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Commission[] |
		UserLevel[] |
		Notice [];
	};
};

type UserLevel = {
	levelId: number;
	levelName: string;
	imgLogoUrl: string;
	imgBenefitsUrl: string;
	discount: string;
	fullDesc: string;
	condition: string;
	header: string;
	prize: string;
	withdraw: string;
	tradeByUsdMin: number;
	tradeByUsdMax: number;
	tradePeriodByDay: number;
	indicator: number;
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

type NoticeListParams = {
	from?: string;
	to?: string;
	typeId?: string;
	pageNumber?: string;
	pageSize?: string;
};

type Notice = {
	deleted: boolean;
	noticeBody: string;
	noticeHeader: string;
	readTime: string;
	regTime: string;
	user: string;
	uid: number;
};

export type {
	TraderCommissionListParams,
	UserResponse,
	Commission,
	UserLevel,
	NoticeListParams,
	Notice,
};
