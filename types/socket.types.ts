type SocketSpotTickerMessage = {
	id: string;
	topic: string;
	statusCode?: number;
	data: {
		h: string;
		i: string;
		l: string;
		mi: number;
		ms: string;
		mt: number;
		o: string;
		p: string;
		q: string;
		t: number;
		v: string;
	};
};

type AssetListItem = {
	currencyId: number;
	available: string;
	locked: string;
};

type AssetListItemMessage = {
	id: string;
	topic: string;
	statusCode?: number;
	data: AssetListItem[];
};

export type {
	AssetListItem,
	SocketSpotTickerMessage,
	AssetListItemMessage,
};
