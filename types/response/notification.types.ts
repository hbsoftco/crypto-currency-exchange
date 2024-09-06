type NotificationResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: NotificationItem[];
	};
};

type NotificationItem = {
	deleted: boolean;
	noticeBody: string;
	noticeHeader: string;
	readTime: string;
	regTime: string;
	user: string;
	uid: number;
};

export type {
	NotificationResponse,
	NotificationItem,
};
