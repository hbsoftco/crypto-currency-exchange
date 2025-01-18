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

type GetStateTradeRes = {
	statusCode: number;
	result: {
		cid: number;
		spot_CoL1M: number;
		spot_CoL3M: number;
		spot_CoL6M: number;
		spot_CoLY: number;
		spot_VusdL1M: number;
		spot_VusdL3M: number;
		spot_VusdL6M: number;
		spot_VusdLY: number;
		spot_VasmL1M: number;
		spot_VasmL3M: number;
		spot_VasmL6M: number;
		spot_VasmLY: number;
		futures_CoL1M: number;
		futures_CoL3M: number;
		futures_CoL6M: number;
		futures_CoLY: number;
		futures_VusdL1M: number;
		futures_VusdL3M: number;
		futures_VusdL6M: number;
		futures_VusdLY: number;
		futures_VasmL1M: number;
		futures_VasmL3M: number;
		futures_VasmL6M: number;
		futures_VasmLY: number;
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
type DeviceItem = {
	id: number;
	iPv4: string;
	iPv6: string;
	device: string;
	isExpired: boolean;
	latestTime: string;
	inactive: boolean;
};

type GetDeviceListRes = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: DeviceItem[];
	};
};

type GetDevLinkGenerateRes = {
	statusCode: number;
	result: {
		devLinkID: number;
		devLinkSecret: string;
	};
};
type ActivitiesList = {
	uid: number;
	user: string;
	typeId: number;
	typeName: string;
	logTime: string;
	device: string;
	iPv4: string;
	iPv6: string;
};

type GetActivitiesListRes = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: ActivitiesList[];
	};
};

type Level = {
	indicator: number;
	name: string;
	valMax: number;
	valMin: number;
	logoUrl: string;
};

type Info = {
	assetsTotal: string;
	assetsInTrade: string;
	assetsInHold: string;
};

type GetHolderRes = {
	statusCode: number;
	result: {
		level: Level;
		info: Info;
	};
};

type levelList = {
	levelId: number;
	levelName: string;
	imgLogoUrl: string;
	imgBenefitsUrl: string;
	discount: string;
	condition: string;
	header: string;
	prize: string;
	withdraw: string;
	holdByUsdMin: number;
	holdByUsdMax: number;
	holdPeriodByDay: number;
	indicator: number;
};

type GetHolderLevelListRes = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: levelList[];
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
	GetRewardReceivedListResponse,
	Reward,
	GetBankListResponse,
	Bank,
	GetContactListResponse,
	GetBestListResponse,
	GetAddressListRes,
	AddressList,
	UserContact,
	GetStateTradeRes,
	GetLevelsDataRes,
	LevelRow,
	GetDeviceListRes,
	DeviceItem,
	GetDevLinkGenerateRes,
	GetActivitiesListRes,
	ActivitiesList,
	GetHolderRes,
	GetHolderLevelListRes,
	levelList,
	Level,
	Info,
	GetApiListRes,
	ApiList,
	GetApiRes,
	StoreApiRes,
};
