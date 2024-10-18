type ContactSetDto = {
	verificationId: number;
	verificationCode: string ;
	v2FACode?: string;
	emailAddressOrMobile: string;
	description: string;
};

type AddressSetDto = {
	verificationId: number;
	verificationCode: string ;
	v2FACode?: string;
	blockchainId: number;
	address: string;
	description: string;
	memo: string;
	coldWallet: boolean;
};

type NickNameSetDto = {
	nickName: string;
};

type AddCardBankSetDto = {
	bankAccountTypeId: number;
	cardNo: string;
};

type IdentificationResendDto = {
	lastVerificationId: number;
	resendType: string;
};

type IdentificationSendNewDto = {
	emailOrMobile: number;
	sendType: string;
};

type IdentificationSendDto = {
	sendType: string;
};

type CodeInviteDto = {
	referralCode: string;
};

type DeleteAccountDto = {
	reasonId: string;
	password: string;
};

type SetBasicDto = {
	name: string;
	family: string;
	birthDate?: string;
	birthCountryId?: string;
};

type SetLiveDto = {
	natCode: string;
	livingAddress: string;
	livingCountryId: string;
};

type SetEmailDto = {
	uvIdEmailAddressOld: string;
	uvCodeEmailAddressOld: string;
	uvCodeEmailAddressNew: string;
	uvIdEmailAddressNew: string;
	v2FACode: string;
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

type SetPasswordDto = {
	verificationId: string;
	verificationCode: string;
	v2FACode?: string;
	passwordOld: string;
	passwordNew: string;
};

type SetPinCodeDto = {
	verificationId: string;
	verificationCode: string;
	v2FACode?: string;
	withdrawPinCode: string;
};

type SetAntiPhishingDto = {
	verificationId: string;
	verificationCode: string;
	v2FACode?: string;
	anitphishingPhrase: string;
};

export type {
	ContactSetDto,
	AddressSetDto,
	NickNameSetDto,
	AddCardBankSetDto,
	IdentificationResendDto,
	IdentificationSendNewDto,
	IdentificationSendDto,
	CodeInviteDto,
	DeleteAccountDto,
	SetBasicDto,
	SetLiveDto,
	SetEmailDto,
	SetMobileDto,
	SetPasswordDto,
	SetPinCodeDto,
	SetAntiPhishingDto,
};
