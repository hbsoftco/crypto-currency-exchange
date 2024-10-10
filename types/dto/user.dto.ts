type ContactSetDto = {
	verificationId: number;
	verificationCode: string ;
	v2FACode: string;
	emailAddressOrMobile: string;
	description: string;
};

type AddressSetDto = {
	verificationId: number;
	verificationCode: string ;
	v2FACode: string;
	blockchainId: number;
	address: string;
	description: string;
	memo: string;
	coldWallet: boolean;
};

export type {
	ContactSetDto,
	AddressSetDto,
};
