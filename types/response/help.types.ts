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
};
