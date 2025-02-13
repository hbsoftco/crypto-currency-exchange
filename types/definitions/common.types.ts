type KeyValue = {
	[x: string]: string;
	key: string;
	value: string;
};

type KeyValueBool = {
	key: string;
	value: string;
	check: boolean;
};

type KeyBool = {
	key: string;
	value: boolean;
};

type CommonResponse = {
	statusCode: number;
	result: string;
};

type KeyValueResponse = {
	statusCode: number;
	result: KeyValue[];
};

type BaseLangIdParams = {
	languageId: string;
	id: string;
};

type BaseLangGroupParams = {
	languageId: string;
	group: string;
};

type QrCodeInput = {
	id: string;
	type: 'login_qrc' | 'device_link';
	hash: string;
};

type SearchListParams = {
	languageId: string;
	tagId: string;
	searchStatement: string;
	group: string;
	pageNumber: string;
	pageSize: string;
};

export type {
	CommonResponse,
	KeyValueResponse,
	BaseLangIdParams,
	BaseLangGroupParams,
	KeyValue,
	QrCodeInput,
	SearchListParams,
	KeyValueBool,
	KeyBool,
};
