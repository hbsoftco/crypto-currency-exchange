import type { CurrencyBriefItem } from './brief-list.types';

type Withdraw = {
	id: number;
	typeId: number;
	typeName: string;
	stateId: number;
	stateName: string;
	factorNo: string;
	cSymbol: string;
	currencyId: number;
	wValue: string;
	wFeeDeclared: string;
	tag: string;
	address: string;
	memo: string;
	blockchainId: number;
	blockchainName: string;
	blockchainProtocolId: number;
	blockchainProtocolName: string;
	bankAccId: number;
	bankName: string;
	bankCard: string;
	bankIban: string;
	rejectId: number;
	rejectTitle: string;
	uidIssuer: number;
	userIssuer: string;
	uidReceiver: number;
	userReceiver: string;
	txCode: string;
	txExplorerUrl: string;
	regTime: string;
	confirmTime: string;
	doneTime: string;
	currency?: CurrencyBriefItem | null;

};

type GetWithdrawResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Withdraw[];
	};
};

export type {
	GetWithdrawResponse,
	Withdraw,
};
