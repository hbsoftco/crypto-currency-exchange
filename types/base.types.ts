type GetPinParams = {
	languageId: number;
	group?: string;
};

type GetRootListParams = {
	languageId: string;
	group: string;
};

type GetLanguageParams = {
	languageId: number;
};

type getTradesListParams = {
	marketId?: string;
	symbol?: string;
	orderSide: string;
	orderType?: string;
	assetType?: string;
	uniqueTag?: string;
	from?: string;
	to?: string;
	pageNumber?: string;
	pageSize?: string;
};

type GetAssetListParams = {
	statement?: string;
	assessmentCurrencyId?: string;
	assetType: string;
	boxMode?: string;
	boxSortMode?: string;
	miniAssetMode?: string;
	currencyIDs?: string;
	pageNumber?: string;
	pageSize?: string;
};

type GetMarketStatusParams = {
	rowCount: number;
};

type GetUserTraderCommissionListParams = {
	marketType: string;
};

type GetTradeListParams = {
	marketId: string;
	symbol: string;
	orderSide: string;
	orderType: string;
	assetType: string;
	uniqueTag: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type GetDepositParams = {
	type?: string;
	currencyId: string;
	statement: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type GetInternalReceiveParams = {
	currencyId: string;
	source: string;
	destination: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type GetMiscellaneousListParams = {
	assetType: string;
	currencyId: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type GetRewardReceivedListParams = {
	currencyId: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type GetWithdrawParams = {
	type?: string;
	currencyId: string;
	statement: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type GetBankParams = {
	typeId: string;
	statement: string;
	pageNumber: string;
	pageSize: string;
};

type GetDepositAddressParams = {
	netId: string;
	statement: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type DepositCoinListParams = {
	type: string;
	statement: string;
	pageNumber: string;
	pageSize: string;
};

type WithdrawCoinListParams = {
	type: string;
	statement: string;
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

type GetPanelListParams = {
	pnlCourseId: string;
	currencyId?: string;
	from?: string;
	to?: string;
	filterMode?: string;
	sortMode?: string;
	pageNumber?: string;
	pageSize?: string;
};

type GetReferralParams = {
	assessmentCurrencyId: string;
};

type GetCurrencyParams = {
	languageId: string;
	id: string;
};
export type {
	GetReferralBestListParams,
	GetPinParams,
	GetRootListParams,
	GetLanguageParams,
	GetUserTraderCommissionListParams,
	GetMarketStatusParams,
	getTradesListParams,
	GetAssetListParams,
	GetTradeListParams,
	GetDepositParams,
	GetTraderBestListParams,
	GetInternalReceiveParams,
	GetMiscellaneousListParams,
	GetRewardReceivedListParams,
	GetWithdrawParams,
	GetBankParams,
	GetDepositAddressParams,
	GetHowBuyListParams,
	GetSubjectLiveChatParams,
	GetPanelListParams,
	GetReferralParams,
	DepositCoinListParams,
	WithdrawCoinListParams,
	GetCurrencyParams,
};
