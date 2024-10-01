type Reward = {
	id: number;
	logoUrl: string;
	currencyId: number;
	assetTypeId: number;
	amount: number;
	expireAfter: string;
	usageCountMax: number;
	usageLeverageMax: number;
	briefDesc: string;
	fullDesc: string;
	header: string;
	prizeTitle: string;
	reason: string;
	progressPerc: number;
	coAllocated: number;
	iDsToOpen: string;
};

type GetExposedListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Reward[];
	};
};

export type {
	GetExposedListResponse,
	Reward,
};
