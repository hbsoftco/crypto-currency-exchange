// statusCodes.ts
export const StatusCodes = {
	EMAIL_ALREADY_REGISTERED: {
		fa: -1311165,
		en: -1311200,
	},
};

type StatusMessage = {
	[key: string]: {
		fa: string;
		en: string;
	};
};

export const statusMessages: StatusMessage = {
	EMAIL_ALREADY_REGISTERED: {
		fa: 'آدرس ایمیل از قبل ثبت شده است',
		en: 'Email address is already registered',
	},
};
