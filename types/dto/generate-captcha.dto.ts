export type CaptchaType = 'Slide' | 'Icon';

export type CaptchaRequestParams = {
	username: string;
	action: string;
	captchaType: CaptchaType;
};
