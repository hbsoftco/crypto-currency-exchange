type Percentages = {
	cid: number;
	dPerc: number;
	oPerc: number;
};

type Config = {
	id: number;
	indicator: number;
	name: string;
	from: number;
	to: number;
	percentages: Percentages;
};

type Global = {
	overallPayment: number;
	receivers: number;
};

type Subject = {
	inLY: number;
	inL6M: number;
	inL3M: number;
	inL1M: number;
	coLY: number;
	coL6M: number;
	coL3M: number;
	coL1M: number;
};

type Result = {
	refCode: string;
	config: Config;
	global: Global;
	subject: Subject;
	coDirectActive: number;
	coDirectInactive: number;
	coIndirectActive: number;
	coIndirectInactive: number;
};

type GetReferralRes = {
	statusCode: number;
	result: Result;
};

type InviteList = {
	uid: number;
	user: string;
	regTime: string;
	income: number;
};

type GetInvitationListRes = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: InviteList[];
	};
};

type CommissionList = {
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
};

type GetCommissionRes = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: CommissionList[];

	};
};

export type {
	GetReferralRes,
	GetInvitationListRes,
	GetCommissionRes,
	InviteList,
	CommissionList,
};
