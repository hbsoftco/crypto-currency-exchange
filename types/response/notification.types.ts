import type { KeyValue } from '../base.types';

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

type NotificationTag = {
	statusCode: string;
	result: KeyValue[];
};

export type {
	NotificationResponse,
	NotificationItem,
	NotificationTag,
};
