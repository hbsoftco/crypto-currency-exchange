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

export type {
	CommonResponse,
	KeyValueResponse,
	BaseLangIdParams,
	BaseLangGroupParams,
	KeyValue,
};
