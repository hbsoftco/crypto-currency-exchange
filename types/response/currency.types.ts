type NetBlockchainItem = {
	blockchainId: string;
	blockchainName: string;
};

type NetBlockchainListResponse = {
	statusCode: number;
	result: NetBlockchainItem[];
};

export type {
	NetBlockchainListResponse,
	NetBlockchainItem,
};
