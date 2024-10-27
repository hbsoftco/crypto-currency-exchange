type LoginByMobileDto = {
	captchaKey: string;
	password: string;
	mobile: string;
	ignore2FA: boolean | null;
};

type LoginByMobileResponse = {
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

type LoginByEmailDto = {
	captchaKey: string;
	password: string;
	email: string;
	ignore2FA: boolean | null;
};

export type {
	LoginByMobileResponse,
	LoginByMobileDto,
	LoginByEmailDto,
};
