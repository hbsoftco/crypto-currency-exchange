import { useNotification } from '~/composables/notification/useNotification';
import type { NotificationRequestDto } from '~/types/dto/notification.dto';
import type { NotificationItem } from '~/types/response/notification.types';

export const useNotificationStore = defineStore('notification', () => {
	const notifications = ref<NotificationItem[]>([]);
	const isNotificationDataFetched = ref(false);
	const loading = ref(false);
	const error = ref<string | null>(null);

	const getNotifications = async (params: NotificationRequestDto) => {
		loading.value = true;
		error.value = null;

		try {
			const { getNotifications } = useNotification();
			const response = await getNotifications(params);
			console.log('I come from store', response.result);
			if (response?.result?.rows.length) {
				notifications.value = response.result.rows;
				isNotificationDataFetched.value = true;
			}

			return notifications.value;
		}
		catch (err) {
			error.value = 'Failed to fetch profile data';
			console.error('Error fetching profile:', err);
		}
		finally {
			loading.value = false;
		}
	};

	const notificationList = computed<NotificationItem[]>(() => {
		return notifications.value;
	});

	return {
		getNotifications,
		notificationList,
	};
});
