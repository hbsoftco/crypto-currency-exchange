type Pair = {
	key: string;
	value: string;
};

type ProfileResponse = {
	result: Pair[];
	statusCode: number;
};

export type {
	ProfileResponse,
	Pair,
};
