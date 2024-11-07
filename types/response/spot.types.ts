type BidAsk = {
	p: string;
	v: string;
	c: string;
};

type Depth = {
	depthOfBid: string[][];
	depthOfAsk: string[][];
};

interface Ticker {
	t: number;
	i: string;
	o: string;
	h: string;
	l: string;
	p: string;
	v: string;
	q: string;
}

type LatestTrade = {
	t: number;
	s: number;
	p: string;
	v: string;
};

type Spot = {
	bids: BidAsk[];
	asks: BidAsk[];
	depth: Depth;
	ticker: Ticker;
	latestTrades: LatestTrade[];
};

type GetSpotDataResponse = {
	statusCode: number;
	result: Spot;
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

type GetTradeListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Trade[];
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

type OrderFiltersType = {
	symbol: string;
	orderSide: string;
	orderType: string;
	from: string;
	to: string;
};

type GetOrderListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Order[];
	};
};
export type {
	OrderFiltersType,
	Spot,
	BidAsk,
	Depth,
	Ticker,
	LatestTrade,
	GetSpotDataResponse,
	Trade,
	GetTradeListResponse,
	Order,
	GetOrderListResponse,
};
