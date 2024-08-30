type LoginByEmailResponse = {
	statusCode: number;
	result: {
		wloId: number;
		userId: number;
		verificationId: number;
	};
};

export type {
	LoginByEmailResponse,
};
