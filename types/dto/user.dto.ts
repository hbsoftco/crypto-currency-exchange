import type { KeyValue } from '../definitions/common.types';

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

type AddCardBankSetDto = {
	bankAccountTypeId: number;
	cardNo: string;
};

type CodeInviteDto = {
	referralCode: string;
};

type DeleteAccountDto = {
	reasonId: string;
	password: string;
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

type SetApiAddDto = {
	uvId?: number;
	v2fId?: number;
	passPhrase: string;
	appName: string;
	iPsAsArray?: string;
	marketIDsAsArray?: string;
	permissions?: KeyValue[];
	countDaysValid?: number;
};

type SetApiEditDto = {
	uvId?: number;
	v2fId?: number;
	apiKey: string;
	passPhrase: string;
	appName: string;
	iPsAsArray?: string;
	marketIDsAsArray?: string;
	permissions?: KeyValue[];
	countDaysValid?: number;
};
export type {
	ContactSetDto,
	AddressSetDto,
	AddCardBankSetDto,
	CodeInviteDto,
	DeleteAccountDto,
	SetEmailDto,
	SetMobileDto,
	SetApiAddDto,
	SetApiEditDto,
};
