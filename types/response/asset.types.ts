import type { CurrencyBriefItem } from './brief-list.types';

type AssetItem = {
	currencyId: number;
	qAvailable: string;
	qLocked: string;
	aAvailable: string;
	aLocked: string;
};

type GetAssetListResponse = {
	statusCode: number;
	result: {
		rows: AssetItem[];
		totalCount: number;
	};
};

type InternalReceive = {
	id: number;
	isOutput: boolean;
	factorNo: string;
	uidFrom: number;
	userFrom: string;
	uidTo: number;
	userTo: string;
	currencyId: number;
	value: string;
	doneTime: string;
	currency?: CurrencyBriefItem | null;
};

type GetInternalReceiveListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: InternalReceive[];
	};
};

type MiscellaneousList = {
	logTypeId: number;
	logTypeName: string;
	logTypeIsRaising: boolean;
	boxTypeId: number;
	boxTypeName: string;
	uidIssuer: number;
	uidAffected: number;
	cid: number;
	value: string;
	balanceAfter: string;
	time: string;
	description: string;
	currency?: CurrencyBriefItem | null;
};

type GetMiscellaneousListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: MiscellaneousList[];
	};
};

type PortfolioItem = {
	pid: number;
	pcid: number;
	pcName: string;
	cid: number;
	cSymbol: string;
	boughtQnt: string;
	boughtAvgPriceInUsd: string;
	boughtCostUsd: number;
	soldQnt: string;
	soldAvgPriceInUsd: string;
	soldIncomeUsd: number;
	latestPnlAvgPerc: number;
	latestPnlBasedAvgInUsd: number;
	latestWeekAsJson: string;
	startedTime: string;
	finishedTime: string;
	usdIndexPrice: string;
};

type GetPortfolioRes = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: PortfolioItem[];
	};
};

export type {
	GetAssetListResponse,
	AssetItem,
	GetInternalReceiveListResponse,
	GetMiscellaneousListResponse,
	InternalReceive,
	MiscellaneousList,
	GetPortfolioRes,
};
