type IconItem = {
	currencyId: number;
	cSymbol: string;
	imageUrl: string;
};

type IconResponse = {
	result: IconItem[];
	statusCode: number;
};

export type {
	IconResponse,
	IconItem,
};
