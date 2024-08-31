type SliderResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: SliderRow[];
		userId: number;
		verificationId: number;
	};
};

type SliderRow = {
	id: number;
	mediaId: number;
	mediaUrl: string;
	url: string;
	order: number;
	info: SliderInfo[];
};

type SliderInfo = {
	langId: number;
	header: string;
	content: string;
};

type GetSlidesParams = {
	languageId: number;
	group?: string;
};

type SliderItem = {
	mediaUrl: string;
	header: string;
};

export type {
	SliderResponse,
	SliderRow,
	SliderInfo,
	GetSlidesParams,
	SliderItem,
};
