import type { KeyValue } from './common.types';

type SystemListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: System[] | Card[] | Pin[] | SystemRoot[] | Tree[];
	};
};

type SystemResponse = {
	statusCode: number;
	result: System | LinkListItem | MiniRoutine;
};

type SystemRoot = {
	cid: number;
	id: number;
	typeId: number;
	mediaId: number;
	mediaUrl: string;
	tags: KeyValue[];
	info: CardInfo;
};

type SubFaq = {
	header: string;
	content: string;
	id: number;
};

type System = {
	id: number;
	currencyId: number;
	mediaId: number;
	mediaUrl: string;
	info: {
		content: string;
		header: string;
	};
	subFaqs: SubFaq[];
	tags: KeyValue[];
	path: {
		id: number;
		header: string;
		level: number;
	};
	similars: [{
		id: number;
		header: string;
	}];
};

type Info = {
	langId: number;
	title: string;
};

type Section = {
	id: number;
	info: Info[];
	links?: Link[];
};

type Link = {
	id: number;
	sectionId: number;
	url: string;
	info: Info[];
};

type LinkListItem = {
	sections: Section[];
	links: Link[];
};

type SliderItem = {
	mediaUrl: string;
	header: string;
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

type FooterLinkSection = {
	id: number;
	title: string;
	links: Link[];
};

type MiniRoutineParams = {
	tagType: string;
};

type MiniRoutine = {
	tips: KeyValue[];
	faqs: KeyValue[];
	helps: KeyValue[];
};

type Tree = {
	id: number;
	parentId: number;
	order: number;
	header: string;
	isOpen: boolean;
	children?: Tree[];
};

type StaffParams = {
	languageId?: string;
	staffId: string;
	profileTypeId: string;
};

type FAQListParams = {
	languageId: string;
	tagId: string;
	searchStatement: string;
	group: string;
	pageNumber: string;
	pageSize: string;
};

export type {
	SystemListResponse,
	SystemResponse,
	SystemRoot,
	System,
	SubFaq,
	LinkListItem,
	Card,
	SliderItem,
	Pin,
	FooterLinkSection,
	MiniRoutineParams,
	MiniRoutine,
	Tree,
	StaffParams,
	FAQListParams,
};
