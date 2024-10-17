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

export type {
	CommonRes,
	KeyValueRes,
	IdentificationRes,
	UploadAvatarDto,
	UploadFileDto,
};
