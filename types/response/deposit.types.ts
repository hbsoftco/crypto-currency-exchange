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
};

type DepositResult = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: Deposit[];
	};
};
export type { DepositResult, Deposit };
