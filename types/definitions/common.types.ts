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

export type {
	CommonResponse,
	KeyValueResponse,
	KeyValue,
};
