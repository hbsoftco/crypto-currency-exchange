type PinListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: PinListRow[];
	};
};

type PinListRow = {
	id: number;
	typeId: number;
	typeName: string;
	mediaId: number;
	mediaUrl: string;
	tag: string;
	url: string;
	info: PinInfo[];
};

type PinInfo = {
	langId: number;
	text: string;
};

type GetPinListParams = {
	languageId: number;
	group?: string;
};

type PinItem = {
	mediaUrl: string;
	header: string;
};

export type {
	PinListResponse,
	PinListRow,
	PinInfo,
	GetPinListParams,
	PinItem,
};
