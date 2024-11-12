import type { CurrencyBrief } from './currency.types';

type AssetResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Asset[];
	};
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
	AssetResponse,
	AssetListParams,
};
