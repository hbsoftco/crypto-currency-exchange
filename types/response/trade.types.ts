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

type GetTradesResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Trade[];
	};
};

export type {
	GetTradesResponse,
	Trade,
};
