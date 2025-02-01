type AddCardBankSetDto = {
	bankAccountTypeId: number;
	cardNo: string;
};

type CodeInviteDto = {
	referralCode: string;
};

type SetEmailDto = {
	uvIdEmailAddressOld: number;
	uvCodeEmailAddressOld: string;
	uvCodeEmailAddressNew: string;
	uvIdEmailAddressNew: number;
	v2FACode: string | null;
	emailAddressNew: string;
};

type SetMobileDto = {
	uvIdMobileOld: string;
	uvCodeMoblieOld: string;
	uvIdMobileNew: string;
	uvCodeMoblieNew: string;
	mobileNew: string;
	v2FACode: string;
};

export type {
	AddCardBankSetDto,
	CodeInviteDto,
	SetEmailDto,
	SetMobileDto,
};
