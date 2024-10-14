import type { KeyValue } from '../base.types';

type CommonRes = {
	statusCode: number;
	result: string;
};

type KeyValueRes = {
	statusCode: number;
	result: KeyValue[];
};

type IdentificationRes = {
	statusCode: number;
	result: {
		verificationId: number;
	};
};

export type {
	CommonRes,
	KeyValueRes,
	IdentificationRes,
};
