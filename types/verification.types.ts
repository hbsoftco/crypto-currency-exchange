type CheckCodeDto = {
	verificationId: number | null;
	verificationCode: string | null;
	userId: number | null;
};

type ResendVerificationParams = {
	userId: string;
	lastVerificationId: string;
	resendType: string;
};

type ResendVerificationResponse = {
	statusCode: number;
	result: {
		verificationId: number;
	};
};

export type {
	CheckCodeDto,
	ResendVerificationParams,
	ResendVerificationResponse,
};
