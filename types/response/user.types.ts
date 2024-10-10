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

type Ticket = {
	id: number;
	typeId: number;
	typeName: string;
	stateId: number;
	stateName: string;
	priorityId: number;
	priorityName: string;
	creatorUid: number;
	creatorName: string;
	header: string;
	regTime: string;
};

type GetTicketListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Ticket[];
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

export type {
	BestListUser,
	BestReferralItem,
	UserProfileResponse,
	GetCommissionReceivedList,
	Received,
	GetRewardReceivedListResponse,
	Reward,
	GetBankListResponse,
	Bank,
	GetTicketListResponse,
	Ticket,
	GetBestListResponse,
};
