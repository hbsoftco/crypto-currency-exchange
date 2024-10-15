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

type IdentificationSendDto = {
	sendType: string;
};

type CodeInviteDto = {
	referralCode: string;
};
export type {
	ContactSetDto,
	AddressSetDto,
	NickNameSetDto,
	AddCardBankSetDto,
	IdentificationResendDto,
	IdentificationSendDto,
	CodeInviteDto,
};
