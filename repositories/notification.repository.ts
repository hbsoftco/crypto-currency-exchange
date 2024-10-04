import type { NitroFetchRequest, $Fetch } from 'nitropack';

import type { CustomNitroFetchOptions } from '~/types/custom-nitro-fetch-options.types';
import type { NotificationRequestDto } from '~/types/dto/notification.dto';
import type { NotificationResponse, NotificationTag } from '~/types/response/notification.types';

type NotificationRepository = {
	getNotifications: (params: NotificationRequestDto) => Promise<NotificationResponse>;
	getNotificationsTag: () => Promise<NotificationTag>;
};

export const notificationRepository = (fetch: $Fetch<unknown, NitroFetchRequest>): NotificationRepository => ({
	async getNotifications(params: NotificationRequestDto): Promise<NotificationResponse> {
		const url = `/v1/user/logs/notice_list`;
		const result = await fetch<NotificationResponse>(url, {
			params: {
				from: params.from,
				action: params.to,
				captchaType: params.typeId,
				pageNumber: params.pageNumber,
				pageSize: params.pageSize,
			},
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);
		return result;
	},
	async getNotificationsTag(): Promise<NotificationTag> {
		const url = `/v1/user/logs/notice_type_list`;
		const result = await fetch<NotificationTag>(url, {
			noAuth: false,
			apiName: url,
		} as CustomNitroFetchOptions);
		return result;
	},
});
