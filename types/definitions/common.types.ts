type KeyValue = {
	key: string;
	value: string;
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

export type {
	CommonResponse,
	KeyValueResponse,
	BaseLangIdParams,
	BaseLangGroupParams,
	KeyValue,
	QrCodeInput,
};
