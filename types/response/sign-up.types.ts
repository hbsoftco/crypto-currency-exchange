type SignUpResponse = {
	statusCode: number;
	result: {
		languageId: number;
		userId: number;
		verificationId: number;
		wloId: number;
	};
};

export type {
	SignUpResponse,
};
