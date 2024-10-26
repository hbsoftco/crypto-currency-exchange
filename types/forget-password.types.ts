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
	userId: string;
	verificationCode: number;
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
	CheckForgetPasswordResponse,
	InitForgetPasswordResponse,
	RestForgetPasswordDto,
	InitForgetPasswordDto,
};
