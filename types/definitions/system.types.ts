import type { KeyValue } from './common.types';

type SystemListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: System[] | Card[] | Pin[];
	};
};

type SystemResponse = {
	statusCode: number;
	result: System | LinkListItem;
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
	similars: {
		id: number;
		header: string;
	};
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

export type {
	SystemListResponse,
	SystemResponse,
	System,
	SubFaq,
	LinkListItem,
	Card,
	SliderItem,
	Pin,
	FooterLinkSection,
};
