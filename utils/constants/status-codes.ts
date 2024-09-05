type StatusMessage = {
	[key: string]: {
		fa: string;
		en: string;
	};
};

export const StatusCodes = {
	EMAIL_ALREADY_REGISTERED: {
		fa: -1311165,
		en: 0,
	},
	DATA_EXPIRED: {
		fa: -1311531,
		en: 0,
	},
	INVALID_CODE: {
		fa: -1311431,
		en: 0,
	},
	OTC_EXPIRED: {
		fa: 419,
		en: 419,
	},
};

export const statusMessages: StatusMessage = {
	EMAIL_ALREADY_REGISTERED: {
		fa: 'آدرس ایمیل از قبل ثبت شده است',
		en: 'Email address is already registered',
	},
	DATA_EXPIRED: {
		fa: 'اطلاعات منقضی شده است',
		en: 'Data has expired',
	},
	INVALID_CODE: {
		fa: 'کد معتبر نیست',
		en: 'Invalid code',
	},
	OTC_EXPIRED: {
		fa: 'OTC Fail : OTC is expired, Get new OTC',
		en: 'OTC Fail : OTC is expired, Get new OTC',
	},
};
