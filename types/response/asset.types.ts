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

export type {
	GetAssetListResponse,
	AssetItem,
};
