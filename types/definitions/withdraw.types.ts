import type { CurrencyBrief } from './currency.types';

type WithdrawCoinFeesParams = {
	statement: string;
	pageNumber: string;
	pageSize: string;
};

type WithdrawTransaction = {
	id: number;
	typeId: number;
	typeName: string;
	stateId: number;
	stateName: string;
	factorNo: string;
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
	txExplorerUrl: string;
	regTime: string;
	confirmTime: string;
	doneTime: string;
	txCode: string;
	currency?: CurrencyBrief | null;
};

type WithdrawTransactionsParams = {
	type?: string;
	currencyId: string;
	statement: string;
	from: string;
	to: string;
	pageNumber: string;
	pageSize: string;
};

type WithdrawCoinFee = {
	cid: number;
	currency?: CurrencyBrief;
	withdraw: WithdrawFee[];
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
	min: number;
	max: number;
};

type WithdrawCoinListParams = {
	type: string;
	statement: string;
	pageNumber: string;
	pageSize: string;
};

type WithdrawCoin = {
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

type WithdrawListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: WithdrawCoinFee[] |
		WithdrawCoin[] |
		WithdrawCurrency[] |
		WithdrawTransaction[];
	};
};

type WithdrawCurrency = {
	cid: number;
	withdrawable: string;
	currency?: CurrencyBrief;
	networks?: WithdrawCryptoNetwork[];
	bankOperator?: WithdrawFiatNetwork[];
};

type WithdrawFiatNetwork = {
	enabled: boolean;
	fee: number;
	percentage: number;
	note: string;
	min: number;
	max: number;
};

type WithdrawCryptoNetwork = {
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

export type {
	WithdrawListResponse,
	WithdrawCoinFeesParams,
	WithdrawCoinFee,
	WithdrawTransactionsParams,
	WithdrawTransaction,
	WithdrawCryptoNetwork,
	WithdrawFiatNetwork,
	WithdrawCoinListParams,
};
