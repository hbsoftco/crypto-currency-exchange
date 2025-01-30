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

type UserContact = {
	uid: number;
	user: string;
	contactUID: number;
	contactName: string;
	allowed: boolean;
	desc: string;
};

type GetContactListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: UserContact[];
	};
};

type AddressList = {
	id: number;
	uid: number;
	user: string;
	blockchainId: number;
	blockchainName: string;
	desc: string;
	coldWallet: string;
	address: string;
	memo: string;
	allowed: boolean;
};

type GetAddressListRes = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: AddressList[];
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

type ApiList = {
	uid: number;
	user: string;
	apiName: string;
	apiKey: string;
	expireTime: string;
	regTime: string;
	restrictedMarkets: number[];
	restrictedIPs: string;
	permissions: string;
	disabled: boolean;
};

type GetApiListRes = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: ApiList[];
	};
};

type GetApiRes = {
	statusCode: number;
	result: {
		uid: number;
		apiKey: string;
		passPhraseHash: string;
		apiSecret: string;
		wlstIPv4s: string;
		wlstIPv6s: string;

	};
};

type StoreApiRes = {
	statusCode: number;
	result: {
		apiKey: string;
		secretKey: string;
		expireTime: string;

	};
};

export type {
	BestListUser,
	BestReferralItem,
	UserProfileResponse,
	GetCommissionReceivedList,
	Received,
	GetBankListResponse,
	Bank,
	GetContactListResponse,
	GetBestListResponse,
	GetAddressListRes,
	AddressList,
	UserContact,
	GetLevelsDataRes,
	LevelRow,
	GetApiListRes,
	ApiList,
	GetApiRes,
	StoreApiRes,
};
