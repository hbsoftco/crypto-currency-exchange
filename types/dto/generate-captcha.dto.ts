export type CaptchaType = 'Slide' | 'Icon';

export type CaptchaRequestDto = {
	username: string;
	action: string;
	captchaType: CaptchaType;
};
