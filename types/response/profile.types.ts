type ProfilePair = {
	key: string;
	value: string;
};

type ProfileResponse = {
	result: ProfilePair[];
	statusCode: number;
};

export type {
	ProfileResponse,
	ProfilePair,
};
