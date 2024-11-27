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
};
