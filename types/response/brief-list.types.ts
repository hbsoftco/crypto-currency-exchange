type BriefItem = {
	id: number;
	cbId: number;
	cqId: number;
	typeId: number;
	stateId: number;
	mSymbol: string;
	tickSize: string;
};

type BriefListResponse = {
	result: BriefItem[];
	statusCode: number;
};

export type {
	BriefListResponse,
	BriefItem,
};
