type UserProfileResponse = {
	statusCode: number;
	result: {
		wloId: number;
		userId: number;
		verificationId: number;
	};
};

export type {
	UserProfileResponse,
};
