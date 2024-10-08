import type { CurrencyBriefItem } from './brief-list.types';

type UserProfileResponse = {
	statusCode: number;
	result: {
		wloId: number;
		userId: number;
		verificationId: number;
	};
};

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

type Reward = {
	id: number;
	prizeId: number;
	uid: number;
	user: string;
	currencyId: number;
	assetTypeId: number;
	amountAllocated: number;
	amountTakenBack: number;
	briefDesc: string;
	fullDesc: string;
	header: string;
	prizeTitle: string;
	reason: string;
	allocateTime: string;
	openTime: string;
	timeToUseAfterOpen: string;
	expireTimeForNotOpening: string;
	currency?: CurrencyBriefItem | null;
};

type GetRewardReceivedListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Reward[];
	};
};

export type {
	UserProfileResponse,
	GetCommissionReceivedList,
	Received,
	GetRewardReceivedListResponse,
	Reward,
};
