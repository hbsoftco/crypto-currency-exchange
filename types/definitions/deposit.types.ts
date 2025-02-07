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

type DepositTransaction = {
	id: number;
	uidIssuer: number;
	userIssuer: string;
	uidReceiver: number;
	userReceiver: string;
	typeId: number;
	typeName: string;
	stateId: number;
	stateName: string;
	factorNo: string;
	currencyId: number;
	txCode: string;
	txExplorerUrl: string;
	txTime: string;
	txVrfTime: string;
	txValue: string;
	address: string;
	memo: string;
	blockchainId: number;
	blockchainName: string;
	bankAccId: number;
	bankName: string;
	bankCard: string;
	bankIban: string;
	companyId: number;
	companyName: string;
	currency?: CurrencyBrief | null;
};

type DepositTransactionsParams = {
	type?: string;
	currencyId: string;
	statement: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type DepositListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: DepositCoinFee[] | CryptoAddress[] | DepositTransaction[];
	};
};

export type {
	DepositListResponse,
	DepositCoinFeesParams,
	DepositCoinFee,
	DepositCryptoAddressParams,
	CryptoAddress,
	DepositTransaction,
	DepositTransactionsParams,
};
