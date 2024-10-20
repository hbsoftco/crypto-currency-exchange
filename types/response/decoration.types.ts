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

type GetLinkListRes = {
	statusCode: number;
	result: {
		sections: Section[];
		links: Link[];
	};
};
export type {
	GetLinkListRes,
	Section,
	Link,
};
