import type { CurrencyBrief } from './currency.types';
import type { MarketBrief } from './market.types';
import type { Quote } from './quote.types';

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

type TradeOption = {
	type: 'Buy' | 'Sell';
	takerFee?: string;
	fee: number;
	market: {
		id: number;
		symbol: string;
		tickSize: string;
		price: number;
	};
	base: {
		currency: CurrencyBrief;
		qAvailable: string;
		received: string;
		value: number;
	};
	quote: {
		currency: CurrencyBrief;
		qAvailable: string;
		location: 'TOP' | 'BOTTOM';
		received: string;
		value: number;
	};
};

type SnapshotParams = {
	symbol?: string;
	marketId?: string;
	timeFrame?: '1min' | '3min' | '5min' | '15min' | '30min' | '1hour' | '4hour' | '1day' | '1week' | '1month';
	rows?: string;
	level?: string;
};

type SnapshotResponse = {
	statusCode: number;
	result: Snapshot;
};

type Snapshot = {
	bids: BidAsk[];
	asks: BidAsk[];
	depth: Depth;
	ticker: Ticker;
	latestTrades: LatestTrade[];
};

type Ticker = {
	t: number;
	i: string;
	o: string;
	h: string;
	l: string;
	p: string;
	v: string;
	q: string;
	quote?: Quote | null;
	market?: MarketBrief;
	currency?: CurrencyBrief;
};

type LatestTrade = {
	t: number;
	s: number;
	p: string;
	v: string;
};

type BidAsk = {
	p: string;
	v: string;
	c: string;
};

type Depth = {
	depthOfBid: string[][];
	depthOfAsk: string[][];
};

type StoreOrderMarketDto = {
	marketId: number;
	assetType: string;
	orderSide: string;
	userUniqueTag: string | null;
	reqByQnt: string;
};

type StoreOrderInstantDto = {
	marketId: number;
	assetType: string;
	orderSide: string;
	userUniqueTag: string | null;
	reqByQot: string;
};

type StoreOrderLimitDto = {
	marketId: number;
	assetType: string;
	orderSide: string;
	reqByQnt: string;
	limitPrice: string;
	tifType: string;
	maxLifespanBySecond: number | null;
	userUniqueTag: string | null;
};

type StoreCoinToCoinDto = {
	srcCurrencyId: number;
	desCurrencyId: number;
	assetType: string;
	srcQnt: string;
};

type DeleteOpenOrderDto = {
	id: number;
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
	StoreCoinToCoinDto,
	DeleteOpenOrderDto,
	TradeOption,
	SnapshotResponse,
	SnapshotParams,
	Snapshot,
	Depth,
	BidAsk,
	LatestTrade,
	Ticker,
	StoreOrderLimitDto,
};
