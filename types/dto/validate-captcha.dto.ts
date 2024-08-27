export type Point = {
	x: number;
	y?: number;
};

export type ValidateCaptchaDto = {
	captchaKey: string;
	points: Point[];
};
