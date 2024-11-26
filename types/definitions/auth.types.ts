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

type CaptchaValidateDto = {
	captchaKey: string;
	points: Point[];
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
};
