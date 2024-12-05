import type { KeyValue } from '../definitions/common.types';

type CommonResponse = {
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

type UploadFileDto = {
	data: File;
};

type CountryItem = {
	id: number;
	name: string;
	abbreviation: string ;
	phonePrefix: string ;
};

type GetCountryListRes = {
	statusCode: number;
	result: CountryItem[];
};

export type {
	CommonResponse,
	KeyValueRes,
	IdentificationRes,
	UploadFileDto,
	GetCountryListRes,
	CountryItem,
};
