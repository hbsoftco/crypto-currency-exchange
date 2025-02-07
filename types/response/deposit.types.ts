type AddressRevokeItem = {
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

type GetAddressRevokeRes = {
	statusCode: number;
	result: AddressRevokeItem;
};

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
	GetAddressRevokeRes,
	DepositCoinItem,
	getDepositCoinListRes,
};
