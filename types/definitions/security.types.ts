type SecurityListResponse = {
	statusCode: number;
	result: {
		totalCount: number;
		rows:
		Notice [];
	};
};

type SecurityResponse = {
	statusCode: number;
	result: Generate2fa | Identification;
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

type Enable2faDto = {
	v2FAHash: string;
	v2FACode: string;
	verificationId: number;
	verificationCode: string;
	v2fId: number;
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

type Identification = {
	userId: number;
	verificationId: number;
};

export type {
	SecurityListResponse,
	SecurityResponse,
	NoticeListParams,
	Notice,
	Generate2fa,
	Enable2faDto,
	GuidanceStep,
	IdentificationDto,
	Identification,
};
