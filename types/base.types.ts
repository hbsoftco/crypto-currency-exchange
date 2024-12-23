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

type GetExposedListParams = {
	tagId?: string;
};

type GetTagListParams = {
	tagType?: string;
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

type GetRewardExposedParams = {
	tagId: string;
};

type GetTraderBestListParams = {
	id: string;
	periodCo: string;
	assetType: string;
};

type GetTraderBriefParams = {
	id: string;
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

type GetFAQListParams = {
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

type GetContactListParams = {
	statement: string;
	pageNumber: string;
	pageSize: string;
};

type DeleteContactListParams = {
	contactUserId: string;
};

type GetAddressListParams = {
	srchBlockchainId: string;
	searchStatement?: string;
	pageNumber?: string;
	pageSize?: string;
};

type DeleteAddressListParams = {
	withdrawId: string;
};

type GetAssetTotalParams = {
	q1CurrencyId?: string;
	q2CurrencyId?: string;
	q3CurrencyId?: string;
	assetType?: string;
	boxMode?: string;
	miniAssetMode?: string;
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

type GetAssetBoxParams = {
	q1CurrencyId: string;
	q2CurrencyId?: string;
	q3CurrencyId?: string;
	maskedInfo?: string;
	assetType: string;
	boxMode: string;
	miniAssetMode: string;
};

type GetRecentListParams = {
	type: string;
	directionType: string;
	rowCount: string;
};

type GetReferralParams = {
	assessmentCurrencyId: string;
};

type GetInvitationParams = {
	getMode?: string;
	sortMode?: string;
	assessmentCurrencyId: string;
	pageNumber?: string;
	pageSize?: string;
};

type getDeviceListParams = {
	from?: string;
	to?: string;
	pageNumber?: string;
	pageSize?: string;
};

type GetReasonListParams = {
	entityType?: string;
	langId?: string;
};

type getMiniRoutineParams = {
	tagType: string;
};

type getActivitiesListParams = {
	logTypeId?: string;
	from?: string;
	to?: string;
	pageNumber?: string;
	pageSize?: string;
};

type getTypeListParams = {
	entityTypeId: string;
	langId?: string;
};

type getApiListParams = {
	srchKey?: string;
	from?: string;
	to?: string;
	pageNumber?: string;
	pageSize?: string;
};

type getApiParams = {
	apiKey: string;
};

type GetCurrencyParams = {
	languageId: string;
	id: string;
};
export type {
	GetReferralBestListParams,
	GetRewardExposedParams,
	GetPinParams,
	GetRootListParams,
	GetLanguageParams,
	GetUserTraderCommissionListParams,
	GetMarketStatusParams,
	getTradesListParams,
	GetAssetListParams,
	GetExposedListParams,
	GetTagListParams,
	GetStaffParams,
	GetTradeListParams,
	GetDepositParams,
	GetTraderBestListParams,
	GetInternalReceiveParams,
	GetCommissionReceivedListParams,
	GetMiscellaneousListParams,
	GetRewardReceivedListParams,
	GetWithdrawParams,
	GetBankParams,
	GetDepositAddressParams,
	GetHowBuyListParams,
	GetFAQListParams,
	GetSubjectLiveChatParams,
	GetContactListParams,
	DeleteContactListParams,
	GetAddressListParams,
	DeleteAddressListParams,
	GetAssetTotalParams,
	GetPanelListParams,
	GetAssetBoxParams,
	GetRecentListParams,
	GetReferralParams,
	GetInvitationParams,
	GetTraderBriefParams,
	DepositCoinListParams,
	WithdrawCoinListParams,
	getDeviceListParams,
	GetReasonListParams,
	getMiniRoutineParams,
	getActivitiesListParams,
	getTypeListParams,
	getApiListParams,
	getApiParams,
	GetCurrencyParams,
};
