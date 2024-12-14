type TraderCommissionListParams = {
	marketType: string;
};

type UserResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Commission[] |
		UserLevel[] |
		Ticket[];
	};
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

type StoreTicketDto = {
	issueTypeId: number | '';
	priority: string | '';
	fileId: number | null;
	header: string;
	content: string;
};

type TicketResponse = {
	statusCode: number;
	result: Ticket | TicketChat[];
};

type TicketChat = {
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
};
