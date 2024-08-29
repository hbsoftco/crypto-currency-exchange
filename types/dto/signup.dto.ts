type SignupByMobileDto = {
	captchaKey: string;
	refereeCode?: string | null;
	password: string;
	mobile: string;
};

type SignupByEmailDto = {
	captchaKey: string;
	refereeCode?: string | null;
	password: string;
	email: string;
};

export type {
	SignupByMobileDto,
	SignupByEmailDto,
};
