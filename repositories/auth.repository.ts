import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { LoginByEmailDto, LoginByMobileDto, LoginByMobileResponse } from '~/types/login.types';
import type { SignupByEmailDto, SignupByMobileDto } from '~/types/dto/signup.dto';
import type { CheckCodeDto, ResendVerificationParams, ResendVerificationResponse } from '~/types/verification.types';
import type { CheckForgetPasswordDto, InitForgetPasswordDto, InitForgetPasswordResponse, ResetPasswordDto, RestForgetPasswordDto } from '~/types/forget-password.types';
import type { CheckOTCResponse, GetSocketListenKeyResponse } from '~/types/response/check-otc.types';
import type { LoginByEmailResponse } from '~/types/response/login.types';
import type { SignUpResponse } from '~/types/response/sign-up.types';
import type { VerificationCheckCodeResponse } from '~/types/response/verification.types';
import type {
	AuthResponse,
	CaptchaGenerateParams,
	CaptchaGenerateResponse,
	CaptchaValidateDto,
	CheckQrCodeParams,
	CheckResponse,
	QrCodeGenerateParams,
	QrCodeGenerateResponse } from '~/types/definitions/auth.types';
import type { CommonResponse } from '~/types/definitions/common.types';

type AuthRepository = {
	// Captcha
	generateCaptcha: (params: CaptchaGenerateParams) => Promise<CaptchaGenerateResponse>;
	validateCaptcha: (dto: CaptchaValidateDto) => Promise<CommonResponse>;
	// SignUp
	signupByMobile: (data: SignupByMobileDto) => Promise<SignUpResponse>;
	signupByEmail: (data: SignupByEmailDto) => Promise<SignUpResponse>;
	// Login
	loginByMobile: (data: LoginByMobileDto) => Promise<LoginByMobileResponse>;
	loginByEmail: (data: LoginByEmailDto) => Promise<LoginByEmailResponse>;
	// Verification
	checkCodeVerification: (data: CheckCodeDto) => Promise<VerificationCheckCodeResponse>;
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
	async signupByMobile(data: SignupByMobileDto): Promise<SignUpResponse> {
		const response = await fetch<SignUpResponse>(`/v1/auth/signup/by_mobile`, {
			method: 'POST',
			body: data,
		});
		return response;
	},
	async signupByEmail(data: SignupByEmailDto): Promise<SignUpResponse> {
		const response = await fetch<SignUpResponse>(`/v1/auth/signup/by_email`, {
			method: 'POST',
			body: data,
		});
		return response;
	},
	// Login
	async loginByMobile(data: LoginByMobileDto): Promise<LoginByMobileResponse> {
		const response = await fetch<LoginByMobileResponse>(`/v1/auth/login/by_mobile`, {
			method: 'POST',
			body: data,
		});
		return response;
	},
	async loginByEmail(data: LoginByEmailDto): Promise<LoginByEmailResponse> {
		const response = await fetch<LoginByEmailResponse>(`/v1/auth/login/by_email`, {
			method: 'POST',
			body: data,
		});
		return response;
	},
	// Verification
	async checkCodeVerification(data: CheckCodeDto): Promise<VerificationCheckCodeResponse> {
		const response = await fetch<VerificationCheckCodeResponse>(`/v1/verification/check_code`, {
			method: 'POST',
			body: data,
		});
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
