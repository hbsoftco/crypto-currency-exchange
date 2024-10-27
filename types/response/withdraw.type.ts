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

type WithdrawCoinItem = {
	cid: number;
	chainId: number;
	netId: number;
	netName: string;
	withdrawEnabled: boolean;
	memoable: boolean;
	contractId: string;
	withdrawFee: number;
	withdrawCostPerc: number;
	withdrawMin: number;
	withdrawMax: number;
	withdrawNote: string;
};

type getWithdrawCoinListRes = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: WithdrawCoinItem[];
	};
};

type Network = {
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
	min: number;
	max: number;
};

type GetCurrencyInfoResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: {
			cid: number;
			withdrawable: string;
			networks: Network[];
		};
	};
};
export type {
	getWithdrawCoinListRes,
	WithdrawCoinItem,
	GetWithdrawResponse,
	Withdraw,
	GetCurrencyInfoResponse,
	Network,
};
