import type { CurrencyBrief } from './currency.types';

type DepositCoinFeesParams = {
	statement: string;
	pageNumber: string;
	pageSize: string;
};

type DepositCoinFee = {
	cid: number;
	currency?: CurrencyBrief;
	deposit: DepositFee;
};

type DepositFee = {
	enabled: boolean;
	chainId: number;
	netId: number;
	netName: string;
	memoable: boolean;
	contractId: string;
	confirmationCo: number;
	fee: number;
	percentage: number;
	note: string;
};

type DepositListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: DepositCoinFee[];
	};
};

export type {
	DepositListResponse,
	DepositCoinFeesParams,
	DepositCoinFee,
};
