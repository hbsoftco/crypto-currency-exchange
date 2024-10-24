import { notificationRepository } from '~/repositories/notification.repository';
import type { KeyValue } from '~/types/base.types';
import type { NotificationRequestDto } from '~/types/dto/notification.dto';
import type { NotificationItem } from '~/types/response/notification.types';

export const useNotificationStore = defineStore('notification', () => {
	const notifications = ref<NotificationItem[]>([]);
	const totalCount = ref<number>(0);
	const notificationTags = ref<KeyValue[]>([]);
	const loading = ref(false);

	const { $api } = useNuxtApp();
	const notificationRepo = notificationRepository($api);

	const getNotificationsLoading = ref(false);
	const getNotifications = async (params: NotificationRequestDto) => {
		getNotificationsLoading.value = true;
		try {
			const { result } = await notificationRepo.getNotifications(params);
			notifications.value = result.rows;
			totalCount.value = result.totalCount;
		}
		catch (error: unknown) {
			throw createError({
				statusCode: 500,
				statusMessage: `${error}`,
			});
		}
		finally {
			getNotificationsLoading.value = false;
		}
	};

	const getNotificationsTag = async () => {
		loading.value = true;
		try {
			const { result } = await notificationRepo.getNotificationsTag();
			notificationTags.value = result;
		}
		catch (error: unknown) {
			throw createError({
				statusCode: 500,
				statusMessage: `${error}`,
			});
		}
		finally {
			loading.value = false;
		}
	};

	const notificationList = computed<NotificationItem[]>(() => {
		return notifications.value;
	});

	const totalNotifications = computed<number>(() => {
		return totalCount.value;
	});

	const notificationTagsList = computed<KeyValue[]>(() => {
		return notificationTags.value;
	});

	return {
		getNotifications,
		getNotificationsLoading,

		getNotificationsTag,

		notificationList,
		notificationTagsList,
		totalNotifications,
	};
});
