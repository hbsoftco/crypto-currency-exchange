type InitForgetPasswordDto = {
	captchaKey: string;
	emailOrMobile: string;
};

type RestForgetPasswordDto = {
	newPassword: string;
	userSecretKey: number;
	verificationId: number;
};

type CheckForgetPasswordDto = {
	userId: number;
	verificationCode: string;
	verificationId: number;
};

type ResetPasswordDto = {
	newPassword: string;
	userSecretKey: number;
	verificationId: number;
};

type InitForgetPasswordResponse = {
	statusCode: number;
	result: {
		userId: number;
		wloId: number;
		verificationId: number;
	};
};

type CheckForgetPasswordResponse = {
	statusCode: number;
	result: {
		userId: number;
		userSecretKey: number;
		otc: string;
		userRegTime: string;
	};
};

export type {
	CheckForgetPasswordDto,
	ResetPasswordDto,
	CheckForgetPasswordResponse,
	InitForgetPasswordResponse,
	RestForgetPasswordDto,
	InitForgetPasswordDto,
};
