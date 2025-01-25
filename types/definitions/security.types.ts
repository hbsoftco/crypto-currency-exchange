type SecurityListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows:
			Notice [] |
			Activity [] |
			Device [];
	};
};

type SecurityResponse = {
	statusCode: number;
	result: Generate2fa |
	Identification |
	WhiteListIPs |
	QrCodeDeviceLink;
};

// 2fa
type Generate2fa = {
	v2FId: number;
	enabled: boolean;
	v2FSecret: string;
	setup: {
		account: string;
		manualEntryKey: string;
		qrCodeSetupImageUrl: string;
	};
};

type WhiteListIPs = {
	allowed: string[];
	denied: string[];
};

type Enable2faDto = {
	v2FAHash: string;
	v2FACode: string;
	verificationId: number;
	verificationCode: string;
	v2fId: number;
	loginPassword: string;
};

type Disable2faDto = {
	verificationId: number;
	verificationCode: string;
	loginPassword: string;
};

type GuidanceStep = {
	title: string;
	description: string;
	isActive: boolean;
	done: boolean;
};

// Logs
type NoticeListParams = {
	from?: string;
	to?: string;
	typeId?: string;
	pageNumber?: string;
	pageSize?: string;
};

type Notice = {
	deleted: boolean;
	noticeBody: string;
	noticeHeader: string;
	readTime: string;
	regTime: string;
	user: string;
	uid: number;
};

// Identification
type IdentificationDto = {
	lastVerificationId?: number;
	emailOrMobile?: string;
	sendType: string;
};

type IdentificationResendDto = {
	lastVerificationId?: number;
	resendType: string;
};

type Identification = {
	userId: number;
	verificationId: number;
};

// Change phone and email
type ChangePhoneDto = {
	uvIdMobileOld: number | null;
	uvCodeMoblieOld: string;
	uvIdMobileNew: number | null;
	uvCodeMoblieNew: string;
	mobileNew: string;
	v2FACode: string | null;
};

type ChangeEmailDto = {
	uvIdEmailAddressOld: number | null;
	uvCodeEmailAddressOld: string;
	uvIdEmailAddressNew: number | null;
	uvCodeEmailAddressNew: string;
	emailAddressNew: string;
	v2FACode: string | null;
};

type SetPasswordDto = {
	verificationId: number | null;
	verificationCode: string;
	v2FACode: string | null;
	passwordOld: string;
	passwordNew: string;
	rePasswordNew: string;
};

type DetermineOtpType = {
	exist: 'both' | 'email' | 'mobile';
	type: number;
};

type VerifyOutput = {
	verificationId: number | null;
	verificationCode: string | null;
	v2FACode: string | null;
};

type WithdrawPinCodeDto = {
	verificationId: number | null;
	verificationCode: string;
	v2FACode: string | null;
	withdrawPinCode: string;
};

type AntiPhishingDto = {
	verificationId: number | null;
	verificationCode: string;
	v2FACode: string | null;
	anitphishingPhrase: string;
};

type FreezeAccountDto = {
	reasonId: number | string;
	password: string;
};

type DeleteAccountDto = {
	reasonId: number | string;
	password: string;
};

// devices

type QrCodeDeviceLink = {
	devLinkID: number;
	devLinkSecret: string;
};

type DeviceListParams = {
	from?: string;
	to?: string;
	pageNumber?: string;
	pageSize?: string;
};

type Device = {
	id: number;
	iPv4: string;
	iPv6: string;
	device: string;
	isExpired: boolean;
	latestTime: string;
	inactive: boolean;
};

type WhiteListIPsDto = {
	verificationId: number | null;
	verificationCode: string;
	v2FACode: string | null;
	lstIPsAllowed: string;
};

type ActivitiesListParams = {
	logTypeId?: string;
	from?: string;
	to?: string;
	pageNumber?: string;
	pageSize?: string;
};

type Activity = {
	uid: number;
	user: string;
	typeId: number;
	typeName: string;
	logTime: string;
	device: string;
	iPv4: string;
	iPv6: string;
	city?: string;
	country?: string;
	countryCode?: string;
	lat?: string;
	lon?: string;
	region?: string;
	regionName?: string;
};

type TypeListParams = {
	entityTypeId: string;
	langId?: string;
};

export type {
	SecurityListResponse,
	SecurityResponse,
	NoticeListParams,
	Notice,
	Generate2fa,
	Enable2faDto,
	Disable2faDto,
	GuidanceStep,
	IdentificationDto,
	IdentificationResendDto,
	Identification,
	ChangePhoneDto,
	ChangeEmailDto,
	SetPasswordDto,
	DetermineOtpType,
	VerifyOutput,
	WithdrawPinCodeDto,
	AntiPhishingDto,
	DeviceListParams,
	Device,
	WhiteListIPsDto,
	WhiteListIPs,
	Activity,
	ActivitiesListParams,
	TypeListParams,
	FreezeAccountDto,
	DeleteAccountDto,
	QrCodeDeviceLink,
};
