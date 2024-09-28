type AssetItem = {
	currencyId: number;
	qAvailable: string;
	qLocked: string;
	aAvailable: string;
	aLocked: string;
};

type GetAssetListResponse = {
	statusCode: number;
	result: AssetItem[];
};

export type {
	GetAssetListResponse,
	AssetItem,
};
