import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CaptchaResponse } from '~/types/captcha-response.types';
import type { CaptchaRequestDto } from '~/types/dto/generate-captcha.dto';
import type { ValidateCaptchaDto } from '~/types/dto/validate-captcha.dto';
import type { ResposneType } from '~/types/response.types';

type AuthRepository = {
	generateCaptcha: (data: CaptchaRequestDto) => Promise<CaptchaResponse>;
	validateCaptcha: (data: ValidateCaptchaDto) => Promise<ResposneType>;
};

export const authRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): AuthRepository => ({
	async generateCaptcha(data: CaptchaRequestDto): Promise<CaptchaResponse> {
		const { result } = await fetch<ResposneType>(`/v1/captcha/generate`, {
			params: {
				username: data.username,
				action: data.action,
				captchaType: data.captchaType,
			},
		});
		return result as CaptchaResponse;
	},
	async validateCaptcha(data: ValidateCaptchaDto): Promise<ResposneType> {
		const response = await fetch<ResposneType>(`/v1/captcha/validate`, {
			method: 'POST',
			body: data,
		});
		return response;
	},
});
