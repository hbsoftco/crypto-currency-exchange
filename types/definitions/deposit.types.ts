import type { CurrencyBrief } from './currency.types';

type DepositCoinFeesParams = {
	statement: string;
	pageNumber: string;
	pageSize: string;
};

type DepositCoinFee = {
	cid: number;
	currency?: CurrencyBrief;
	deposit: DepositFee[];
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

type DepositCryptoAddressParams = {
	netId: string;
	statement: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type CryptoAddress = {
	reqId: number;
	addressId: number;
	typeId: number;
	typeName: string;
	netId: number;
	netName: string;
	wloId: number;
	wloName: string;
	uidOwner: number;
	userOwner: string;
	address: string;
	memo: string;
	regTime: string;
	expirationTime: string;
	takenTime: string;
	allocationTime: string;
};

type DepositListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: DepositCoinFee[] | CryptoAddress[];
	};
};

export type {
	DepositListResponse,
	DepositCoinFeesParams,
	DepositCoinFee,
	DepositCryptoAddressParams,
	CryptoAddress,
};
