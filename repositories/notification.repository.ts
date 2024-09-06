import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { NotificationRequestDto } from '~/types/dto/notification.dto';
import type { NotificationResponse } from '~/types/response/notification.types';

type NotificationRepository = {
	getNotifications: (params: NotificationRequestDto) => Promise<NotificationResponse>;
};

export const notificationRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): NotificationRepository => ({
	async getNotifications(params: NotificationRequestDto): Promise<NotificationResponse> {
		const result = await fetch<NotificationResponse>(`/v1/user/logs/notice_list`, {
			params: {
				from: params.from,
				action: params.to,
				captchaType: params.typeId,
				pageNumber: params.pageNumber,
				pageSize: params.pageSize,
			},
			noAuth: false,
		} as CustomNitroFetchOptions);
		return result;
	},
});
