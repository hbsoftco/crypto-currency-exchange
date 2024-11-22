import { userRepository } from '~/repositories/user.repository';
import type { KeyValue } from '~/types/base.types';
import type { Notice, NoticeListParams } from '~/types/definitions/user.types';

export const useNotificationStore = defineStore('notification', () => {
	const { $api } = useNuxtApp();
	const userRepo = userRepository($api);

	const toast = useToast();

	const noticeListParams = ref<NoticeListParams>({
		from: '',
		to: '',
		typeId: '',
		pageNumber: '1',
		pageSize: '20',
	});
	const noticeListLoading = ref<boolean>(false);
	const noticeList = ref<Notice[]>([]);
	const noticeListTotalCount = ref<number>(0);
	const fetchNoticeList = async () => {
		try {
			noticeListLoading.value = true;

			const { result } = await userRepo.getNoticeList(noticeListParams.value);
			noticeList.value = result.rows as Notice[];
			noticeListTotalCount.value = result.totalCount;

			noticeListLoading.value = false;
		}
		catch (error) {
			console.log(error);
			noticeListLoading.value = false;
		}
	};

	const getNoticeList = computed<Notice[]>(() => noticeList.value);
	const getNoticeListTotalCount = computed<number>(() => noticeListTotalCount.value);

	const noticeTypeListLoading = ref<boolean>(false);
	const noticeTypeList = ref<KeyValue[]>([]);
	const fetchNoticeTypeList = async () => {
		try {
			noticeTypeListLoading.value = true;

			const { result } = await userRepo.getNoticeTypeList();
			noticeTypeList.value = result;

			noticeTypeListLoading.value = false;
		}
		catch (error) {
			console.log(error);
			noticeTypeListLoading.value = false;
		}
	};

	const getNoticeTypeList = computed<KeyValue[]>(() => noticeTypeList.value);

	const noticeReadAllLoading = ref<boolean>(false);
	const noticeReadAll = async () => {
		try {
			noticeReadAllLoading.value = true;

			await userRepo.noticeReadAll();

			toast.add({
				title: useT('readAllNotifications'),
				description: useT('allNotificationsReadSuccessfully'),
				timeout: 5000,
				color: 'green',
			});

			await fetchNoticeList();

			noticeReadAllLoading.value = false;
		}
		catch (error) {
			console.log(error);
			noticeReadAllLoading.value = false;
		}
	};

	return {
		fetchNoticeList,
		fetchNoticeTypeList,
		noticeListLoading,
		noticeTypeListLoading,
		getNoticeList,
		getNoticeListTotalCount,
		getNoticeTypeList,
		noticeListParams,
		noticeReadAllLoading,
		noticeReadAll,
	};
});
