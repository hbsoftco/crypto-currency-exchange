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

type GetStaffParams = {
	languageId?: string;
	staffId: string;
	profileTypeId: string;
};

type GetMarketListWithSparkLineChartParams = {
	sortMode?: string;
	currencyQuoteId?: string;
	marketTypeId: string;
	tagTypeId?: string;
};

type GetMarketsParams = {
	sortMode?: string;
	currencyQuoteId?: string;
	marketTypeId: string;
	tagTypeId?: string;
	searchStatement?: string;
	pageNumber?: string;
	pageSize?: string;
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

type GetKlineParams = {
	timeFrom?: string;
	timeTo?: string;
	candleCount?: string;
	timeFrameType?: string;
	symbol?: string;
	marketId?: string;
};

type SpotDataParams = {
	symbol?: string;
	marketId?: string;
	timeFrame?: '1min' | '3min' | '5min' | '15min' | '30min' | '1hour' | '4hour' | '1day' | '1week' | '1month';
	rows?: string;
	level?: string;
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

type GetExposedListParams = {
	tagId?: string;
};

type GetTagListParams = {
	tagType?: string;
};

type GetCurrencyParams = {
	id: string;
	languageId: string;
};

type GetMarketStatusParams = {
	rowCount: number;
};

type GetUserTraderCommissionListParams = {
	marketType: string;
};

type GetMarketListByCategoryParams = {
	rowCount: string;
	marketTypeId: string;
};

type KeyValue = {
	key: string;
	value: string;
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

type GetOrderListParams = {
	marketId: string;
	symbol: string;
	orderSide?: string;
	orderType?: string;
	assetType: string;
	searchMode?: string;
	uniqueTag?: string;
	from?: string;
	to?: string;
	pageNumber: string;
	pageSize?: string;
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

type GetCommissionReceivedListParams = {
	marketType: string;
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

type GetTicketListParams = {
	state: string;
	typeId: string;
	searchStatement: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type GetReferralBestListParams = {
	periodCo: string;
	assessmentCurrencyId: string;
};

type GetRewardExposedParams = {
	tagId: string;
};

type GetTraderBestListParams = {
	id: string;
	periodCo: string;
	assetType: string;
};

export type {
	GetRewardExposedParams,
	GetKlineParams,
	SpotDataParams,
	GetPinParams,
	GetRootListParams,
	GetLanguageParams,
	GetCurrencyParams,
	GetMarketsParams,
	GetUserTraderCommissionListParams,
	GetMarketListWithSparkLineChartParams,
	GetMarketStatusParams,
	getTradesListParams,
	GetMarketListByCategoryParams,
	GetAssetListParams,
	GetExposedListParams,
	KeyValue,
	GetTagListParams,
	GetStaffParams,
	GetTradeListParams,
	GetOrderListParams,
	GetDepositParams,
	GetInternalReceiveParams,
	GetCommissionReceivedListParams,
	GetMiscellaneousListParams,
	GetRewardReceivedListParams,
	GetWithdrawParams,
	GetBankParams,
	GetDepositAddressParams,
	GetTicketListParams,
	GetReferralBestListParams,
	GetTraderBestListParams,
};
