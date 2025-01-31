import type { CurrencyBrief } from './currency.types';

type WithdrawCoinFeesParams = {
	statement: string;
	pageNumber: string;
	pageSize: string;
};

type WithdrawCoinFee = {
	cid: number;
	currency?: CurrencyBrief;
	withdraw: WithdrawFee;
};

type WithdrawFee = {
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

type WithdrawListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: WithdrawCoinFee[];
	};
};

export type {
	WithdrawListResponse,
	WithdrawCoinFeesParams,
	WithdrawCoinFee,
};
