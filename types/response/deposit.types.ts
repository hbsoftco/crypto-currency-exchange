import type { CurrencyBriefItem } from './brief-list.types';

type Deposit = {
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
	currency?: CurrencyBriefItem | null;
};

type DepositResult = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Deposit[];
	};
};

type Crypto = {
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

type GetAddressListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Crypto[];
	};
};
export type {
	DepositResult,
	Deposit,
	GetAddressListResponse,
	Crypto,
};
