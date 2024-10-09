import type { KeyValue } from '../base.types';

type CommonRes = {
	statusCode: number;
	result: string;
};

type KeyValueRes = {
	statusCode: number;
	result: KeyValue[];
};

export type {
	CommonRes,
	KeyValueRes,
};
