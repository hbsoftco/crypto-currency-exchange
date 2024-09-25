type Asset = {
	name: string;
};

type GetAssetListResponse = {
	statusCode: number;
	result: Asset;
};

export type {
	GetAssetListResponse,
};
