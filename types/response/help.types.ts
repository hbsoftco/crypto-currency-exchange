import type { CurrencyBriefItem } from './brief-list.types';

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

type BuyItem = {
	cid: number;
	id: number;
	typeId: number;
	mediaId: number;
	mediaUrl: string;
	tags: Tag[];
	info: Info;
	currency?: CurrencyBriefItem | null;
};

type GetHowToBuyListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: BuyItem[];
	};
};

type FAQ = {
	cid: number;
	id: number;
	typeId: number;
	mediaId: number;
	mediaUrl: string;
	tags: Tag[];
	info: Info;
	currency?: CurrencyBriefItem | null;
};

type GetLiveChatListResponse = {
	totalCount: number;
	result: {
		totalCount: number;
		rows: FAQ[];
	};
};

type SubFaqItem = {
	header: string;
	content: string;
	id: number;
};

type PathItem = {
	id: number;
	header: string;
	level: number;
};

type SimilarItem = {
	id: number;
	header: string;
};

type FaqItem = {
	id: number;
	currencyId: number;
	mediaId: number;
	mediaUrl: string;
	info: Info[];
	subFaqs: SubFaqItem[];
	tags: Tag[];
	path: PathItem[];
	similars: SimilarItem[];
};

type GetFaqRes = {
	statusCode: number;
	result: FaqItem;
};

type TreeList = {
	id: number;
	parentId: number;
	order: number;
	header: string;
};

type GetTreeListRes = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: TreeList[];
	};
};

type ApiTag = {
	key: number;
	value: string;
};

type ApiInfo = {
	langId: number;
	header: string;
	content: string;
};

type SearchItem = {
	cid: number;
	id: number;
	typeId: number;
	mediaId: number;
	mediaUrl: string;
	tags: ApiTag[];
	info: ApiInfo[];
};

type GetSearchListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: SearchItem[];
	};
};

export type {
	GetRootListResponse,
	RootList,
	Tag,
	Info,
	GetShortListResponse,
	ShortList,
	GetHowToBuyListResponse,
	BuyItem,
	GetLiveChatListResponse,
	FAQ,
	GetFaqRes,
	FaqItem,
	TreeList,
	GetTreeListRes,
	GetSearchListResponse,
	SearchItem,
};
