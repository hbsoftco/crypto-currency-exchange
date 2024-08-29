type LoginByMobileDto = {
	captchaKey: string;
	password: string;
	mobile: string;
	ignore2FA?: boolean | null;
};

type LoginByEmailDto = {
	captchaKey: string;
	password: string;
	email: string;
	ignore2FA?: boolean | null;
};

export type {
	LoginByMobileDto,
	LoginByEmailDto,
};
