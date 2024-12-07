import { SendType } from './enums/user.enum';

import type { DetermineOtpType } from '~/types/definitions/security.types';

export const determineOtp = (email: string | undefined, mobile: string | undefined): DetermineOtpType => {
	if (mobile && email) {
		return {
			exist: 'both',
			type: SendType.Email,
		};
	}
	else if (email) {
		return {
			exist: 'email',
			type: SendType.Email,
		};
	}
	else if (mobile) {
		return {
			exist: 'mobile',
			type: SendType.SMS,
		};
	}
	else {
		throw new Error('No email or mobile found.');
	}
};
