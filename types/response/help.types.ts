type Tag = {
	key: number;
	value: string;
};

type Info = {
	langId: number;
	header: string;
	content: string;
};

type RootList = {
	cid: number;
	id: number;
	typeId: number;
	mediaId: number;
	mediaUrl: string;
	tags: Tag[];
	info: Info[];
};

type ShortList = {
	cid: number;
	id: number;
	typeId: number;
	mediaId: number;
	mediaUrl: string;
	tags: Tag[];
	info: Info[];
};

type GetRootListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: RootList[];
	};
};

type GetShortListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: ShortList[];
	};
};

export type {
	GetRootListResponse,
	RootList,
	Tag,
	Info,
	GetShortListResponse,
	ShortList,
};
