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

type UploadFileDto = {
	data: File;
};

type UploadAvatarDto = {
	image: File;
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

type GetMiniRoutineRes = {
	statusCode: number;
	result: {
		tips: Tip[];
		faqs: Faq[];
		helps: Help[];
	};
};

export type {
	CommonRes,
	KeyValueRes,
	IdentificationRes,
	UploadAvatarDto,
	UploadFileDto,
	GetMiniRoutineRes,
	Tip,
	Faq,
	Help,
};
