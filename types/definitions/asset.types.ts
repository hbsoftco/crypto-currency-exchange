import type { CurrencyBrief } from './currency.types';

type AssetListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Asset[];
	};
};

type AssetResponse = {
	statusCode: number;
	result: AssetTotal | 'test';
};

type AssetTotalParams = {
	q1CurrencyId?: string;
	q2CurrencyId?: string;
	q3CurrencyId?: string;
	assetType?: string;
	boxMode?: string;
	miniAssetMode?: string;
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
	currency?: CurrencyBrief;
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

export type {
	Asset,
	AssetTotal,
	AssetListResponse,
	AssetResponse,
	AssetListParams,
	AssetTotalParams,
};
