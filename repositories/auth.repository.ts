import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CaptchaResponse } from '~/types/captcha-response.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
// import type { ForgetPasswordDto } from '~/types/dto/forget-password.dto';
import type { CaptchaRequestParams } from '~/types/dto/generate-captcha.dto';
import type { LoginByEmailDto, LoginByMobileDto } from '~/types/dto/login.dto';
import type { SignupByEmailDto, SignupByMobileDto } from '~/types/dto/signup.dto';
import type { ValidateCaptchaDto } from '~/types/dto/validate-captcha.dto';
import type { CheckCodeDto, ResendVerificationParams, ResendVerificationResponse } from '~/types/verification.types';
import type { CheckForgetPasswordDto, CheckForgetPasswordResponse, InitForgetPasswordDto, InitForgetPasswordResponse, ResetPasswordDto, RestForgetPasswordDto } from '~/types/forget-password.types';
import type { ResposneType } from '~/types/response.types';
import type { CheckOTCResponse, GetSocketListenKeyResponse } from '~/types/response/check-otc.types';
import type { CommonResponse } from '~/types/response/common.types';
import type { LoginByEmailResponse } from '~/types/response/login.types';
import type { SignUpResponse } from '~/types/response/sign-up.types';
import type { VerificationCheckCodeResponse } from '~/types/response/verification.types';

type AuthRepository = {
	// Captcha
	generateCaptcha: (data: CaptchaRequestParams) => Promise<CaptchaResponse>;
	validateCaptcha: (data: ValidateCaptchaDto) => Promise<ResposneType>;
	// SignUp
	signupByMobile: (data: SignupByMobileDto) => Promise<SignUpResponse>;
	signupByEmail: (data: SignupByEmailDto) => Promise<SignUpResponse>;
	// Login
	loginByMobile: (data: LoginByMobileDto) => Promise<ResposneType>;
	loginByEmail: (data: LoginByEmailDto) => Promise<LoginByEmailResponse>;
	// Verification
	checkCodeVerification: (data: CheckCodeDto) => Promise<VerificationCheckCodeResponse>;
	verificationResend: (params: ResendVerificationParams) => Promise<ResendVerificationResponse>;
	// OTC
	generateNewOTC: () => Promise<CheckOTCResponse>;
	// listenKey Socket
	getSocketListenKey: () => Promise<GetSocketListenKeyResponse>;
	// Forget Password
	initForgetPassword: (dto: InitForgetPasswordDto) => Promise<InitForgetPasswordResponse>;
	resetForgetPassword: (dto: RestForgetPasswordDto) => Promise<CommonResponse>;
	checkForgetPassword: (dto: CheckForgetPasswordDto) => Promise<CheckForgetPasswordResponse>;
	resetPassword: (dto: ResetPasswordDto) => Promise<CommonResponse>;
};

export const authRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): AuthRepository => ({
	// Captcha
	async generateCaptcha(data: CaptchaRequestParams): Promise<CaptchaResponse> {
		const { result } = await fetch<ResposneType>(`/v1/captcha/generate`, {
			params: {
				username: data.username,
				action: data.action,
				captchaType: data.captchaType,
			},
			noAuth: true,
		} as CustomNitroFetchOptions);
		return result as CaptchaResponse;
	},
	async validateCaptcha(data: ValidateCaptchaDto): Promise<ResposneType> {
		const response = await fetch<ResposneType>(`/v1/captcha/validate`, {
			method: 'POST',
			body: data,
		});
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
	async loginByMobile(data: LoginByMobileDto): Promise<ResposneType> {
		const response = await fetch<ResposneType>(`/v1/auth/login/by_mobile`, {
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
	async generateNewOTC(): Promise<CheckOTCResponse> {
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
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async resetForgetPassword(dto: RestForgetPasswordDto): Promise<CommonResponse> {
		const url = '/v1/auth/forget_password/reset';
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async checkForgetPassword(dto: CheckForgetPasswordDto): Promise<CheckForgetPasswordResponse> {
		const url = '/v1/verification/forget_password_check';
		const response = await fetch<CheckForgetPasswordResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
	async resetPassword(dto: RestForgetPasswordDto): Promise<CommonResponse> {
		const url = '/v1/auth/forget_password/reset';
		const response = await fetch<CommonResponse>(`${url}`, {
			noAuth: false,
			apiName: url,
			method: 'POST',
			body: dto,
		} as CustomNitroFetchOptions);

		return response;
	},
});
