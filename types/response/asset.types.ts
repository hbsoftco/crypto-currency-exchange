import type { CurrencyBriefItem } from './brief-list.types';

type AssetItem = {
	currencyId: number;
	qAvailable: string;
	qLocked: string;
	aAvailable: string;
	aLocked: string;
};

type GetAssetListResponse = {
	statusCode: number;
	result: {
		rows: AssetItem[];
		totalCount: number;
	};
};

type InternalReceive = {
	id: number;
	isOutput: boolean;
	factorNo: string;
	uidFrom: number;
	userFrom: string;
	uidTo: number;
	userTo: string;
	currencyId: number;
	value: string;
	doneTime: string;
	currency?: CurrencyBriefItem | null;
};

type GetInternalReceiveListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: InternalReceive[];
	};
};

export type {
	GetAssetListResponse,
	AssetItem,
	GetInternalReceiveListResponse,
	InternalReceive,
};
