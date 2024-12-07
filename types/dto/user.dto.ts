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

type SetCardPrintDto = {
	address: string;
	postalCode: string;
	emergencyTelno: string;
	printingMobileAllowed: boolean;
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
	SetBasicDto,
	SetLiveDto,
	SetEmailDto,
	SetMobileDto,
	SetPinCodeDto,
	SetAntiPhishingDto,
	SetCardPrintDto,
	SetApiAddDto,
	SetApiEditDto,
};
