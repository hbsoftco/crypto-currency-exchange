type TagResponse = {
	statusCode: number;
	result: Tag[];
};

type Tag = {
	id: number;
	tag: string;
};

type GetTagParams = {
	languageId: number;
};

export type {
	GetTagParams,
	TagResponse,
	Tag,
};
