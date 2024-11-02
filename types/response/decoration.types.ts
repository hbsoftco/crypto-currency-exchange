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

type LinkListResult = {
	sections: Section[];
	links: Link[];
};

type FooterLinkSection = {
	id: number;
	title: string;
	links: Link[];
};

type GetLinkListResponse = {
	statusCode: number;
	result: LinkListResult | null;
};
export type {
	FooterLinkSection,
	LinkListResult,
	GetLinkListResponse,
	Section,
	Link,
};
