import type { KeyValue } from '../base.types';

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

type Tip = {
	key: number;
	value: string;
};

type Faq = {
	key: number;
	value: string;
};

type Help = {
	key: number;
	value: string;
};

type MiniRoutine = {
	tips: Tip[];
	faqs: Faq[];
	helps: Help[];
};

type GetMiniRoutineRes = {
	statusCode: number;
	result: MiniRoutine;
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
	GetMiniRoutineRes,
	MiniRoutine,
	Tip,
	Faq,
	Help,
	GetCountryListRes,
	CountryItem,
};
