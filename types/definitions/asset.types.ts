import type { KeyValue } from './common.types';
import type { CurrencyBrief } from './currency.types';
import type { MarketBrief } from './market.types';

type AssetListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Asset[] | AssetRecent[] | AssetSpotPnlAgg[] | Portfolio[] | Miscellaneous[];
	};
};

type AssetResponse = {
	statusCode: number;
	result: AssetTotal | AssetBoxBrief[] | AssetSpotPnl | AssetInOutTotal | AssetOption[];
};

type AssetTotalParams = {
	q1CurrencyId?: string;
	q2CurrencyId?: string;
	q3CurrencyId?: string;
	assetType?: string;
	boxMode?: string;
	miniAssetMode?: string;
};

type AssetInOutTotalParams = {
	q1CurrencyId?: string;
	q2CurrencyId?: string;
	q3CurrencyId?: string;
	dateFrom?: string;
	dateTo?: string;
};

type AssetSpotPnlAggListParams = {
	pnlCourseId: string;
	from?: string;
	to?: string;
	sortMode?: string;
};

type AssetSpotPnlListParams = {
	pnlCourseId: string;
	currencyId?: string;
	from?: string;
	to?: string;
	filterMode?: string;
	sortMode?: string;
	pageNumber?: string;
	pageSize?: string;
};

type MiscellaneousListParams = {
	assetType: string;
	currencyId: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type Portfolio = {
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
	latestWeek?: LatestWeek[];
	startedTime: string;
	finishedTime: string;
	usdIndexPrice: string;
	currency?: CurrencyBrief;
};

type LatestWeek = {
	d: string;
	p: number;
	v: number;
};

type AssetSpotPnlAgg = {
	pcid: number;
	pcName: string;
	wloId: number;
	wloName: string;
	cid: number;
	cSymbol: string;
	boughtCostUsd: number;
	soldIncomeUsd: number;
	latestPnlAvgPerc: number;
	latestPnlBasedAvgInUsd: number;
	usdIndexPrice: string;
};

type AssetInOutTotal = {
	depositCo: string;
	depositOnQ1: string;
	depositOnQ2: string;
	depositOnQ3: string;
	withdrawCo: string;
	withdrawOnQ1: string;
	withdrawOnQ2: string;
	withdrawOnQ3: string;
};

type AssetBoxBrief = {
	boxId: number;
	boxName: string;
	usdValue: string;
	q1Value: string;
	q2Value: string;
	q3Value: string;
};

type AssetBoxBriefParams = {
	q1CurrencyId: string;
	q2CurrencyId?: string;
	q3CurrencyId?: string;
	maskedInfo?: string;
	assetType: string;
	boxMode: string;
	miniAssetMode: string;
};

type AssetTotal = {
	totalOnQ1: string;
	totalOnQ2: string;
	totalOnQ3: string;
};

type Asset = {
	currencyId: number;
	qAvailable: string;
	qLocked: string;
	aAvailable: string;
	aLocked: string;
	percentage?: string;
	price?: string;
	currency?: CurrencyBrief;
	markets?: MarketBrief[];
};

type AssetListParams = {
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

type AssetRecentListParams = {
	type: string;
	directionType: string;
	rowCount: string;
};

type AssetSpotPnlTotalParams = {
	pnlCourseId: string;
	q1CurrencyId: string;
	q2CurrencyId: string;
	q3CurrencyId?: string;
};

type AssetSpotPnl = {
	pnlPercentage: number;
	pnlOnQ1: string;
	pnlOnQ2: string;
	pnlOnQ3: string;
};

type AssetRecent = {
	id: number;
	isOutput: boolean;
	factorNo: string;
	txCode: string;
	currencyId: number;
	value: string;
	doneTime: string;
	currency?: CurrencyBrief;
};

type CurrencyBalance = {
	TMN: number;
	USD: number;
};

type SpotItems = {
	spot: CurrencyBalance;
	spot_withdraw_locked: CurrencyBalance;
	spot_locked: CurrencyBalance;
};

type FuturesItems = {
	futures_overall_balance: CurrencyBalance;
	futures_init_margin: CurrencyBalance;
	futures_position_value: CurrencyBalance;
	futures_pending_order: CurrencyBalance;
	futures_available_margin: CurrencyBalance;
	futures_unrealized_pnl: CurrencyBalance;
	futures_maintenance_margin: CurrencyBalance;
};

type Balance = {
	total: CurrencyBalance;
	spot: {
		TMN: number;
		USD: number;
		items: SpotItems;
	};
	futures: {
		TMN: number;
		USD: number;
		items: FuturesItems;
	};
};

type TopCard = {
	iconIndex: number;
	iconBgColor: string;
	title: string;
	percentage: string;
	percentageStatus: boolean;
	seeMoreStatus: boolean;
	seeMoreLink: string;
	countStatus: boolean;
	count: string;
	TMN: string;
	USD: string;
};

type AssetInterBoxOptionsParams = {
	assetTypeId: string;
};

type Miscellaneous = {
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
	currency?: CurrencyBrief;
};

type AssetOption = {
	boxId: number;
	boxName: number;
	assets: KeyValue[];
};

type TransferBalanceDto = {
	assetType: string;
	sourceBoxTypeId: string;
	destinationBoxTypeId: string;
	value: string;
	currencyId: number | null;
};

export type {
	Asset,
	AssetTotal,
	AssetListResponse,
	AssetResponse,
	AssetListParams,
	AssetTotalParams,
	AssetBoxBriefParams,
	AssetBoxBrief,
	AssetRecentListParams,
	AssetRecent,
	Balance,
	FuturesItems,
	SpotItems,
	CurrencyBalance,
	AssetSpotPnlTotalParams,
	AssetSpotPnl,
	AssetInOutTotalParams,
	AssetSpotPnlAggListParams,
	AssetSpotPnlAgg,
	AssetInOutTotal,
	TopCard,
	AssetSpotPnlListParams,
	Portfolio,
	LatestWeek,
	MiscellaneousListParams,
	Miscellaneous,
	AssetInterBoxOptionsParams,
	AssetOption,
	TransferBalanceDto,
};
