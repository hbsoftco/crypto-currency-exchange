type BestListUser = {
	uid: number;
	user: string;
	rank: number;
	coDirectActive: number;
	coDirectInactive: number;
	coIndirectActive: number;
	coIndirectInactive: number;
	taken: number;
};

type BestReferralItem = {
	pid: number;
	pFrom: string;
	pTo: string;
	bestList: BestListUser[];
	bestOfMine: BestListUser;
};

type GetBestListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: BestReferralItem[];
	};
};

type LevelRow = {
	levelId: number;
	levelName: string;
	imgLogoUrl: string;
	imgBenefitsUrl: string;
	discount: string;
	fullDesc: string;
	condition: string;
	header: string;
	prize: string;
	withdraw: string;
	tradeByUsdMin: number;
	tradeByUsdMax: number;
	tradePeriodByDay: number;
	indicator: number;
};

type GetLevelsDataRes = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: LevelRow[];
	};
};

export type {
	BestListUser,
	BestReferralItem,
	GetBestListResponse,
	GetLevelsDataRes,
	LevelRow,
};
