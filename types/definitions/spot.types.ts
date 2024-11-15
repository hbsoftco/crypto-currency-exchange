type KLineParams = {
	timeFrom?: string;
	timeTo?: string;
	candleCount?: string;
	timeFrameType?: string;
	symbol?: string;
	marketId?: string;
};

type KLineResponse = {
	statusCode: number;
	result: string[];
};

type TradeListParams = {
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

type OrderListParams = {
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

type SpotResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Trade[] |
		Order[];
	};
};

type Order = {
	oid: number;
	mid: number;
	mSymbol: string;
	uid: number;
	apiKey: string;
	assetTypeId: number;
	assetTypeName: string;
	rejectReasonId: number;
	rejectReasonName: string;
	sideId: number;
	sideName: string;
	orderTypeId: number;
	orderTypeName: string;
	orderStateId: number;
	orderStateName: string;
	tif: string;
	stp: string;
	maxLifespan: number;
	userUniqueTag: string;
	isHiddenInBook: boolean;
	regMarketPrice: string;
	reqQnt: string;
	reqQot: string;
	limitPrice: string;
	triggerPriceGTE: string;
	triggerPriceLTE: string;
	dealPrice: string;
	filledQot: string;
	filledQnt: string;
	filledPerc: number;
	regTime: string;
	triggerTime: string;
	fillTime: string;
	cancelTime: string;
	tradesDetails: string;
	description: string;
};

type Trade = {
	tid: number;
	oid: number;
	mid: number;
	mSymbol: string;
	uid: number;
	apiKey: string;
	assetTypeId: number;
	assetTypeName: string;
	sideId: number;
	sideName: string;
	orderTypeId: number;
	orderTypeName: string;
	orderStateId: number;
	orderStateName: string;
	tif: string;
	stp: string;
	discountId: number;
	discountTypeId: number;
	discountName: string;
	discountPerc: number;
	maxLifespan: number;
	userUniqueTag: string;
	regMarketPrice: string;
	reqQnt: string;
	reqQot: string;
	limitPrice: string;
	triggerPriceGTE: string;
	triggerPriceLTE: string;
	dealPrice: string;
	filledQot: string;
	filledQnt: string;
	regTime: string;
	triggerTime: string;
	fillTime: string;
	tradesDetails: string;
	description: string;
	tradeMarketPrice: string;
	spentRaw: string;
	achievedRaw: string;
	feeRawPerc: number;
	feeRawQot: string;
	feeRawUsd: number;
	feeAppliedPerc: number;
	feeAppliedQot: string;
	feeAppliedUsd: number;
	spentApplied: string;
	achievedApplied: string;
	tradeValueInUsd: number;
};

type OrderFiltersType = {
	marketId?: string;
	symbol: string;
	orderSide: string;
	orderType: string;
	from: string;
	to: string;
};

type StoreOrderMarketDto = {
	marketId: number;
	assetType: string;
	orderSide: string;
	userUniqueTag: string | null;
	reqByQnt: string | null;
};

type StoreOrderInstantDto = {
	marketId: number;
	assetType: string;
	orderSide: string;
	userUniqueTag: string | null;
	reqByQot: string | null;
};

export type {
	KLineParams,
	KLineResponse,
	TradeListParams,
	SpotResponse,
	Trade,
	OrderListParams,
	Order,
	OrderFiltersType,
	StoreOrderMarketDto,
	StoreOrderInstantDto,
};
