type CardListResponse = {
	statusCode: number;
	result: {
		rows: Card[];
		totalCount: number;
	};
};

type DecorationParams = {
	languageId: string;
	group?: string;
};

type Card = {
	id: number;
	mediaId: number;
	mediaUrl: string;
	url: string;
	order: number;
	info: CardInfo[];
};

type CardInfo = {
	langId: number;
	header: string;
	content: string;
};

type SliderItem = {
	mediaUrl: string;
	header: string;
};

type PinListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Pin[];
	};
};

type Pin = {
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

export type {
	DecorationParams,
	CardListResponse,
	Card,
	CardInfo,
	SliderItem,
	PinListResponse,
	Pin,
};
