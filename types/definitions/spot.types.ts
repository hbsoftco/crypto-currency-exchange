type KLineParams = {
	timeFrom?: string;
	timeTo?: string;
	candleCount?: string;
	timeFrameType?: string;
	symbol?: string;
	marketId?: string;
};

type KLineResponse = {
	statusCode: number;
	result: string[];
};

export type {
	KLineParams,
	KLineResponse,
};
