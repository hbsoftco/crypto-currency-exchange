<!-- eslint-disable vue/no-v-html -->
<template>
	<div>
		<div
			v-if="notificationStore.getNotificationsLoading"
			class="text-center"
		>
			<IconNotification
				class="text-2xl block group-hover:hidden group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
			/>
			<IconNotificationFill
				class="text-2xl hidden group-hover:block text-primary-yellow-light dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
			/>
		</div>

		<div
			v-if="!notificationStore.getNotificationsLoading"
			class="relative group items-center space-x-2"
		>
			<div class="relative cursor-pointer">
				<IconNotification
					class="text-2xl block group-hover:hidden group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
				<IconNotificationFill
					class="text-2xl hidden group-hover:block text-primary-yellow-light dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
				<span
					v-if="unreadMessages.length > 0"
					class="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-accent-red rounded-full"
				>
					{{ useNumber(unreadMessages.length) }}
				</span>
			</div>
			<div
				class="absolute left-0 md:-left-20 top-5 hidden group-hover:block py-6 opacity-100 transition-opacity duration-200 z-10"
			>
				<div class="w-72 md:w-96 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4">
					<div>
						<div
							class="flex justify-between rounded-md items-center p-2 bg-background-light dark:bg-background-dark"
						>
							<div class="text-sm font-bold">
								<ULink to="#">
									<span>{{ useNumber(unreadMessages.length) }}</span>
									<span class="mr-1">{{ $t("newMessage") }}</span>
								</ULink>

								<ULink
									v-if="unreadMessages.length > 0"
									@click="readAllNotifications"
								>
									<span
										class="mr-1 text-xs font-bold text-primary-yellow-light dark:text-primary-yellow-dark"
									>
										{{ $t("readAll") }}
									</span>
								</ULink>
							</div>
							<ULink to="/account/notifications">
								<div class="flex justify-between items-center">
									<span
										class="ml-1 text-xs font-bold text-primary-yellow-light dark:text-primary-yellow-dark"
									>
										{{ $t("more") }}
									</span>
									<IconArrowLeftQR
										class="text-primary-yellow-light dark:text-primary-yellow-dark mt-1"
									/>
								</div>
							</ULink>
						</div>
						<div class="max-h-96 overflow-y-scroll mt-4">
							<ul>
								<div
									v-if="unreadMessages.length > 0"
								>
									<li
										v-for="(item, index) in unreadMessages"
										:key="index"
										class="flex justify-between rounded-md p-2 transition-all duration-200 hover:bg-hover2-light dark:hover:bg-[#1f1f1f] border-transparent border-r-[3px] hover:border-r-[3px] hover:border-primary-yellow-light hover:dark:border-r-[3px] dark:hover:border-primary-yellow-dark"
									>
										<div class="w-8">
											<IconMessage class="text-2xl" />
										</div>
										<div class="flex flex-col pr-4 overflow-x-hidden">
											<span class="text-sm font-bold">{{ item.noticeHeader }}</span>
											<p
												class="text-nowrap truncate text-ellipsis text-sm h-5 my-1 overflow-y-hidden"
												v-html="sanitizedHtml(useNumber(item.noticeBody))"
											/>
											<span
												class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-light"
											>{{ useNumber(formatDateToIran(item.regTime)) }}</span>
										</div>
									</li>
								</div>
								<ULink
									v-else
									class="w-full text-center py-10"
								>
									<li>
										<div class="w-full flex justify-center">
											<IconNotification class="text-7xl text-primary-yellow-light dark:text-primary-yellow-dark" />
										</div>
										<span>{{ $t('notFoundMessage') }}</span>
									</li>
								</ULink>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { sanitizedHtml } from '~/utils/html-sanitizer';
import IconNotification from '~/assets/svg-icons/menu/notification.svg';
import IconNotificationFill from '~/assets/svg-icons/menu/notification-fill.svg';
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';
import IconMessage from '~/assets/svg-icons/menu/message.svg';
import { useNumber } from '~/composables/useNumber';
import { formatDateToIran } from '~/utils/persian-date';
import { notificationRepository } from '~/repositories/notification.repository';

const { $api, $swal } = useNuxtApp();
const notificationRepo = notificationRepository($api);

const toast = useToast();

const notificationStore = useNotificationStore();

const params = ref({
	from: '',
	to: '',
	typeId: '',
	pageNumber: '1',
	pageSize: '20',
});

const readAllNotificationsLoading = ref<boolean>(false);
const readAllNotifications = async () => {
	const confirmation = await $swal.fire({
		title: useT('readAllNotifications'),
		text: useT('readAllNotificationsDescription'),
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: useT('yesDoIt'),
		cancelButtonText: useT('cancel'),
	});

	if (confirmation.isConfirmed) {
		readAllNotificationsLoading.value = true;

		try {
			await notificationRepo.readAllNotifications();

			toast.add({
				title: useT('readAllNotifications'),
				description: 'allNotificationsReadSuccessfully',
				timeout: 5000,
				color: 'green',
			});

			await notificationStore.getNotifications(params.value);

			readAllNotificationsLoading.value = false;
		}
		catch (error) {
			readAllNotificationsLoading.value = false;
			console.error('Error deleting notification:', error);
		}
	}
};

onMounted(async () => {
	await notificationStore.getNotifications(params.value);
});

const messageItems = computed(() => notificationStore.notificationList);

const unreadMessages = computed(() =>
	messageItems.value.filter((item) => !item.readTime || item.readTime === '0001-01-01T00:00:00'),
);
</script>
