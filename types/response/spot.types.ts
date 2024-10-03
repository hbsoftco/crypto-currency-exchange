type GetKlineResponse = {
	statusCode: number;
	result: string[];
};

type BidAsk = {
	p: string;
	v: string;
	c: string;
};

type Depth = {
	depthOfBid: string[][];
	depthOfAsk: string[][];
};

interface Ticker {
	t: number;
	i: string;
	o: string;
	h: string;
	l: string;
	p: string;
	v: string;
	q: string;
}

type LatestTrade = {
	t: number;
	s: number;
	p: string;
	v: string;
};

type Spot = {
	bids: BidAsk[];
	asks: BidAsk[];
	depth: Depth;
	ticker: Ticker;
	latestTrades: LatestTrade[];
};

type GetSpotDataResponse = {
	statusCode: number;
	result: Spot;
};

export type {
	Spot,
	BidAsk,
	Depth,
	Ticker,
	LatestTrade,
	GetSpotDataResponse,
	GetKlineResponse,
};
