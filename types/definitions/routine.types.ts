import type { KeyValue } from './common.types';

type RoutineListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Routine[];
	};
};

type RoutineResponse = {
	statusCode: number;
	result: Routine;
};

type SubFaq = {
	header: string;
	content: string;
	id: number;
};

type Routine = {
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

export type {
	RoutineListResponse,
	RoutineResponse,
	Routine,
	SubFaq,
};
