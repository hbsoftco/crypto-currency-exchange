type TagResponse = {
	statusCode: number;
	result: Tag[];
};

type Tag = {
	id: number;
	tag: string;
};

export type {
	TagResponse,
	Tag,
};
