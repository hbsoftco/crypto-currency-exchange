type DepositCoinItem = {
	cid: number;
	chainId: number;
	netId: number;
	netName: string;
	memoable: boolean;
	contractId: string;
	depositEnabled: boolean;
	depositFee: number;
	depositCostPerc: number;
	depositNote: string;
};

type getDepositCoinListRes = {
	statusCode: number;
	result: {
		totalCount: number;
		rows: DepositCoinItem[];
	};
};

export type {
	DepositCoinItem,
	getDepositCoinListRes,
};
