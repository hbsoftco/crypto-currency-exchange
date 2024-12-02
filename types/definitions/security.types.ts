type SecurityResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows:
		Notice [];
	};
};

// Logs
type NoticeListParams = {
	from?: string;
	to?: string;
	typeId?: string;
	pageNumber?: string;
	pageSize?: string;
};

type Notice = {
	deleted: boolean;
	noticeBody: string;
	noticeHeader: string;
	readTime: string;
	regTime: string;
	user: string;
	uid: number;
};

export type {
	SecurityResponse,
	NoticeListParams,
	Notice,
};
