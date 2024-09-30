import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CaptchaResponse } from '~/types/captcha-response.types';
import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { CaptchaRequestDto } from '~/types/dto/generate-captcha.dto';
import type { LoginByEmailDto, LoginByMobileDto } from '~/types/dto/login.dto';
import type { SignupByEmailDto, SignupByMobileDto } from '~/types/dto/signup.dto';
import type { ValidateCaptchaDto } from '~/types/dto/validate-captcha.dto';
import type { CheckCodeDto } from '~/types/dto/verification.dto';
import type { ResposneType } from '~/types/response.types';
import type { CheckOTCResponse, GetSocketListenKeyResponse } from '~/types/response/check-otc.types';
import type { LoginByEmailResponse } from '~/types/response/login.types';
import type { SignUpResponse } from '~/types/response/sign-up.types';
import type { VerificationCheckCodeResponse } from '~/types/response/verification.types';

type AuthRepository = {
	// Captcha
	generateCaptcha: (data: CaptchaRequestDto) => Promise<CaptchaResponse>;
	validateCaptcha: (data: ValidateCaptchaDto) => Promise<ResposneType>;
	// SignUp
	signupByMobile: (data: SignupByMobileDto) => Promise<ResposneType>;
	signupByEmail: (data: SignupByEmailDto) => Promise<SignUpResponse>;
	// Login
	loginByMobile: (data: LoginByMobileDto) => Promise<ResposneType>;
	loginByEmail: (data: LoginByEmailDto) => Promise<LoginByEmailResponse>;
	// Verification
	checkCodeVerification: (data: CheckCodeDto) => Promise<VerificationCheckCodeResponse>;
	// OTC
	generateNewOTC: () => Promise<CheckOTCResponse>;
	// listenKey Socket
	getSocketListenKey: () => Promise<GetSocketListenKeyResponse>;
};

export const authRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): AuthRepository => ({
	// Captcha
	async generateCaptcha(data: CaptchaRequestDto): Promise<CaptchaResponse> {
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
	async signupByMobile(data: SignupByMobileDto): Promise<ResposneType> {
		const response = await fetch<ResposneType>(`/v1/auth/signup/by_mobile`, {
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
});
