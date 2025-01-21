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
		Level[];
	};
};

type ResultResponse = {
	statusCode: number;
	result: ReferralBrief | HolderBrief;
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

type ReferralBriefParams = {
	assessmentCurrencyId: string;
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
};
