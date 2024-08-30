type VerificationCheckCodeResponse = {
	statusCode: number;
	result: {
		otc: string;
		userId: number;
		userSecretKey: number;
	};
};

export type {
	VerificationCheckCodeResponse,
};
