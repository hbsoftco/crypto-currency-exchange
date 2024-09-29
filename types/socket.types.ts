export type SocketSpotTickerMessage = {
	id: string;
	topic: string;
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
