import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { CheckOTCResponse, GetSocketListenKeyResponse } from '~/types/response/check-otc.types';
import type { SignUpResponse } from '~/types/response/sign-up.types';
import type {
	AuthResponse,
	CaptchaGenerateParams,
	CaptchaGenerateResponse,
	CaptchaValidateDto,
	Check2faCodeDto,
	CheckCodeDto,
	CheckForgetPasswordDto,
	CheckQrCodeParams,
	CheckResponse,
	InitForgetPasswordDto,
	InitForgetPasswordResponse,
	LoginByEmailDto,
	LoginByMobileDto,
	LoginResponse,
	QrCodeGenerateParams,
	QrCodeGenerateResponse,
	ResendVerificationParams,
	ResendVerificationResponse,
	ResetPasswordDto,
	RestForgetPasswordDto,
	SignupByEmailDto,
	SignupByMobileDto } from '~/types/definitions/auth.types';
import type { CommonResponse } from '~/types/definitions/common.types';

type AuthRepository = {
	// Captcha
	generateCaptcha: (params: CaptchaGenerateParams) => Promise<CaptchaGenerateResponse>;
	validateCaptcha: (dto: CaptchaValidateDto) => Promise<CommonResponse>;
	// SignUp
	signupByMobile: (dto: SignupByMobileDto) => Promise<SignUpResponse>;
	signupByEmail: (dto: SignupByEmailDto) => Promise<SignUpResponse>;
	// Login
	loginByMobile: (dto: LoginByMobileDto) => Promise<LoginResponse>;
	loginByEmail: (dto: LoginByEmailDto) => Promise<LoginResponse>;
	// Verification
	checkCodeVerification: (data: CheckCodeDto) => Promise<CheckResponse>;
	check2faCodeVerification: (data: Check2faCodeDto) => Promise<CheckResponse>;
	verificationResend: (params: ResendVerificationParams) => Promise<ResendVerificationResponse>;
	// OTC
	refreshOtc: () => Promise<CheckOTCResponse>;
	// listenKey Socket
	getSocketListenKey: () => Promise<GetSocketListenKeyResponse>;
	// Forget Password
	initForgetPassword: (dto: InitForgetPasswordDto) => Promise<InitForgetPasswordResponse>;
	resetForgetPassword: (dto: RestForgetPasswordDto) => Promise<CommonResponse>;
	checkForgetPassword: (dto: CheckForgetPasswordDto) => Promise<CheckResponse>;
	resetPassword: (dto: ResetPasswordDto) => Promise<CommonResponse>;
	// QrCode
	generateQrCode: (params: QrCodeGenerateParams) => Promise<QrCodeGenerateResponse>;
	checkQrCode: (params: CheckQrCodeParams) => Promise<CheckResponse>;
};

export const authRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): AuthRepository => ({
	// Captcha
	async generateCaptcha(params: CaptchaGenerateParams): Promise<CaptchaGenerateResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);
		const url = '/v1/captcha/generate';
		const { result } = await fetch<AuthResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return result as CaptchaGenerateResponse;
	},
	async validateCaptcha(dto: CaptchaValidateDto): Promise<CommonResponse> {
		const url = '/v1/captcha/validate';
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: true,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	// SignUp
	async signupByMobile(dto: SignupByMobileDto): Promise<SignUpResponse> {
		const response = await fetch<SignUpResponse>(`/v1/auth/signup/by_mobile`, {
			noAuth: true,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);
		return response;
	},
	async signupByEmail(dto: SignupByEmailDto): Promise<SignUpResponse> {
		const response = await fetch<SignUpResponse>(`/v1/auth/signup/by_email`, {
			noAuth: true,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);
		return response;
	},
	// Login
	async loginByMobile(dto: LoginByMobileDto): Promise<LoginResponse> {
		const response = await fetch<LoginResponse>(`/v1/auth/login/by_mobile`, {
			noAuth: true,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async loginByEmail(dto: LoginByEmailDto): Promise<LoginResponse> {
		const response = await fetch<LoginResponse>(`/v1/auth/login/by_email`, {
			noAuth: true,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);
		return response;
	},
	// Verification
	async checkCodeVerification(dto: CheckCodeDto): Promise<CheckResponse> {
		const response = await fetch<CheckResponse>(`/v1/verification/check_code`, {
			noAuth: true,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);
		return response;
	},
	async check2faCodeVerification(dto: Check2faCodeDto): Promise<CheckResponse> {
		const response = await fetch<CheckResponse>(`/v1/verification/2fa_check`, {
			noAuth: true,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);
		return response;
	},
	async verificationResend(params: ResendVerificationParams): Promise<ResendVerificationResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/verification/resend';
		const response = await fetch<ResendVerificationResponse>(`${url}?${query.toString()}`, {
			noAuth: false,
			apiName: url,
			queryParams: params,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	// OTC
	async refreshOtc(): Promise<CheckOTCResponse> {
		const response = await fetch<CheckOTCResponse>(`/v1/otc/check`, {
			noAuth: false,
		} as CustomNitroFetchOptions);
		return response;
	},
	// listenKey Socket
	async getSocketListenKey(): Promise<GetSocketListenKeyResponse> {
		const url = '/v1/wss/key';
		const response = await fetch<GetSocketListenKeyResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);

		return response;
	},
	// Forget Password
	async initForgetPassword(dto: InitForgetPasswordDto): Promise<InitForgetPasswordResponse> {
		const url = '/v1/auth/forget_password/init';
		const response = await fetch<InitForgetPasswordResponse>(`${url}`, {
			noAuth: true,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async resetForgetPassword(dto: RestForgetPasswordDto): Promise<CommonResponse> {
		const url = '/v1/auth/forget_password/reset';
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: true,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async checkForgetPassword(dto: CheckForgetPasswordDto): Promise<CheckResponse> {
		const url = '/v1/verification/forget_password_check';
		const response = await fetch<CheckResponse>(`${url}`, {
			noAuth: true,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async resetPassword(dto: RestForgetPasswordDto): Promise<CommonResponse> {
		const url = '/v1/auth/forget_password/reset';
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: true,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	// QrCode
	async generateQrCode(params: QrCodeGenerateParams): Promise<QrCodeGenerateResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/auth/login/by_qrc_generate';
		const response = await fetch<QrCodeGenerateResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
	async checkQrCode(params: CheckQrCodeParams): Promise<CheckResponse> {
		const query = new URLSearchParams(
			Object.entries(params)
				.filter(([_, value]) => value !== undefined && value !== '' && value !== null),
		);

		const url = '/v1/auth/login/by_qrc_check';
		const response = await fetch<CheckResponse>(`${url}?${query.toString()}`, {
			noAuth: true,
			method: 'GET',
		} as CustomNitroFetchOptions);

		return response;
	},
});
