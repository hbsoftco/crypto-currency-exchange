import type { KeyValue } from '../base.types';

type SocialNetListResponse = {
	statusCode: number;
	result: KeyValue[];
};

type StaffCheckResponse = {
	statusCode: number;
	result: string;
};

export type {
	SocialNetListResponse,
	StaffCheckResponse,
};
