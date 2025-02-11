type GetInternalReceiveParams = {
	currencyId: string;
	source: string;
	destination: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type GetReferralBestListParams = {
	periodCo: string;
	assessmentCurrencyId: string;
};

type GetTraderBestListParams = {
	id: string;
	periodCo: string;
	assetType: string;
};

type GetHowBuyListParams = {
	languageId: string;
	tagId: string;
	searchStatement: string;
	group: string;
	pageNumber: string;
	pageSize: string;
};

type GetSubjectLiveChatParams = {
	languageId: string;
	group: string;
};

export type {
	GetReferralBestListParams,
	GetTraderBestListParams,
	GetInternalReceiveParams,
	GetHowBuyListParams,
	GetSubjectLiveChatParams,
};
