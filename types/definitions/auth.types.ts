type CaptchaType = 'Slide' | 'Icon';

type AuthResponse = {
	statusCode: number;
	result: CaptchaGenerateResponse;
};

type CaptchaGenerateResponse = {
	id: string;
	backgroundImage: string;
	secondaryImage: string;
	stateId: number;
};

type CaptchaGenerateParams = {
	username: string;
	action: string;
	captchaType: CaptchaType;
};

type QrCodeGenerateParams = {
	initKey: string;
};

type QrCodeGenerateResponse = {
	statusCode: number;
	result: QrCodeGenerate;
};

type QrCodeGenerate = {
	lqrcID: string;
	lqrcSecret: string;
};

type CaptchaValidateDto = {
	captchaKey: string;
	points: Point[];
};

type CheckQrCodeParams = {
	lqrcId: string;
};

type CheckResponse = {
	statusCode: number;
	result: {
		userId: number;
		userSecretKey: number;
		otc: string;
		hashPassword?: string;
		userRegTime: string;
	};
};

type Point = {
	x: number;
	y?: number;
};

type LoginTabType = 'phoneNumber' | 'email' | 'qrCode';

type LoginResponse = {
	statusCode: number;
	result: {
		wloId: number;
		userId: number;
		v2FAId: number;
		v2FASecret: string;
		verificationId: number;
		languageId: number;
	};
};

type LoginByMobileDto = {
	captchaKey: string;
	password: string;
	mobile: string;
	ignore2FA: boolean | null;
};

type LoginByEmailDto = {
	captchaKey: string;
	password: string;
	email: string;
	ignore2FA: boolean | null;
};

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

type CheckCodeDto = {
	verificationId: number | null;
	verificationCode: string | null;
	userId: number | null;
};

type Check2faCodeDto = {
	userId: number | null;
	v2fId: number | null;
	v2fCode: string | null;
	v2fHash: string | null;
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

type SignupByMobileDto = {
	captchaKey: string;
	refereeCode: string | '';
	password: string;
	mobile: string;
};

type SignupByEmailDto = {
	captchaKey: string;
	refereeCode: string | '';
	password: string;
	email: string;
};

export type {
	CaptchaType,
	CaptchaGenerateParams,
	CaptchaGenerateResponse,
	AuthResponse,
	CaptchaValidateDto,
	QrCodeGenerateParams,
	QrCodeGenerate,
	QrCodeGenerateResponse,
	CheckQrCodeParams,
	CheckResponse,
	LoginTabType,
	LoginResponse,
	LoginByMobileDto,
	LoginByEmailDto,
	CheckForgetPasswordDto,
	ResetPasswordDto,
	CheckForgetPasswordResponse,
	InitForgetPasswordResponse,
	RestForgetPasswordDto,
	InitForgetPasswordDto,
	CheckCodeDto,
	ResendVerificationParams,
	ResendVerificationResponse,
	SignupByMobileDto,
	SignupByEmailDto,
	Check2faCodeDto,
};
