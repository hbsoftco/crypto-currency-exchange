import type { KeyBool } from './common.types';
import type { CurrencyBrief } from './currency.types';

type TraderCommissionListParams = {
	marketType: string;
};

type UserResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Commission[] |
		UserLevel[] |
		Ticket[] |
		Invite[] |
		InviteCommission[] |
		Reward[] |
		Api[] |
		BankAccount[] |
		BankAccountDpi[] |
		RewardReceived[] |
		Level[];
	};
};

type ResultResponse = {
	statusCode: number;
	result: ReferralBrief |
	ApiCredentials |
	ApiPointInfo |
	HolderBrief |
	TraderState[] |
	TraderBrief;
};

type ReferralBrief = {
	refCode: string;
	config: {
		id: number;
		indicator: number;
		name: string;
		from: number;
		to: number;
		percentages: {
			cid: number;
			dPerc: number;
			oPerc: number;
		};
	};
	global: {
		overallPayment: number;
		receivers: number;
	};
	subject: {
		inLY: number;
		inL6M: number;
		inL3M: number;
		inL1M: number;
		coLY: number;
		coL6M: number;
		coL3M: number;
		coL1M: number;
	};
	coDirectActive: number;
	coDirectInactive: number;
	coIndirectActive: number;
	coIndirectInactive: number;
};

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
	currency?: CurrencyBrief;
};

type RewardReceived = {
	id: number;
	stateId: number;
	stateName: string;
	prizeId: number;
	uid: number;
	user: string;
	currencyId: number;
	assetTypeId: number;
	assetTypeName: string;
	amountAllocated: number;
	briefDesc: string;
	fullDesc: string;
	header: string;
	prizeTitle: string;
	reason: string;
	allocateTime: string;
	openTime: string;
	timeToUseAfterOpen: string;
	expireTimeForNotOpening: string;
	currency?: CurrencyBrief;
};

// Trader
type TraderBrief = {
	level: {
		indicator: number;
		name: string;
		valMax: number;
		valMin: number;
		logoUrl: string;
	};
	spot: {
		coL1M: number;
		coL3M: number;
		coL6M: number;
		coLY: number;
		vasmL1M: number;
		vasmL3M: number;
		vasmL6M: number;
		vasmLY: number;
	};
	futures: {
		coL1M: number;
		coL3M: number;
		coL6M: number;
		coLY: number;
		vasmL1M: number;
		vasmL3M: number;
		vasmL6M: number;
		vasmLY: number;
	};
};

type TraderState = {
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
	currency?: CurrencyBrief;
};

// Referral
type ReferralBriefParams = {
	assessmentCurrencyId: string;
};

type InvitationListParams = {
	getMode?: string;
	sortMode?: string;
	assessmentCurrencyId: string;
	pageNumber?: string;
	pageSize?: string;
};

type InviteCommissionParams = {
	marketType: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type Invite = {
	uid: number;
	user: string;
	regTime: string;
	income: number;
};

type InviteCommission = {
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

type UserLevel = {
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

type Commission = {
	condition: string;
	currencyQuoteId: number;
	discount: string;
	header: string;
	id: number;
	levelIndicator: number;
	levelName: string;
	maker: string;
	marketTypeId: number;
	taker: string;
	withdraw: string;
};

// Profile
type SetNicknameDto = {
	nickName: string;
};

type UploadAvatarDto = {
	image: File;
};

// Ticket
type TicketListParams = {
	state: string;
	typeId: string;
	searchStatement: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
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

type TicketChat = {
	discussions: TicketChatItem[];
	meta: {
		createTime: string;
		header: string;
		fileId: number | null;
		creatorUid: number | null;
		id: number | null;
		stateId: number | null;
		typeId: number | null;
	};
};

type StoreTicketDto = {
	issueTypeId: number | '';
	priority: string | '';
	fileId: number | null;
	header: string;
	content: string;
};

type TicketResponse = {
	statusCode: number;
	result: Ticket | TicketChat;
};

type TicketChatItem = {
	id: number;
	fileId: number;
	fileUrl: string;
	writerUid: number;
	writerUser: string;
	regTime: string;
	content: string;
};

type AppendTicketDto = {
	id: number;
	fileId: number | null;
	content: string;
};

type SetBasicDto = {
	name: string;
	family: string;
	birthDate: string;
	birthCountryId: number | null;
};

type SetLiveDto = {
	natCode: string;
	livingAddress: string;
	livingCountryId: number | null;
};

type AssetTypeParams = {
	id: string;
	assetType: string;
};

type HolderBriefLevel = {
	indicator: number;
	name: string;
	valMax: number;
	valMin: number;
	logoUrl: string;
};

type HolderBriefInfo = {
	assetsTotal: string;
	assetsInTrade: string;
	assetsInHold: string;
};

type HolderBrief = {
	level: HolderBriefLevel;
	info: HolderBriefInfo;
};

type Level = {
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

type SetCardPrintDto = {
	address: string;
	postalCode: string;
	emergencyTelno: string;
	printingMobileAllowed: boolean;
};

type RewardParams = {
	tagId: string;
};

// Manage API
type ApiParams = {
	srchKey?: string;
	from?: string;
	to?: string;
	pageNumber?: string;
	pageSize?: string;
};

type Api = {
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

type ApiDto = {
	verificationId: number | null;
	verificationCode: string | null;
	v2fCode: string | null;
	apiKey?: string;
	passPhrase: string;
	appName: string;
	iPsAsArray: string;
	marketIDsAsArray: string | null;
	permissions: KeyBool[] | null;
	countDaysValid: number | string;
};

type ApiKeyParams = {
	apiKey: string;
};

type ApiCredentials = {
	apiKey: string;
	secretKey: string;
	expireTime: string;
};

type ApiPointInfo = {
	uid: number;
	apiKey: string;
	passPhraseHash: string;
	apiSecret: string;
	wlstIPv4s: string;
	wlstIPv6s: string;
};

// Assets
type BankAccountListParams = {
	typeId: string;
	statement: string;
	pageNumber: string;
	pageSize: string;
};

type BankAccountDto = {
	bankAccountTypeId: number;
	cardNo: string;
	ownerName?: string;
};

type BankAccount = {
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

type BankAccountDpi = {
	id: number;
	uid: number;
	user: string;
	compID: number;
	compName: string;
	regTime: string;
	destDepositId: string;
	destBankName: string;
	destIban: string;
	destAccName: string;
	disabled: boolean;
};

type DeleteBankAccountParams = {
	bankAccountId: string;
};

type RewardReceivedListParams = {
	currencyId: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type BankAccountDpiListParams = {
	companyId: string;
	statement: string;
	pageNumber: string;
	pageSize: string;
};

export type {
	TraderCommissionListParams,
	UserResponse,
	Commission,
	UserLevel,
	// Profile
	SetNicknameDto,
	UploadAvatarDto,
	// Ticket
	TicketListParams,
	Ticket,
	TicketChat,
	StoreTicketDto,
	TicketResponse,
	AppendTicketDto,
	// Id-Auth
	SetBasicDto,
	SetLiveDto,
	// Others
	ResultResponse,
	ReferralBrief,
	ReferralBriefParams,
	AssetTypeParams,
	SetCardPrintDto,
	HolderBrief,
	Level,
	InvitationListParams,
	Invite,
	InviteCommission,
	InviteCommissionParams,
	TraderBrief,
	TraderState,
	RewardParams,
	Reward,
	// Manage API
	ApiParams,
	Api,
	ApiDto,
	ApiCredentials,
	ApiKeyParams,
	ApiPointInfo,
	// Assets
	BankAccountDpiListParams,
	BankAccountListParams,
	BankAccount,
	BankAccountDpi,
	BankAccountDto,
	DeleteBankAccountParams,
	RewardReceived,
	RewardReceivedListParams,
};
