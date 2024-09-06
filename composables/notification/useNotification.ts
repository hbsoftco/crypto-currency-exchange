import { notificationRepository } from '~/repositories/notification.repository';
import type { ErrorResponse } from '~/types/response/error.type';
import type { NotificationRequestDto } from '~/types/dto/notification.dto';

export const useNotification = () => {
	const { $api } = useNuxtApp();
	const notification = notificationRepository($api);

	const loading = ref(false);

	const getNotifications = async (params: NotificationRequestDto) => {
		loading.value = true;
		try {
			const response = await notification.getNotifications(params);
			return response;
		}
		catch (error: unknown) {
			const err = error as ErrorResponse;
			throw createError({
				statusCode: 500,
				statusMessage: `${err.response._data.message}`,
			});
		}
		finally {
			loading.value = false;
		}
	};

	return {
		getNotifications,
	};
};
