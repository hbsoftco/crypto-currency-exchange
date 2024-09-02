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
	SignupByMobileDto,
	SignupByEmailDto,
};
