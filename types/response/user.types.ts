import type { CurrencyBriefItem } from './brief-list.types';

type Received = {
	tid: number;
	mid: number;
	mSymbol: string;
	ruid: number;
	cid: number;
	cSymbol: string;
	tuid: number;
	tUser: string;
	tValue: number;
	tFee: number;
	tTime: string;
	perc: string;
	amount: string;
	currency?: CurrencyBriefItem | null;
};

type GetCommissionReceivedList = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Received[];
	};
};

type Bank = {
	id: number;
	uid: number;
	user: string;
	stateId: number;
	stateName: string;
	typeId: number;
	typeName: string;
	regTime: string;
	bankName: string;
	iban: string;
	cardNo: string;
};

type GetBankListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Bank[];
	};
};

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
	GetCommissionReceivedList,
	Received,
	GetBankListResponse,
	Bank,
	GetBestListResponse,
	GetLevelsDataRes,
	LevelRow,
};
